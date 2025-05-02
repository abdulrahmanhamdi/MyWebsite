document.addEventListener('DOMContentLoaded', () => {
  // === Swiper: Clients ===
  const swiperClients = new Swiper('.client-swiper', {
    slidesPerView: 3,
    centeredSlides: true,
    loop: true,
    spaceBetween: 30,
    autoplay: { delay: 3000, disableOnInteraction: false },
    speed: 2500,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // === Swiper: Testimonials ===
  const swiperTestimonials = new Swiper('.testimonial-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: true,
    freeMode: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 1 }
    }
  });

  // === Counter
  if (window.jQuery && $('.counter').length) {
    $('.counter').counterUp({ time: 1000 });
  }

  // === Dark Mode
  const modeToggle = document.getElementById('modeToggle');
  const modeIcon = document.getElementById('modeIcon');
  const savedTheme = localStorage.getItem('theme') || 'light';

  function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    modeIcon.className = theme === 'dark' ? 'bi bi-moon-fill' : 'bi bi-brightness-high-fill';
    localStorage.setItem('theme', theme);
  }

  applyTheme(savedTheme);

  modeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    modeIcon.className = isDark ? 'bi bi-moon-fill' : 'bi bi-brightness-high-fill';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // === Mobile Nav Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.main-nav li a');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('.main-nav').classList.toggle('show-it');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.main-nav').classList.remove('show-it');
    });
  });

  window.addEventListener('scroll', () => {
    document.querySelector('.main-nav')?.classList.remove('show-it');
  });

  // === Typing Animation
  const typedTextSpan = document.getElementById("typed-text");
  const textArray = ["Freelance Programmer", "Front-end Developer", "AI Enthusiast"];
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (!typedTextSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex++);
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1500);
    }
  }

  function erase() {
    if (!typedTextSpan) return;
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, --charIndex);
      setTimeout(erase, 50);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, 500);
    }
  }

  if (typedTextSpan) setTimeout(type, 1000);

  // === Parallax Hero
  const hero = document.querySelector('header.hero');
  const isMobile = window.innerWidth <= 768;

  if (hero) {
    if (!isMobile) {
      document.addEventListener('mousemove', (e) => {
        let x = (e.clientX / window.innerWidth - 0.5) * 20;
        let y = (e.clientY / window.innerHeight - 0.5) * 20;
        hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
      });
    } else {
      window.addEventListener('scroll', () => {
        hero.style.backgroundPosition = `center ${50 + window.scrollY * 0.1}%`;
      });
    }
  }
});
// Auto close navbar collapse on scroll (mobile only)
window.addEventListener('scroll', () => {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
  
  if (window.innerWidth <= 768 && navbarCollapse.classList.contains('show')) {
    bsCollapse.hide();
  }
});
  // Get all project cards
  const projectCards = document.querySelectorAll('.project-card');

  // For each card, attach click event
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = 'block';
    });
  });

  // Get all close buttons
  const closeButtons = document.querySelectorAll('.modal .close');

  // Attach event to each close button
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      modal.style.display = 'none';
    });
  });

  // Close modal on outside click
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });

  // Optional: Close modal on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
      });
    }
  });