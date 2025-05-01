AOS.init({ duration: 1000, once: true });

// Vanilla Tilt effect
VanillaTilt.init(document.querySelectorAll(".project-card, .edu-block"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});

// Particles.js effect
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#22d3ee" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 }
    },
    opacity: { value: 0.5, random: false },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#22d3ee",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 4,
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

// Cursor glow effect
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.top = `${e.clientY}px`;
  glow.style.left = `${e.clientX}px`;
});

// === Sounds ===
const clickSound = document.getElementById("click-sound");
const modeSound = document.getElementById("mode-sound");
let soundMuted = localStorage.getItem("muted") === "true";

function updateMuteIcon() {
  const icon = document.getElementById("muteIcon");
  if (icon) icon.className = soundMuted ? "bi bi-volume-mute-fill" : "bi bi-volume-up-fill";
}

function playSound(sound) {
  if (!soundMuted && sound) {
    sound.currentTime = 0;
    sound.play();
  }
}


const muteToggle = document.getElementById("muteToggle");
if (muteToggle) {
  muteToggle.addEventListener("click", () => {
    soundMuted = !soundMuted;
    localStorage.setItem("muted", soundMuted);
    updateMuteIcon();
  });
}
document.addEventListener("DOMContentLoaded", updateMuteIcon);

document.querySelectorAll(".nav-sound").forEach(link => {
  link.addEventListener("click", () => playSound(clickSound));
});


const offcanvas = document.getElementById("sideMenu");
if (offcanvas) {
  offcanvas.addEventListener("show.bs.offcanvas", () => playSound(clickSound));
}


const modeToggles = [
  document.getElementById("modeToggle"),
  document.getElementById("modeToggleDesktop")
];
const iconElements = [
  document.getElementById("modeIcon"),
  document.getElementById("modeIconDesktop")
];

function setMode(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    iconElements.forEach(icon => icon && (icon.className = "bi bi-sun-fill"));
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    iconElements.forEach(icon => icon && (icon.className = "bi bi-moon-fill"));
    localStorage.setItem("theme", "light");
  }
}

modeToggles.forEach(btn => {
  if (btn) {
    btn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark-mode");
      setMode(isDark ? "light" : "dark");
      playSound(modeSound);
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme") || "dark";
  setMode(saved);
});

// Auto-collapse mobile navbar on scroll
window.addEventListener("scroll", () => {
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const isOpen = navbarCollapse && navbarCollapse.classList.contains("show");
  if (isOpen) {
    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: true });
    bsCollapse.hide();
  }
});

// Progress animations
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".circle").forEach(circle => {
    const percent = circle.getAttribute("data-percentage");
    const bar = circle.querySelector(".bar");
    const offset = 314 - (314 * percent) / 100;
    if (bar) bar.style.strokeDashoffset = offset;
  });

  document.querySelectorAll(".progress-bar").forEach(bar => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => { bar.style.width = width; }, 500);
  });

  document.querySelectorAll(".circular").forEach(circular => {
    const percent = circular.getAttribute("data-percentage");
    const progress = circular.querySelector(".bar");
    const offset = 314 - (314 * percent) / 100;
    if (progress) progress.style.strokeDashoffset = offset;
  });
});
