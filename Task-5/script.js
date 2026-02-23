// SCROLL EFFECT 
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// HAMBURGER MOBILE MENU 
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');

  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// SEARCH BAR TOGGLE 
const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
  searchBar.classList.add('active');
  searchInput.focus();
});

closeSearch.addEventListener('click', () => {
  searchBar.classList.remove('active');
  searchInput.value = '';
});

// Close search bar on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchBar.classList.remove('active');
    searchInput.value = '';
    navLinks.classList.remove('open');
  }
});

// SEARCH FILTER POSTS
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll('.post-card');

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const desc = card.querySelector('p').textContent.toLowerCase();

    if (title.includes(query) || desc.includes(query)) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });

  // Show all if empty
  if (query === '') {
    cards.forEach(card => card.classList.remove('hidden'));
  }
});

// CATEGORY FILTER BUTTONS
const filterBtns = document.querySelectorAll('.filter-btn');
const postCards = document.querySelectorAll('.post-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Set active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    postCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        // Small animation on reveal
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeUp 0.4s ease both';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

//  LOAD MORE BUTTON

const loadMoreBtn = document.getElementById('loadMoreBtn');

loadMoreBtn.addEventListener('click', () => {
  // In a real project, this would fetch more posts from a server/API.
  // For demo: show a message and disable the button
  loadMoreBtn.textContent = 'No More Articles For Now ✓';
  loadMoreBtn.disabled = true;
  loadMoreBtn.style.opacity = '0.5';
  loadMoreBtn.style.cursor = 'default';
});

// ===== 7. NEWSLETTER FORM =====
const nlForm = document.getElementById('nlForm');
const nlSuccess = document.getElementById('nlSuccess');
const nlName = document.getElementById('nlName');
const nlEmail = document.getElementById('nlEmail');

nlForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload

  const name = nlName.value.trim();
  const email = nlEmail.value.trim();

  // Simple validation
  if (!name || !email) {
    showFormError('Please fill in all fields.');
    return;
  }

  if (!isValidEmail(email)) {
    showFormError('Please enter a valid email address.');
    return;
  }

  // Simulate a successful subscription
  // (In production, you'd send this to a server with fetch/axios)
  simulateSubscription(name, email);
});

function isValidEmail(email) {
  // Basic email regex check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(message) {
  // Remove existing error
  const existingError = nlForm.querySelector('.form-error');
  if (existingError) existingError.remove();

  const error = document.createElement('p');
  error.className = 'form-error';
  error.textContent = message;
  error.style.cssText = 'color:#f87171; font-size:13px; text-align:center; margin-top:-8px;';
  nlForm.appendChild(error);

  // Auto-remove after 3s
  setTimeout(() => error.remove(), 3000);
}

function simulateSubscription(name, email) {
  const submitBtn = nlForm.querySelector('.btn-primary');

  // Show loading state
  submitBtn.textContent = 'Subscribing...';
  submitBtn.disabled = true;

  // Simulate 1.2s network delay
  setTimeout(() => {
    // Hide form, show success
    nlForm.style.display = 'none';
    nlSuccess.classList.add('show');
    console.log(`Subscribed: ${name} — ${email}`);
    // In real app: send to backend API here
  }, 1200);
}

// ===== 8. BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// SMOOTH ACTIVE NAV LINK ON SCROLL 
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const observerOptions = {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) {
        activeLink.style.color = 'var(--accent)';
      }
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// LAZY LOADING IMAGES (Performance)
// If real <img> tags are used, this handles lazy loading via IntersectionObserver
const lazyImages = document.querySelectorAll('img[data-src]');

if (lazyImages.length > 0) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach(img => imageObserver.observe(img));
}

// CARD SCROLL REVEAL ANIMATION 
const revealElements = document.querySelectorAll('.post-card, .cat-card, .featured-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger animation for grid items
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Set initial hidden state for animation
revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  revealObserver.observe(el);
});

// CROSS-BROWSER COMPATIBILITY CHECKS 
(function checkCompatibility() {
  // Check for IntersectionObserver support (older browsers)
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements without animation
    revealElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    console.warn('IntersectionObserver not supported. Fallback applied.');
  }

  // Check for CSS custom properties support
  if (!window.CSS || !window.CSS.supports('color', 'var(--accent)')) {
    document.documentElement.style.setProperty('--accent', '#e8c96e');
    console.warn('CSS custom properties fallback applied.');
  }
})();

// LOG READY 
console.log('%c INKWELL BLOG ✦ Ready ', 'background:#e8c96e; color:#0c0c0f; font-weight:bold; padding:4px 10px; border-radius:4px;');
