// Initialize Client Swiper
var swiper1 = new Swiper('.client-swiper', {
    slidesPerView: 3,
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 60,
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10, pagination: '.swiper-pagination' },
      480: { slidesPerView: 1, spaceBetween: 20 },
      640: { slidesPerView: 1, spaceBetween: 30 }
    }
  });
  
  // Initialize Testimonial Swiper
  var swiper2 = new Swiper('.testimonial-swiper', {
    slidesPerView: 3,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30,
    grabCursor: true,
    freeMode: true,
    breakpoints: {
      320: { slidesPerView: 1, spaceBetween: 10 },
      480: { slidesPerView: 1, spaceBetween: 10 },
      640: { slidesPerView: 1, spaceBetween: 10 }
    }
  });
  
  // Another Swiper instance (ensure this is needed or combine with swiper1)
  var swiper = new Swiper('.client-swiper', {
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
  
  // Counter Initialization
  $('.counter').counterUp({ time: 1000 });
  
  // Menu Toggle
  $('#menu-toggle').click(function(){
    $(this).toggleClass('open');
    $('.main-nav').toggleClass('show-it');
  });
  
  // Dark Mode Toggle
  function toggleDarkMode() {
    const themeLink = document.getElementById('theme-link');
    const modeIcon = document.getElementById('mode-icon');
  
    if (themeLink.getAttribute('href') === 'css/light.css') {
      themeLink.setAttribute('href', 'css/dark.css');
      modeIcon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeLink.setAttribute('href', 'css/light.css');
      modeIcon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeLink = document.getElementById('theme-link');
    const modeIcon = document.getElementById('mode-icon');
  
    themeLink.setAttribute('href', `css/${savedTheme}.css`);
    modeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  });
  
  
  // Navbar toggle on mobile
  const menuToggle = document.getElementById('menu-toggle');
  const navbarRight = document.getElementById('navbar-right');
  const navLinks = document.querySelectorAll('.main-nav li a');
  
  menuToggle.addEventListener('click', () => {
    navbarRight.classList.toggle('active');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navbarRight.classList.remove('active');
    });
  });
  
  window.addEventListener('scroll', () => {
    if (navbarRight.classList.contains('active')) {
      navbarRight.classList.remove('active');
    }
  });
  const typedTextSpan = document.getElementById("typed-text");
  const textArray = ["Freelance Programmer", "Front-end Developer", "AI Enthusiast"];
  let textArrayIndex = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1500);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, 500);
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, 1000);
  });
// Parallax effect for Hero Section
const hero = document.querySelector('header.hero');

// Detect if device is mobile
function isMobileDevice() {
  return window.innerWidth <= 768; 
}

if (!isMobileDevice()) {
  document.addEventListener('mousemove', (e) => {
    let x = (e.clientX / window.innerWidth) - 0.5;
    let y = (e.clientY / window.innerHeight) - 0.5;
    hero.style.backgroundPosition = `${50 + x * 10}% ${50 + y * 10}%`;
  });
} else {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    hero.style.backgroundPosition = `center ${50 + scrollY * 0.1}%`;
  });
}
