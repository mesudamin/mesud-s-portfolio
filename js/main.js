/**
 * =============================================================================
 *  MESUD AMIN — DEVELOPER PORTFOLIO JAVASCRIPT
 *  Pure Vanilla JS (Zero Dependencies, 100% Frontend Only)
 * =============================================================================
 *
 *  TABLE OF CONTENTS:
 *  01. PROJECT DATA CONFIGURATION  (Easily add/edit projects here)
 *  02. INITIALIZATION              (Main entry point on DOMContentLoaded)
 *  03. NAVIGATION & SCROLL-SPY     (Smooth scrolling & active link highlighting)
 *  04. MOBILE MENU DRAWER          (Accessible hamburger toggle & backdrop)
 *  05. PROJECT QUICKVIEW MODAL     (Architecture popup on "Live Demo" click)
 *  06. CONTACT FORM HANDLER        (Real mail client launcher & draft copier)
 *  07. CLIPBOARD & TOAST SYSTEM    (Copy email with feedback)
 * =============================================================================
 */


/* =============================================================================
   01. PROJECT DATA CONFIGURATION
   👉 To add or edit projects, simply update this object:
   ============================================================================= */
const PROJECT_DATA = {
  aurora: {
    title: 'Aurora Task Engine',
    category: 'Full-Stack Kanban & Agile Engine',
    stack: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'REST API'],
    url: 'https://aurora.mesudamin.dev',
    repo: 'https://github.com/mesudamin',
    image: 'assets/images/aurora-preview.jpg',
    description: 'Aurora Task Engine is a production-tested agile project tracking platform designed to eliminate bloat. Featuring live state synchronization, custom sprint pipelines, and relational database persistence built to simplify engineering backlogs.',
    highlights: [
      'Relational schema design with normalized tasks, sprint milestones, and user roles.',
      'Optimistic client UI updates with automated rollback on network disconnects.',
      'Comprehensive RESTful API with JWT bearer authentication and rate limiting.'
    ]
  },
  verve: {
    title: 'Verve Studio Agency',
    category: 'High-Performance Editorial Web Platform',
    stack: ['React', 'CSS Grid', 'Tailwind CSS', 'Responsive Design', 'WCAG 2.1'],
    url: 'https://vervestudio.agency',
    repo: 'https://github.com/mesudamin',
    image: 'assets/images/verve-preview.jpg',
    description: 'Editorial landing experience with fluid responsive layouts, micro-interactions, accessible typography, and fast cross-device rendering designed for creative brands.',
    highlights: [
      'Flawless Lighthouse audit results: 99 Performance, 100 Accessibility, 100 SEO.',
      'Asymmetric responsive grid system with zero horizontal viewport overflow.',
      'Custom micro-animations powered by lightweight native CSS transitions.'
    ]
  }
};


/* =============================================================================
   02. INITIALIZATION
   Runs once when the HTML document is fully loaded
   ============================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  initProjectModals();
  initContactForm();
  initClipboardFeatures();
});


/* =============================================================================
   03. NAVIGATION & SCROLL-SPY
   Handles smooth scrolling to sections and active navigation indicator
   ============================================================================= */
function initNavigation() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

  // Smooth scroll on link click with fixed header offset
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          closeMobileMenu();
        }
      }
    });
  });

  // IntersectionObserver to highlight current section in navigation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}` || (id === 'hero' && (href === '#' || href === '#hero'))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
          } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
          }
        });
      }
    });
  }, {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}


/* =============================================================================
   04. MOBILE MENU DRAWER
   Accessible hamburger toggle with smooth slide drawer and backdrop
   ============================================================================= */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = document.getElementById('mobile-menu-drawer')?.classList.contains('is-open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  overlay.addEventListener('click', closeMobileMenu);

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeProjectModal();
    }
  });

  // Automatically close mobile menu if resized back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  }, { passive: true });
}

function openMobileMenu() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-menu-drawer');
  const overlay = document.getElementById('mobile-menu-overlay');
  const icon = toggleBtn?.querySelector('.material-symbols-outlined');

  drawer?.classList.add('is-open');
  overlay?.classList.add('is-open');
  toggleBtn?.setAttribute('aria-expanded', 'true');
  if (icon) icon.textContent = 'close';
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-menu-drawer');
  const overlay = document.getElementById('mobile-menu-overlay');
  const icon = toggleBtn?.querySelector('.material-symbols-outlined');

  drawer?.classList.remove('is-open');
  overlay?.classList.remove('is-open');
  toggleBtn?.setAttribute('aria-expanded', 'false');
  if (icon) icon.textContent = 'menu';
  document.body.style.overflow = '';
}


