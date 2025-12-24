// ===================================
// ANGEL G. A. PREMPEH - PERSONAL WEBSITE
// Simplified Interactive JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeToggle();
  initScrollAnimations();
  initMobileMenu();
  initSmoothScroll();
});

// === NAVIGATION ===
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

function initNavigation() {
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Hide/show header on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }

    lastScrollY = currentScrollY;
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// === MOBILE MENU ===
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// === THEME TOGGLE ===
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  const currentTheme = localStorage.getItem('theme') ||
    (prefersDarkScheme.matches ? 'dark' : 'light');

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// === SCROLL ANIMATIONS ===
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        
        // Add staggered animation for grid items
        if (entry.target.classList.contains('research-card') || 
            entry.target.classList.contains('activity-card')) {
          const cards = document.querySelectorAll('.research-card, .activity-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('fade-in');
            }, index * 100);
          });
        }
        
        // Animate stats with counter effect
        if (entry.target.classList.contains('stat-number')) {
          animateCounter(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe elements for fade-in
  const elementsToAnimate = document.querySelectorAll(
    '.section-header, .hero-content, .about-content, .highlight-card, .research-card, .activity-card, .interests, .stat, .contact-content'
  );

  elementsToAnimate.forEach(el => observer.observe(el));
  
  // Observe stat numbers for counter animation
  document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

// Animate stat counters
function animateCounter(element) {
  const target = element.textContent.replace('+', '');
  const isPlus = element.textContent.includes('+');
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;
  let current = 0;
  
  const increment = parseInt(target) / steps;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= parseInt(target)) {
      element.textContent = target + (isPlus ? '+' : '');
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + (isPlus ? '+' : '');
    }
  }, stepDuration);
}

// === SMOOTH SCROLL ===
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
