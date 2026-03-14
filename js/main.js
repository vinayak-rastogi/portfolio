// =============================================
// NAVBAR — scroll effect + active link
// =============================================
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// =============================================
// MOBILE NAV — hamburger toggle
// =============================================
const hamburger = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileNav() {
  mobileNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileNav);
mobileClose.addEventListener('click', closeMobileNav);
mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('open')) closeMobileNav();
});

// =============================================
// SCROLL ANIMATIONS — timeline + project cards
// =============================================
const animatedEls = document.querySelectorAll('.timeline-item, .project-card');
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
animatedEls.forEach(el => animObserver.observe(el));

// =============================================
// SKILLS — tab switching + bar animation
// =============================================
(function() {
  const tabs = document.querySelectorAll('.sk-tab');
  if (!tabs.length) return;

  function animateBars(panel) {
    panel.querySelectorAll('.sk-fill').forEach(fill => {
      fill.classList.remove('animated');
      requestAnimationFrame(() => requestAnimationFrame(() => fill.classList.add('animated')));
    });
  }

  // Animate bars of the initially active panel on load
  const activePanel = document.querySelector('.sk-panel.active');
  if (activePanel) setTimeout(() => animateBars(activePanel), 200);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const targetId = tab.dataset.panel;
      document.querySelectorAll('.sk-panel').forEach(p => p.classList.remove('active'));
      const panel = document.getElementById(targetId);
      if (panel) {
        panel.classList.add('active');
        animateBars(panel);
      }
    });
  });
})();

// =============================================
// EXPERIENCE — expand / collapse
// =============================================
document.querySelectorAll('.tl-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.timeline-card');
    const expandable = card.querySelector('.tl-expandable');
    const isOpen = expandable.classList.toggle('open');
    expandable.setAttribute('aria-hidden', String(!isOpen));
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    btn.querySelector('.tl-toggle-text').textContent = isOpen ? 'View Less' : 'View More';
  });
});

// =============================================
// BACK TO TOP
// =============================================
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// =============================================
// CONTACT FORM — mailto fallback
// =============================================
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('form-name').value.trim();
  const email = document.getElementById('form-email').value.trim();
  const subject = document.getElementById('form-subject').value.trim();
  const message = document.getElementById('form-message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  const mailSubject = encodeURIComponent(subject || `Portfolio Contact from ${name}`);
  const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:vinayak.rstg94@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  successMsg.style.display = 'block';
  form.reset();
  setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
});
