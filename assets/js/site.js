/* ==========================================================================
   Ritesh Kumar Singh — site.js
   No dependencies. ~4kb. Everything degrades to a working page without it.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Theme -------------------------------------------------------------
     The initial theme is set by an inline script in <head> to avoid a flash.
     This only wires up the toggle.                                        */
  var toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      toggle.setAttribute('aria-label', 'Switch to ' + (next === 'dark' ? 'light' : 'dark') + ' theme');
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* --- Scroll reveal ---------------------------------------------------- */
  var revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-stagger], .tl__row, .metric');

  if (reduced || !('IntersectionObserver' in window)) {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });

    revealTargets.forEach(function (el) { io.observe(el); });
  }

  /* --- Count-up on reveal -------------------------------------------------
     <span data-count="248" data-decimals="0">248</span>                    */
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    if (reduced || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = format(+el.dataset.count, +el.dataset.decimals || 0); });
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
          cio.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { el.textContent = format(0, +el.dataset.decimals || 0); cio.observe(el); });
    }
  }

  function format(n, d) {
    return n.toLocaleString('en-IN', { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var decimals = parseInt(el.dataset.decimals || '0', 10);
    var duration = 1400;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(target * eased, decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = format(target, decimals);
    }
    requestAnimationFrame(step);
  }

  /* --- Scroll progress + sticky topbar ---------------------------------- */
  var bar = document.querySelector('.progress__bar');
  var topbar = document.querySelector('.topbar');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
      if (topbar) topbar.classList.toggle('is-stuck', y > 24);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Active section for rail + top nav + case-study TOC ---------------- */
  var watched = document.querySelectorAll('[data-section]');
  var linkSets = [
    document.querySelectorAll('.rail a'),
    document.querySelectorAll('.topnav a[href^="#"]'),
    document.querySelectorAll('.toc a')
  ];

  if (watched.length && 'IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        linkSets.forEach(function (set) {
          set.forEach(function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    watched.forEach(function (s) { sio.observe(s); });
  }

  /* --- Custom cursor (fine pointers only) -------------------------------- */
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fine && !reduced) {
    var dot = document.querySelector('.cursor');
    var ring = document.querySelector('.cursor-ring');

    if (dot && ring) {
      var mx = window.innerWidth / 2, my = window.innerHeight / 2;
      var rx = mx, ry = my;

      window.addEventListener('mousemove', function (e) {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
        if (!document.body.classList.contains('cursor-ready')) {
          document.body.classList.add('cursor-ready');
        }
      }, { passive: true });

      (function loop() {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
        requestAnimationFrame(loop);
      })();

      var hot = 'a, button, [role="button"], .serp__item, .card, input, textarea';
      document.addEventListener('mouseover', function (e) {
        if (e.target.closest(hot)) document.body.classList.add('cursor-hot');
      });
      document.addEventListener('mouseout', function (e) {
        if (e.target.closest(hot)) document.body.classList.remove('cursor-hot');
      });
      document.addEventListener('mouseleave', function () {
        document.body.classList.remove('cursor-ready');
      });
    }
  }

  /* --- Copy-to-clipboard for the email ----------------------------------- */
  document.querySelectorAll('[data-copy]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var text = el.dataset.copy;
      if (!navigator.clipboard) return;          // let the mailto: through
      e.preventDefault();
      navigator.clipboard.writeText(text).then(function () {
        var original = el.dataset.originalLabel || el.querySelector('.value').textContent;
        el.dataset.originalLabel = original;
        el.querySelector('.value').textContent = 'Copied';
        setTimeout(function () { el.querySelector('.value').textContent = original; }, 1600);
      });
    });
  });

  /* --- Current year in the footer ---------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
