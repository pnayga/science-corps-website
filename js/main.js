/* Science Corps — Main JS */

document.addEventListener('DOMContentLoaded', function () {

  /* ── Navbar scroll behaviour (transparent → white) ─── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    function updateNav() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile nav toggle ──────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });
    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
      }
    });
  }

  /* ── Mobile dropdown toggles ────────────────────────── */
  if (window.innerWidth <= 640) {
    document.querySelectorAll('.dropdown > a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const parent = link.parentElement;
        parent.classList.toggle('open');
      });
    });
  }

  /* ── Smooth scroll for anchor links ─────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 70;
        const top  = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
        if (menu) menu.classList.remove('open');
      }
    });
  });

  /* ── FAQ accordion ──────────────────────────────────── */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      const item = q.closest('.faq-item');
      item.classList.toggle('open');
    });
  });

  /* ── Active nav link ────────────────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.closest('li').classList.add('active');
    }
  });

  /* ── Contact form (client-side only, mailto fallback) ─ */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name    = document.getElementById('cf-name').value;
      const email   = document.getElementById('cf-email').value;
      const message = document.getElementById('cf-message').value;
      const subject = encodeURIComponent('Message from ' + name + ' via Science Corps website');
      const body    = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
      window.location.href = 'mailto:fellows@science-corps.org?subject=' + subject + '&body=' + body;
      const ok = document.getElementById('form-success');
      if (ok) { ok.style.display = 'block'; form.reset(); }
    });
  }

});
