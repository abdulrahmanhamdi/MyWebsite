// ===== Cursor Glow Effect =====
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.top = `${e.clientY}px`;
  glow.style.left = `${e.clientX}px`;
});

// ===== Sound Control =====
const clickSound = document.getElementById("click-sound");
const modeSound = document.getElementById("mode-sound");
let soundMuted = localStorage.getItem("muted") === "true";

function updateMuteIcon() {
  const icon = document.getElementById("muteIcon");
  icon.className = soundMuted ? "bi bi-volume-mute-fill" : "bi bi-volume-up-fill";
}
function playSound(sound) {
  if (!soundMuted && sound) {
    sound.currentTime = 0;
    sound.play();
  }
}
document.addEventListener("DOMContentLoaded", updateMuteIcon);
document.getElementById("muteToggle").addEventListener("click", () => {
  soundMuted = !soundMuted;
  localStorage.setItem("muted", soundMuted);
  updateMuteIcon();
  playSound(clickSound);
});

// ===== Dark/Light Mode Toggle =====
const modeToggle = document.getElementById("modeToggle");
const modeIcon = document.getElementById("modeIcon");

function setMode(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    modeIcon.className = "bi bi-sun-fill";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    modeIcon.className = "bi bi-moon-fill";
    localStorage.setItem("theme", "light");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme") || "light";
  setMode(saved);
});
modeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-mode");
  setMode(isDark ? "light" : "dark");
  playSound(modeSound);
});

// ===== CounterUp - Pure JS Implementation =====
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.textContent.replace('k', '');
        let count = 0;
        const step = Math.ceil(target / 50);
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            clearInterval(interval);
            el.textContent = target + (el.textContent.includes('k') ? 'k' : '');
          } else {
            el.textContent = count;
          }
        }, 20);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
});

// ===== Swiper Testimonials =====
const swiperTestimonials = new Swiper('.testimonial-swiper', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// ===== particles.js =====
particlesJS("particles-js", {
  particles: {
    number: { value: 70, density: { enable: true, value_area: 800 } },
    color: { value: "#22d3ee" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#22d3ee",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out"
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

// ===== Back to Top Button =====
const backToTopBtn = document.querySelector('.back-to-top-icon');
document.querySelector('.back-to-top-icon').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
document.querySelector('.back-to-top-icon').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// ===== Sidebar Toggle =====
document.getElementById("sidebarToggle").addEventListener("click", function () {
  document.getElementById("sidebar").classList.add("active");
});
document.getElementById("closeSidebar").addEventListener("click", function () {
  document.getElementById("sidebar").classList.remove("active");
});
setTimeout(() => {
  const firstLink = document.querySelector("#sidebar .sidebar-menu a");
  if (firstLink) firstLink.focus();
}, 100);

const stars = document.querySelectorAll('.star-rating .stars i');

stars.forEach((star) => {
  star.addEventListener('mouseover', function () {
    const value = parseInt(this.getAttribute('data-value'));
    highlightStars(value);
  });

  star.addEventListener('mouseout', resetStars);

  star.addEventListener('click', function () {
    const value = parseInt(this.getAttribute('data-value'));
    localStorage.setItem('feedback-rating', value);
    markSelected(value);
  });
});

function highlightStars(value) {
  stars.forEach((star) => {
    const starValue = parseInt(star.getAttribute('data-value'));
    star.classList.toggle('hovered', starValue <= value);
  });
}

function resetStars() {
  stars.forEach((star) => star.classList.remove('hovered'));
}

function markSelected(value) {
  stars.forEach((star) => {
    const starValue = parseInt(star.getAttribute('data-value'));
    star.classList.toggle('selected', starValue <= value);
  });
}

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('feedback-rating');
});

const savedRating = localStorage.getItem('feedback-rating');
if (savedRating) markSelected(parseInt(savedRating));





