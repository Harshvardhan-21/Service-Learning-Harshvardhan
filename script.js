/* ============================================================
   CYBER FRAUD AWARENESS — script.js
   ============================================================ */

/* ── PARTICLE CANVAS ────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.r  = Math.random() * 1.5 + 0.3;
    this.a  = Math.random() * 0.5 + 0.1;
  }

  function init() {
    particles = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 245, 255, ${p.a})`;
      ctx.fill();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 245, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ── NAVBAR SCROLL ──────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

/* ── HAMBURGER MENU ─────────────────────────────────────────── */
(function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
})();

/* ── COUNTER ANIMATION ──────────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.stat-num');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const step   = target / (duration / 16);
      let current  = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current);
        }
      }, 16);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ── SCROLL REVEAL (replaces AOS) ──────────────────────────── */
(function initScrollReveal() {
  const items = document.querySelectorAll('.about-card, .psych-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const delay = entry.target.dataset.aosDelay
          ? parseInt(entry.target.dataset.aosDelay, 10)
          : 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => observer.observe(item));
})();

/* ── THREAT CARD FLIP (touch / click) ──────────────────────── */
(function initFlipCards() {
  const cards = document.querySelectorAll('.threat-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
    // Keyboard accessibility
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
    });
  });
})();

/* ── PREVENTION TABS ────────────────────────────────────────── */
(function initTabs() {
  const buttons  = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      buttons.forEach(b  => b.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById('tab-' + target);
      if (panel) panel.classList.add('active');
    });
  });
})();

/* ── SCROLL TO TOP ──────────────────────────────────────────── */
(function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── PASSWORD PROTECTED DOWNLOAD ────────────────────────────── */
(function initDownload() {
  const downloadBtn = document.getElementById('downloadBtn');
  const overlay     = document.getElementById('pwdOverlay');
  const closeBtn    = document.getElementById('pwdClose');
  const input       = document.getElementById('pwdInput');
  const submitBtn   = document.getElementById('pwdSubmit');
  const errorMsg    = document.getElementById('pwdError');
  const eyeBtn      = document.getElementById('pwdEye');
  const inputWrap   = document.getElementById('pwdInputWrap');

  if (!downloadBtn || !overlay) return;

  const CORRECT_PASSWORD = '4268';
  const PDF_PATH = 'Harshvardhan_Service Learning.pdf';

  function openModal() {
    overlay.classList.add('open');
    setTimeout(() => input.focus(), 350);
    errorMsg.classList.remove('show');
    input.value = '';
  }

  function closeModal() {
    overlay.classList.remove('open');
    errorMsg.classList.remove('show');
    input.value = '';
  }

  function triggerShake() {
    inputWrap.classList.remove('shake');
    void inputWrap.offsetWidth; // reflow to restart animation
    inputWrap.classList.add('shake');
    setTimeout(() => inputWrap.classList.remove('shake'), 450);
  }

  function attemptDownload() {
    const val = input.value.trim();
    if (val === CORRECT_PASSWORD) {
      // Correct — trigger download
      errorMsg.classList.remove('show');
      const link = document.createElement('a');
      link.href = PDF_PATH;
      link.download = PDF_PATH;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(closeModal, 400);
    } else {
      // Wrong password
      triggerShake();
      errorMsg.classList.add('show');
      input.value = '';
      input.focus();
    }
  }

  // Toggle password visibility
  eyeBtn.addEventListener('click', () => {
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    eyeBtn.querySelector('i').className = isText ? 'fas fa-eye' : 'fas fa-eye-slash';
  });

  downloadBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Close on overlay background click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Submit on Enter key
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') attemptDownload();
    if (e.key === 'Escape') closeModal();
  });

  submitBtn.addEventListener('click', attemptDownload);
})();
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));
})();
