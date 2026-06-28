/* ============================================================
   MANOJ KRISHNA MORE — PORTFOLIO JAVASCRIPT
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // 1. TYPED TEXT ANIMATION
  // ============================================================
  const typedEl = document.getElementById('typed-text');
  const phrases = [
    'Data Scientist',
    'Data Analyst',
    'Python Enthusiast',
    'Power BI Developer',
    'ML Explorer',
    'Business Intelligence Analyst',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingPaused = false;

  function typeText() {
    if (!typedEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 500;
    }

    setTimeout(typeText, delay);
  }

  typeText();

  // ============================================================
  // 2. PARTICLE SYSTEM
  // ============================================================
  const container = document.getElementById('particles-container');
  const PARTICLE_COUNT = 35;

  function createParticle() {
    if (!container) return;
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#a78bfa', '#22d3ee'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      background: ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(p);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle();
  }

  // ============================================================
  // 3. NAVBAR — SCROLL & MOBILE
  // ============================================================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const allNavLinks = document.querySelectorAll('.nav-links a:not(#nav-contact)');

  // Scroll class
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  updateActiveNav();

  // ============================================================
  // 4. SCROLL REVEAL (Intersection Observer)
  // ============================================================
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger delay based on sibling index
          const delay = (entry.target.dataset.delay) ? parseFloat(entry.target.dataset.delay) : 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay * 1000);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => revealObserver.observe(el));

  // ============================================================
  // 5. SKILL BAR ANIMATION
  // ============================================================
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const width = target.getAttribute('data-width');
          setTimeout(() => {
            target.style.width = `${width}%`;
          }, 300);
          skillObserver.unobserve(target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillFills.forEach(fill => skillObserver.observe(fill));

  // ============================================================
  // 6. CONTACT FORM — MOCK SUBMIT
  // ============================================================
  const submitBtn = document.getElementById('contact-submit');
  const formFeedback = document.getElementById('form-feedback');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email-input').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        formFeedback.style.color = '#f87171';
        formFeedback.textContent = '⚠️ Please fill in Name, Email, and Message.';
        formFeedback.style.display = 'block';
        return;
      }

      // Simulate submission
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin 0.8s linear infinite"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/><path d="M21 12c0-4.97-4.03-9-9-9"/></svg> Sending...`;
      
      setTimeout(() => {
        formFeedback.style.color = '#10b981';
        formFeedback.textContent = '✅ Message sent! I\'ll be in touch soon.';
        formFeedback.style.display = 'block';
        submitBtn.innerHTML = `✅ Message Sent!`;
        submitBtn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';
        
        // Reset after 4s
        setTimeout(() => {
          document.getElementById('contact-name').value = '';
          document.getElementById('contact-email-input').value = '';
          document.getElementById('contact-subject').value = '';
          document.getElementById('contact-message').value = '';
          formFeedback.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
          submitBtn.style.background = '';
        }, 4000);
      }, 1500);
    });
  }

  // ============================================================
  // 7. SMOOTH SCROLL for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================================
  // 8. SPIN ANIMATION for loading state (CSS inject)
  // ============================================================
  const spinStyle = document.createElement('style');
  spinStyle.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
  document.head.appendChild(spinStyle);

  // ============================================================
  // 9. CURSOR GLOW EFFECT (optional premium touch)
  // ============================================================
  const heroSection = document.getElementById('home');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroSection.style.setProperty('--mouse-x', `${x}%`);
      heroSection.style.setProperty('--mouse-y', `${y}%`);
    }, { passive: true });
  }

  // ============================================================
  // 10. COUNTER ANIMATION for stats
  // ============================================================
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent.trim();
          if (text === '7+') animateCounter(el, 7, '+');
          else if (text === '3+') animateCounter(el, 3, '+');
          else if (text === '5+') animateCounter(el, 5, '+');
          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(el => statsObserver.observe(el));

})();
