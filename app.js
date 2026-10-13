/* =============================================
   BELVANTIS — App Script
   ============================================= */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
if (navbar) window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- Mobile menu ----
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) menuToggle.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '72px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(5,8,22,0.97)';
  navLinks.style.padding = '20px 24px';
  navLinks.style.backdropFilter = 'blur(20px)';
  navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
});

// ---- Particle Canvas ----
const canvas = document.getElementById('particleCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let particles = [];
let animFrame;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
if (canvas) {
  resize();
  window.addEventListener('resize', resize);
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.size = Math.random() * 2 + 0.5;
    this.color = Math.random() > 0.5 ? '99,102,241' : '14,165,233';
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    ctx.fill();
  }
}

if (canvas) for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(99,102,241,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  animFrame = requestAnimationFrame(animateParticles);
}
if (canvas) animateParticles();

// ---- Founder photo fallback ----
const founderPhoto = document.getElementById('founderPhoto');
const founderFallback = document.getElementById('founderFallback');
if (founderPhoto) {
  founderPhoto.addEventListener('error', () => {
    founderPhoto.classList.add('hidden');
    if (founderFallback) founderFallback.classList.add('visible');
  });
}

// ---- Counter animation ----
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current);
  }, 16);
}

// ---- Intersection Observer for animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // trigger counters when hero stats visible
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

// Add fade-up to sections
document.querySelectorAll('.feature-card, .about-content, .about-visual, .how-step, .problem-block, .how-block, .contact-content, .founder-card').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Observe hero stats
const heroStats = document.querySelector('.hero-stats');
if (heroStats) observer.observe(heroStats);


// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // close mobile nav
    if (navLinks && window.innerWidth <= 768) navLinks.style.display = 'none';
  });
});