/* =============================================================================
   05. PROJECT QUICKVIEW MODAL
   Displays interactive architecture details when clicking "Live Demo"
   ============================================================================= */
function initProjectModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const triggerButtons = document.querySelectorAll('[data-project-trigger]');

  triggerButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project-trigger');
      if (projectKey && PROJECT_DATA[projectKey]) {
        openProjectModal(PROJECT_DATA[projectKey]);
      }
    });
  });

  modalCloseBtn?.addEventListener('click', closeProjectModal);
  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeProjectModal();
    }
  });
}

function openProjectModal(data) {
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-project-title');
  const category = document.getElementById('modal-project-category');
  const img = document.getElementById('modal-project-img');
  const desc = document.getElementById('modal-project-desc');
  const stack = document.getElementById('modal-project-stack');
  const highlights = document.getElementById('modal-project-highlights');
  const liveLink = document.getElementById('modal-live-link');
  const repoLink = document.getElementById('modal-repo-link');

  if (!modal) return;

  if (title) title.textContent = data.title;
  if (category) category.textContent = data.category;
  if (img) img.src = data.image;
  if (desc) desc.textContent = data.description;

  if (stack) {
    stack.innerHTML = data.stack.map(tech => `<span class="chip">${tech}</span>`).join('');
  }

  if (highlights) {
    highlights.innerHTML = data.highlights.map(item => `
      <li class="modal-highlight-item">
        <span class="material-symbols-outlined" style="color:var(--accent-green-dark); font-size:16px; margin-top:2px;" aria-hidden="true">check</span>
        <span>${item}</span>
      </li>
    `).join('');
  }

  if (liveLink) liveLink.href = data.url;
  if (repoLink) repoLink.href = data.repo;

  modal.classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal?.classList.remove('is-active');
  document.body.style.overflow = '';
}


/* =============================================================================
   06. CONTACT FORM HANDLER
   Authentic submission handling without fake backend simulation
   ============================================================================= */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (!email || !message) {
      alert('Please fill out both your email and message.');
      return;
    }

    // Build real mailto link with encoded subject & body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${email}`);
    const body = encodeURIComponent(`From: ${email}\n\nMessage:\n${message}\n\n-- Sent via mesudamin.dev`);
    const mailtoUrl = `mailto:contact@mesudamin.dev?subject=${subject}&body=${body}`;

    if (feedback) {
      feedback.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; font-weight:600;">
            <span class="material-symbols-outlined" style="color:var(--accent-green-dark); font-size:18px;" aria-hidden="true">check_circle</span>
            <span>Ready to send! Launching your mail client...</span>
          </div>
          <p style="font-family:var(--font-body); font-size:0.875rem; color:var(--text-secondary); margin:0;">
            If your mail app didn't open automatically, use the buttons below or email directly to <strong>contact@mesudamin.dev</strong>.
          </p>
          <div style="margin-top:0.5rem; display:flex; gap:0.75rem; flex-wrap:wrap;">
            <a href="${mailtoUrl}" class="btn btn-primary" style="padding:0.5rem 1rem; font-size:0.8125rem;">
              <span>Open Mail App</span>
              <span class="material-symbols-outlined" style="font-size:14px;" aria-hidden="true">launch</span>
            </a>
            <button type="button" class="btn btn-outline" id="copy-draft-btn" style="padding:0.5rem 1rem; font-size:0.8125rem;">
              <span>Copy Message Text</span>
              <span class="material-symbols-outlined" style="font-size:14px;" aria-hidden="true">content_copy</span>
            </button>
          </div>
        </div>
      `;
      feedback.style.display = 'block';

      document.getElementById('copy-draft-btn')?.addEventListener('click', () => {
        navigator.clipboard.writeText(`From: ${email}\nTo: contact@mesudamin.dev\n\n${message}`).then(() => {
          showToast('Message text copied to clipboard!');
        });
      });

      // Launch user's default email client
      window.location.href = mailtoUrl;
    }
  });
}


/* =============================================================================
   07. CLIPBOARD & TOAST SYSTEM
   Copies text to clipboard and shows brief notification
   ============================================================================= */
function initClipboardFeatures() {
  const copyElements = document.querySelectorAll('[data-copy-text]');

  copyElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy-text') || 'contact@mesudamin.dev';
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${textToCopy}`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="material-symbols-outlined" style="font-size:18px; color:var(--accent-lime);" aria-hidden="true">check_circle</span>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
