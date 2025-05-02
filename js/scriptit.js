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
  document.getElementById("sidebarToggle").addEventListener("click", function () {
    document.getElementById("sidebar").classList.add("active");
  });

  document.getElementById("closeSidebar").addEventListener("click", function () {
    document.getElementById("sidebar").classList.remove("active");
  });
  const searchInput = document.getElementById("searchInput");
  const searchForm = document.getElementById("searchForm");
  const searchBox = document.getElementById("search-nav");
  const matchInfo = document.getElementById("match-info");
  const btnPrev = document.getElementById("prevMatch");
  const btnNext = document.getElementById("nextMatch");
  const btnClose = document.getElementById("closeMatch");
  
  const searchableElements = document.querySelectorAll("section:not(.swiper), .testimonial-box, .about-infinityteam, .stat-box");
  let matchSpans = [];
  let currentIndex = 0;
  let isSearchActive = false; 
  
  function removeHighlights(element) {
    const highlights = element.querySelectorAll("span.highlight-result");
    highlights.forEach(span => {
      span.replaceWith(span.textContent);
    });
  }
  
  function highlightText(node, keyword) {
    const text = node.textContent;
    const keywordIndex = text.toLowerCase().indexOf(keyword);
    if (keywordIndex !== -1) {
      const before = text.slice(0, keywordIndex);
      const match = text.slice(keywordIndex, keywordIndex + keyword.length);
      const after = text.slice(keywordIndex + keyword.length);
  
      const span = document.createElement("span");
      span.className = "highlight-result";
      span.textContent = match;
  
      const fragment = document.createDocumentFragment();
      if (before) fragment.appendChild(document.createTextNode(before));
      fragment.appendChild(span);
      if (after) fragment.appendChild(document.createTextNode(after));
  
      node.replaceWith(fragment);
    }
  }
  
  function walkAndHighlight(element, keyword) {
    const treeWalker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    const textNodes = [];
  
    while (treeWalker.nextNode()) {
      textNodes.push(treeWalker.currentNode);
    }
  
    textNodes.forEach(node => {
      if (node.parentNode && !node.parentNode.closest(".highlight-result")) {
        highlightText(node, keyword);
      }
    });
  }
  
  function scrollToMatch(index) {
    if (matchSpans[index]) {
      matchSpans[index].scrollIntoView({ behavior: "smooth", block: "center" });
      matchSpans.forEach(span => span.style.backgroundColor = "rgba(0, 174, 255, 0.2)");
      matchSpans[index].style.backgroundColor = "#ffc107";
    }
  }
  
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    isSearchActive = true; 
  
    const query = searchInput.value.trim().toLowerCase();
    let resultsFound = false;
    matchSpans = [];
    currentIndex = 0;
  
    searchableElements.forEach(section => {
      section.style.display = "none";
      removeHighlights(section);
  
      if (section.innerText.toLowerCase().includes(query)) {
        section.style.display = "";
        walkAndHighlight(section, query);
        resultsFound = true;
      }
    });
  
    matchSpans = Array.from(document.querySelectorAll(".highlight-result"));
    if (matchSpans.length > 0) {
      searchBox.classList.remove("d-none");
      matchInfo.textContent = `1/${matchSpans.length}`;
      scrollToMatch(0);
    } else {
      searchBox.classList.add("d-none");
      alert("No results found for: " + query);
    }
  });
  
  searchInput.addEventListener("input", function () {
    if (!this.value.trim()) {
      searchableElements.forEach(section => {
        section.style.display = "";
        removeHighlights(section);
      });
      matchSpans = [];
      currentIndex = 0;
      isSearchActive = false; 
      searchBox.classList.add("d-none");
    }
  });
  
  btnNext.addEventListener("click", () => {
    if (matchSpans.length === 0) return;
    currentIndex = (currentIndex + 1) % matchSpans.length;
    scrollToMatch(currentIndex);
    matchInfo.textContent = `${currentIndex + 1}/${matchSpans.length}`;
  });
  
  btnPrev.addEventListener("click", () => {
    if (matchSpans.length === 0) return;
    currentIndex = (currentIndex - 1 + matchSpans.length) % matchSpans.length;
    scrollToMatch(currentIndex);
    matchInfo.textContent = `${currentIndex + 1}/${matchSpans.length}`;
  });
  
  btnClose.addEventListener("click", () => {
    searchBox.classList.add("d-none");
    searchInput.value = "";
    isSearchActive = false; 
  
    searchableElements.forEach(section => {
      section.style.display = "";
      removeHighlights(section);
    });
  });
  
  window.addEventListener("scroll", () => {
    if (isSearchActive) return; 
  
    const sidebar = document.getElementById("sidebar");
    const navbar = document.getElementById("mainNavbar");
  
    if (sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }
  
    if (navbar.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  });
  
  document.querySelectorAll(".sidebar-menu a, .navbar-nav a").forEach(link => {
    link.addEventListener("click", () => {
    });
  });
  