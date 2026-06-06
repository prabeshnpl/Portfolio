(function () {
  'use strict';

  // ── EmailJS Init ──────────────────────────────────
  emailjs.init({ publicKey: 'C8U82Dmex07CBDRni' });

  // ── Hamburger / Mobile Nav ─────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close mobile nav when a link is clicked
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // ── Active Nav Link on Scroll ─────────────────────
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  function setActiveLink() {
    const scrollY = window.scrollY + 90;
    let current = '';

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) current = sec.id;
    });

    navAnchors.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // ── Subtle Nav Shadow on Scroll ───────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.borderBottomColor = window.scrollY > 10 ? 'var(--border)' : 'transparent';
  }, { passive: true });

  // ── Contact Form ──────────────────────────────────
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('form-feedback');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      feedback.className = 'form-feedback';
      feedback.textContent = '';

      const params = {
        name:    form.name.value.trim(),
        email:   form.email.value.trim(),
        subject: form.subject.value.trim(),
        message: form.message.value.trim(),
      };

      try {
        await emailjs.send('service_5eizowr', 'template_6idwmwc', params);
        feedback.textContent = 'Message sent — I\'ll get back to you soon.';
        feedback.className   = 'form-feedback success';
        form.reset();
      } catch (err) {
        feedback.textContent = 'Something went wrong. Please email me directly.';
        feedback.className   = 'form-feedback error';
      } finally {
        btn.textContent = 'Send Message';
        btn.disabled    = false;
      }
    });
  }
})();