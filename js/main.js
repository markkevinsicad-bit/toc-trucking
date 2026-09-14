/* TOC Trucking Services — site interactions
   Vanilla JS, no dependencies. */

(function () {
  'use strict';

  /* ---------------- Sticky nav state ---------------- */
  var nav = document.getElementById('nav');
  function onScrollNav() {
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------------- Mobile menu ---------------- */
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    var isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            // slight stagger for elements revealing together
            entry.target.style.setProperty('--reveal-delay', (i % 3) * 0.08 + 's');
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Quote form validation + success state ---------------- */
  var form = document.getElementById('quote-form');
  var successPanel = document.getElementById('quote-success');
  var resetBtn = document.getElementById('quote-reset');

  var validators = {
    fullName: function (v) {
      return v.trim().length >= 2;
    },
    phone: function (v) {
      var digits = v.replace(/\D/g, '');
      return digits.length >= 7;
    },
    pickup: function (v) {
      return v.trim().length >= 2;
    },
    delivery: function (v) {
      return v.trim().length >= 2;
    }
  };

  function setFieldError(fieldId, hasError) {
    var field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.toggle('has-error', hasError);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;
      var data = new FormData(form);

      Object.keys(validators).forEach(function (name) {
        var value = data.get(name) || '';
        var ok = validators[name](value);
        var fieldIdMap = {
          fullName: 'field-name',
          phone: 'field-phone',
          pickup: 'field-pickup',
          delivery: 'field-delivery'
        };
        setFieldError(fieldIdMap[name], !ok);
        if (!ok) valid = false;
      });

      if (!valid) {
        var firstError = form.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          var input = firstError.querySelector('input, textarea');
          if (input) input.focus();
        }
        return;
      }

      // Frontend-only success state.
      // NOTE: no network request is made here yet — this project has no
      // backend / database. See README.md for the plan to connect this
      // to Facebook Messenger or another notification channel later.
      form.classList.add('is-hidden');
      successPanel.classList.add('is-visible');
      successPanel.setAttribute('tabindex', '-1');
      successPanel.focus();
    });

    // Clear error state as the person types
    form.querySelectorAll('input, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        var fieldWrap = el.closest('.field');
        if (fieldWrap) fieldWrap.classList.remove('has-error');
      });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      form.classList.remove('is-hidden');
      successPanel.classList.remove('is-visible');
      form.querySelectorAll('.field').forEach(function (f) {
        f.classList.remove('has-error');
      });
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
})();
