# TOC Trucking Services — Website

A modern, single-page business website for TOC Trucking Services, built around the company's actual branding, photos, and Facebook page content.

## Technology Used

Plain HTML5, CSS3, and vanilla JavaScript — **no frameworks, no build tools, and zero npm dependencies.** A tiny Node.js script (using only Node's built-in modules) serves the site locally and copies it into a `dist/` folder for deployment.

This means `npm install` has nothing to download, so setup works instantly and offline.

## Running It Locally

1. Extract the ZIP
2. Open the folder in VS Code
3. Open a terminal in the project folder
4. Run:
   ```
   npm install
   ```
5. Run:
   ```
   npm run dev
   ```
6. Open the local URL shown in the terminal (default: `http://localhost:5173`)

## Building for Deployment

```
npm run build
```

This copies `index.html`, `css/`, `js/`, and `images/` into a `dist/` folder — a clean, ready-to-host static site. Upload the contents of `dist/` to any static host (Netlify, Vercel, GitHub Pages, S3, cPanel, etc.).

## Project Structure

```
index.html          Main page (all sections)
css/styles.css       All styling, colors, layout, animations
js/main.js           Nav behavior, mobile menu, scroll reveals, quote form logic
images/              Optimized photos and logo sourced from the company's own assets
server.js            Zero-dependency local dev server
build.js             Zero-dependency build script (outputs to dist/)
package.json         npm scripts only — no dependencies
```

## Important Notes

- **The "Request a Quote" form is frontend-only for now.** Submitting it validates the fields and shows a polished success message, but it does **not** send data anywhere yet — there is no backend, database, or email/SMS integration connected.
- **No database was added**, as requested — no Postgres, Supabase, Firebase, auth, or admin dashboard.
- **Facebook Messenger automation has NOT been implemented yet.** The Facebook links on the site are real and open the actual TOC Trucking Services page (facebook.com/toctrucking), but quote requests are not currently sent there automatically. That's planned as a future step, once the owner approves the site.
- No business statistics, years of operation, fleet counts, or service areas were invented. Where the source material didn't include specific facts, the copy stays general and honest.

## Environment Variables

None required — the site is fully static.

## Connecting the Quote Form Later

The form (in `index.html`, `#quote-form`) is structured with clear field names (`fullName`, `phone`, `pickup`, `delivery`, `details`) and its submit handling is isolated in `js/main.js`. When you're ready to connect it to a backend or Messenger integration, replace the success-state logic in the form's `submit` handler with an actual API call.
