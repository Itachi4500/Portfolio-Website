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
  // 6. CONTACT FORM — REAL mailto: DELIVERY
  // ============================================================

  // 🔧 UPDATE THIS with your actual email address
  const YOUR_EMAIL = 'manojmore0214@gmail.com';

  const submitBtn = document.getElementById('contact-submit');
  const formFeedback = document.getElementById('form-feedback');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const nameEl    = document.getElementById('contact-name');
      const emailEl   = document.getElementById('contact-email-input');
      const subjectEl = document.getElementById('contact-subject');
      const msgEl     = document.getElementById('contact-message');

      const name    = nameEl.value.trim();
      const email   = emailEl.value.trim();
      const subject = subjectEl.value.trim() || 'Portfolio Contact';
      const message = msgEl.value.trim();

      // Validation
      if (!name || !email || !message) {
        formFeedback.style.color = '#f87171';
        formFeedback.textContent = '⚠️ Please fill in Name, Email, and Message.';
        formFeedback.style.display = 'block';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formFeedback.style.color = '#f87171';
        formFeedback.textContent = '⚠️ Please enter a valid email address.';
        formFeedback.style.display = 'block';
        return;
      }

      // Build the mailto body
      const body = [
        `Name    : ${name}`,
        `Email   : ${email}`,
        ``,
        `Message :`,
        message,
        ``,
        `---`,
        `Sent via Portfolio Contact Form`,
      ].join('\n');

      const mailtoURL =
        `mailto:${YOUR_EMAIL}` +
        `?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}` +
        `&body=${encodeURIComponent(body)}`;

      // Show sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          style="animation:spin 0.8s linear infinite">
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/>
          <path d="M21 12c0-4.97-4.03-9-9-9"/>
        </svg> Opening Email Client…`;

      // Open the mail client
      window.location.href = mailtoURL;

      // Show success feedback after a short delay
      setTimeout(() => {
        formFeedback.style.color = '#10b981';
        formFeedback.textContent = '✅ Your email client opened! Send the email to reach Manoj.';
        formFeedback.style.display = 'block';
        submitBtn.innerHTML = `✅ Email Client Opened`;
        submitBtn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';

        // Reset form after 5 s
        setTimeout(() => {
          nameEl.value = '';
          emailEl.value = '';
          subjectEl.value = '';
          msgEl.value = '';
          formFeedback.style.display = 'none';
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg> Send Message`;
          submitBtn.style.background = '';
        }, 5000);
      }, 800);
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

/* ============================================================
   RESUME DOWNLOAD MODAL — Global Functions
   (global scope so onclick="..." in HTML can reach them)
   ============================================================ */

// 🔧 Set your real email here
const OWNER_EMAIL = 'manojmore0214@email.com';
// Resume is hosted on GitHub — direct raw download URL
const RESUME_FILE = 'https://github.com/Itachi4500/Portfolio-Website/tree/main/Resume';
const RESUME_FILENAME = 'Manoj_Krishna_More_Resume.docx'; // filename shown to downloader

function openResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;

  // Reset to form view in case success was shown earlier
  _rmodalShowForm();

  // Clear previous values
  ['rm-name','rm-email','rm-company'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const purpose = document.getElementById('rm-purpose');
  if (purpose) purpose.selectedIndex = 0;

  const err = document.getElementById('rm-error');
  if (err) err.style.display = 'none';

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Focus first field
  setTimeout(() => {
    const nameInput = document.getElementById('rm-name');
    if (nameInput) nameInput.focus();
  }, 350);
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

function submitResumeModal() {
  const nameEl    = document.getElementById('rm-name');
  const emailEl   = document.getElementById('rm-email');
  const companyEl = document.getElementById('rm-company');
  const purposeEl = document.getElementById('rm-purpose');
  const errEl     = document.getElementById('rm-error');
  const submitBtn = document.getElementById('rm-submit-btn');

  const name    = nameEl.value.trim();
  const email   = emailEl.value.trim();
  const company = companyEl ? companyEl.value.trim() : '';
  const purpose = purposeEl ? purposeEl.value : '';

  // --- Validation ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email) {
    errEl.textContent = '⚠️ Please enter your name and a valid email.';
    errEl.style.display = 'block';
    [nameEl, emailEl].forEach(el => {
      if (!el.value.trim()) {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 450);
      }
    });
    return;
  }

  if (!emailRegex.test(email)) {
    errEl.textContent = '⚠️ That email doesn\'t look right. Please check it.';
    errEl.style.display = 'block';
    emailEl.classList.add('shake');
    setTimeout(() => emailEl.classList.remove('shake'), 450);
    return;
  }

  errEl.style.display = 'none';

  // --- Loading state ---
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
      style="animation:spin 0.7s linear infinite">
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.25"/>
      <path d="M21 12c0-4.97-4.03-9-9-9"/>
    </svg> Processing…`;

  // --- 1. Trigger Resume Download from GitHub ---
  setTimeout(() => {
    fetch(RESUME_FILE)
      .then(res => {
        if (!res.ok) throw new Error('Download failed');
        return res.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = RESUME_FILENAME;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      })
      .catch(() => {
        // Fallback: open directly in new tab
        window.open(RESUME_FILE, '_blank');
      });
  }, 400);

  // --- 2. Send notification email to Manoj ---
  const now = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short'
  });

  const notifBody = [
    `👋 Hi Manoj!`,
    ``,
    `Someone just downloaded your resume from your portfolio website.`,
    ``,
    `📋 Visitor Details`,
    `──────────────────`,
    `Name        : ${name}`,
    `Email       : ${email}`,
    `Company     : ${company || '(not provided)'}`,
    `Purpose     : ${purpose || '(not provided)'}`,
    ``,
    `📅 Date & Time : ${now} (IST)`,
    ``,
    `──────────────────`,
    `This notification was sent automatically by your Portfolio Website.`,
    ``,
    `You can reply to this email to reach ${name} at: ${email}`,
  ].join('\n');

  const mailtoURL =
    `mailto:${OWNER_EMAIL}` +
    `?subject=${encodeURIComponent(`🔔 Resume Downloaded by ${name} — Portfolio Alert`)}` +
    `&body=${encodeURIComponent(notifBody)}`;

  // Open mail client after short delay (so download fires first)
  setTimeout(() => {
    window.location.href = mailtoURL;
  }, 700);

  // --- 3. Show success state ---
  setTimeout(() => {
    _rmodalShowSuccess();
    // Auto-close after 4 s
    setTimeout(() => closeResumeModal(), 4500);
  }, 1200);
}

/* Helpers */
function _rmodalShowForm() {
  const fields   = document.querySelector('.rmodal-fields');
  const actions  = document.querySelector('.rmodal-actions');
  const subtitle = document.querySelector('.rmodal-subtitle');
  const success  = document.getElementById('rm-success');
  const submitBtn = document.getElementById('rm-submit-btn');

  if (fields)   fields.style.display   = 'flex';
  if (actions)  actions.style.display  = 'flex';
  if (subtitle) subtitle.style.display = 'block';
  if (success)  success.style.display  = 'none';
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg> Download Now`;
  }
}

function _rmodalShowSuccess() {
  const fields   = document.querySelector('.rmodal-fields');
  const actions  = document.querySelector('.rmodal-actions');
  const subtitle = document.querySelector('.rmodal-subtitle');
  const errEl    = document.getElementById('rm-error');
  const success  = document.getElementById('rm-success');

  if (fields)   fields.style.display   = 'none';
  if (actions)  actions.style.display  = 'none';
  if (subtitle) subtitle.style.display = 'none';
  if (errEl)    errEl.style.display    = 'none';
  if (success)  success.style.display  = 'block';
}

// Close modal when clicking the dark backdrop
document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('resume-modal');
  if (backdrop) {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeResumeModal();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeResumeModal();
  });
});

