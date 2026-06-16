const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
const scrollTop = document.getElementById('scroll-top');
const pageLoader = document.getElementById('page-loader');
const revealElements = document.querySelectorAll('.reveal');
const typeTitle = document.querySelector('.typing-title');
const navLinks = document.querySelectorAll('.nav-link');

const typeText = typeTitle?.dataset?.text || '[YOUR_TITLE]';
const typingSpeed = 80;
let typeIndex = 0;

function typeLoop() {
  if (!typeTitle) return;
  if (typeIndex <= typeText.length) {
    typeTitle.textContent = typeText.slice(0, typeIndex);
    typeIndex += 1;
    setTimeout(typeLoop, typingSpeed);
  }
}

function handleNavToggle() {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
}

function handleScroll() {
  if (window.scrollY > 520) {
    scrollTop.classList.add('visible');
  } else {
    scrollTop.classList.remove('visible');
  }

  const sections = document.querySelectorAll('section[id]');
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
      });
    }
  });
}

function revealOnScroll() {
  revealElements.forEach((element) => {
    const viewportHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < viewportHeight - 120) {
      element.classList.add('active');
    }
  });
}

function animateSkillBars() {
  const progressBars = document.querySelectorAll('.progress span');
  progressBars.forEach((bar) => {
    const progressValue = bar.dataset.progress || '0%';
    setTimeout(() => {
      bar.style.width = progressValue;
    }, 500);
  });
}

function setCurrentYear() {
  const currentYear = new Date().getFullYear();
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = currentYear;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const submitButton = event.target.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.textContent = 'Message Sent';
    setTimeout(() => {
      submitButton.textContent = 'Send Message';
    }, 1800);
  }
  event.target.reset();
}

navToggle?.addEventListener('click', handleNavToggle);
scrollTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('contact-form')?.addEventListener('submit', handleFormSubmit);
window.addEventListener('scroll', () => {
  handleScroll();
  revealOnScroll();
});
window.addEventListener('load', () => {
  setTimeout(() => {
    pageLoader?.classList.add('loaded');
    pageLoader?.remove();
  }, 800);
  typeLoop();
  animateSkillBars();
  setCurrentYear();
  revealOnScroll();
});