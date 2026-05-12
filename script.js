/* ============================================================
   PRINT CHEMISTRY — JavaScript
============================================================ */

// ---------- NAVBAR SCROLL EFFECT ----------
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 80) {
    navbar.style.boxShadow = '0 4px 28px rgba(0,0,0,0.14)';
    backToTop.classList.add('show');
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
    backToTop.classList.remove('show');
  }
});

// ---------- HAMBURGER MENU ----------
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.innerHTML = navLinks.classList.contains('open')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close nav on link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// ---------- FAQ ACCORDION ----------
function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const isOpen = el.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-q').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.classList.remove('show');
  });

  // Open clicked (if wasn't open)
  if (!isOpen) {
    el.classList.add('open');
    answer.classList.add('show');
  }
}

// ---------- CONTACT FORM ----------
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
    success.style.display = 'flex';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }, 1800);
}

// ---------- SCROLL TO TOP ----------
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- SCROLL ANIMATIONS (Intersection Observer) ----------
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -50px 0px' };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add base animation styles and observe elements
const style = document.createElement('style');
style.textContent = `
  .service-card,
  .cat-card,
  .step-card,
  .testi-card,
  .staffing-card,
  .why-feature,
  .faq-item {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }
  .animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

document.querySelectorAll(
  '.service-card, .cat-card, .step-card, .testi-card, .staffing-card, .why-feature, .faq-item'
).forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// ---------- ANIMATED COUNTER (stats numbers) ----------
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + suffix;
  }, 25);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.count;
      const suffix = el.dataset.suffix || '';
      animateCounter(el, parseFloat(raw), suffix);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ---------- SMOOTH ACTIVE NAV HIGHLIGHT ----------
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.classList.remove('active-nav');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active-nav');
  });
});

// ---------- ADD ACTIVE NAV STYLE ----------
const navStyle = document.createElement('style');
navStyle.textContent = `.active-nav { background: #ffeef1 !important; color: var(--primary) !important; }`;
document.head.appendChild(navStyle);

// ---------- HERO SECTION FULL DARK BG ----------
// Wrap hero in a full-width dark background
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const wrapper = document.createElement('div');
    wrapper.className = 'hero-wrapper';
    wrapper.style.cssText = `
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    `;
    hero.parentNode.insertBefore(wrapper, hero);
    wrapper.appendChild(hero);
    hero.style.background = 'transparent';
  }
});
