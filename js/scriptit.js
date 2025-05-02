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

// ===== CounterUp - Pure JS Implementation (no jQuery) =====
document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll('.counter');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.textContent.replace('k', '');
        let count = 0;
        const step = Math.ceil(target / 50);
        const interval = setInterval(() => {
          count += step;
          if (count >= target) {
            clearInterval(interval);
            counter.textContent = target + (counter.textContent.includes('k') ? 'k' : '');
          } else {
            counter.textContent = count;
          }
        }, 20);
        observer.unobserve(counter); // Run once only
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);
  counters.forEach(counter => observer.observe(counter));
});

// ===== Swiper: Courses (optional if you use it) =====
const swiperCourses = new Swiper(".myCoursesSwiper", {
  loop: true,
  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      translate: ["-100%", 0, -500],
      rotate: [0, 90, 0],
      opacity: 0.6,
    },
    next: {
      translate: ["100%", 0, -500],
      rotate: [0, -90, 0],
      opacity: 0.6,
    },
  },
  centeredSlides: true,
  slidesPerView: "auto",
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});

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
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
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
document.querySelector('.back-to-top-icon').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });