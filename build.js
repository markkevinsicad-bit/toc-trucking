/**
 * Minimal zero-dependency "build" step.
 * This is a static HTML/CSS/JS site, so there is no bundling to do —
 * this script copies the deployable files into /dist so the output
 * of `npm run build` is a clean, ready-to-host folder.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

const INCLUDE = ['index.html', 'css', 'js', 'images'];

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

function main() {
  if (fs.existsSync(DIST)) {
    fs.rmSync(DIST, { recursive: true, force: true });
  }
  fs.mkdirSync(DIST, { recursive: true });

  let fileCount = 0;
  for (const item of INCLUDE) {
    const src = path.join(ROOT, item);
    if (!fs.existsSync(src)) {
      console.error('  ✗ Missing expected file/folder: ' + item);
      process.exitCode = 1;
      continue;
    }
    const dest = path.join(DIST, item);
    copyRecursive(src, dest);
  }

  function count(dir) {
    let n = 0;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) n += count(path.join(dir, entry.name));
      else n += 1;
    }
    return n;
  }
  fileCount = count(DIST);

  console.log('');
  console.log('  ✓ Build complete → ./dist (' + fileCount + ' files)');
  console.log('  This folder is ready to deploy to any static host');
  console.log('  (Netlify, Vercel, GitHub Pages, S3, etc.)');
  console.log('');
}

main();
