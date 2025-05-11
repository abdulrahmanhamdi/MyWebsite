// ===== Section-based Autocomplete Search with Keyboard =====
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const autocompleteBox = document.getElementById("autocomplete-list");

const allSections = {
  "Home": "index.html",
  "Hero": "index.html#hero",
  "Contact": "about.html#contact",
  "Resume": "resume.html#resume",
  "Skills": "resume.html#skills",
  "Experience": "resume.html#experience",
  "Projects": "resume.html#projects",
  "Education": "resume.html#education",
  "Languages": "resume.html#languages",
  "Interests": "resume.html#interests",
  "Teaching": "resume.html#teaching",
  "Blog": "blog.html#blog",
  "Services": "services.html#services",
  "My Work": "services.html#my-work",
  "My Services": "services.html#my-services",
  "Infinity Team": "infinityteam.html#infinity-team",
  "Courses": "infinityteam.html#courses",
  "Timeline (About)": "about.html#timeline-about",
  "Timeline (Infinity)": "infinityteam.html#timeline-infinity",  
  "Testimonials": "infinityteam.html#testimonials",
  "Statistics": "infinityteam.html#statistics",
  "About": "about.html#about",
  "Unveiling GANs (Blog)": "blogs/gan-blog.html",
  "Understanding Recommendation Systems (Blog)": "blogs/recommendation-blog.html",
  "Algorithm Course - Home": "courses/algorithms.html#hero",
  "Algorithm Course - Midterm & Final": "courses/algorithms.html#midterms-finals",
  "Algorithm Course - Quizzes": "courses/algorithms.html#quizzes",
  "Algorithm Course - Lecture Videos": "courses/algorithms.html#lecture-videos",
  "Algorithm Course - Lecture Notes": "courses/algorithms.html#lecture-notes",
  "Algorithm Course - About": "courses/algorithms.html#about",
  "Algorithm Course - Contact": "courses/algorithms.html#contact",
  "Differential Equations - Home": "courses/differential.html#hero",
  "Differential Equations - Lecture Videos": "courses/differential.html#lecture-videos",
  "Differential Equations - Lecture Notes": "courses/differential.html#lecture-notes",
  "Differential Equations - About": "courses/differential.html#about",
  "Differential Equations - Contact": "courses/differential.html#contact",
  "Statistics Course - Home": "courses/probabilitystatistic.html#hero",
  "Statistics Course - Exam Videos": "courses/probabilitystatistic.html#midterms-finals",
  "Statistics Course - Exam PDFs": "courses/statistics.html#quizzes",
  "Statistics Course - Lecture Videos": "courses/statistics.html#lecture-videos",
  "Statistics Course - Lecture Notes": "courses/statistics.html#lecture-notes",
  "Statistics Course - About": "courses/statistics.html#about",
  "Statistics Course - Contact": "courses/statistics.html#contact",
  "Math 1 - Home": "courses/math1.html#hero",
  "Math 1 - Lecture Videos": "courses/math1.html#lecture-videos",
  "Math 1 - Lecture Notes": "courses/math1.html#lecture-notes",
  "Math 1 - About": "courses/math1.html#about",
  "Math 1 - Contact": "courses/math1.html#contact",
  "Math 2 - Home": "courses/math2.html#hero",
  "Math 2 - Lecture Videos": "courses/math2.html#lecture-videos",
  "Math 2 - Lecture Notes": "courses/math2.html#lecture-notes",
  "Math 2 - About": "courses/math2.html#about",
  "Math 2 - Contact": "courses/math2.html#contact"
};


let items = [];
let currentFocus = -1;

searchInput.addEventListener("input", function () {
  const val = this.value.toLowerCase();
  autocompleteBox.innerHTML = "";
  items = [];
  currentFocus = -1;

  if (!val) {
    autocompleteBox.classList.remove("active");
    return;
  }

  let found = false;

  Object.keys(allSections).forEach(key => {
    if (key.toLowerCase().includes(val)) {
      const item = document.createElement("div");
      item.textContent = key;
      item.addEventListener("click", () => {
        window.location.href = allSections[key];
        autocompleteBox.innerHTML = "";
        autocompleteBox.classList.remove("active");
        searchInput.blur(); 
      });
      autocompleteBox.appendChild(item);
      items.push(item);
      found = true;
    }
  });

  if (!found) {
    const noResult = document.createElement("div");
    noResult.textContent = "❌ No section with this name was found.";
    noResult.style.color = "#999";
    noResult.style.padding = "10px";
    noResult.style.pointerEvents = "none";
    autocompleteBox.appendChild(noResult);
    autocompleteBox.classList.add("active");
  } else {
    autocompleteBox.classList.add("active");
  }
});

searchInput.addEventListener("keydown", function (e) {
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    currentFocus++;
    highlightItem(items, currentFocus);
    e.preventDefault();
  } else if (e.key === "ArrowUp") {
    currentFocus--;
    highlightItem(items, currentFocus);
    e.preventDefault();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (currentFocus > -1 && items[currentFocus]) {
      items[currentFocus].click();
    }
  }
});

function highlightItem(items, index) {
  if (!items.length) return;
  if (index >= items.length) index = 0;
  if (index < 0) index = items.length - 1;
  currentFocus = index;
  items.forEach((el, i) => {
    el.classList.toggle("autocomplete-active", i === index);
  });
}

document.addEventListener("click", function (e) {
  if (!autocompleteBox.contains(e.target) && e.target !== searchInput) {
    autocompleteBox.innerHTML = "";
    autocompleteBox.classList.remove("active");
  }
});
// Close suggestions on click outside
document.addEventListener("click", function (e) {
  if (!autocompleteBox.contains(e.target) && e.target !== searchInput) {
    autocompleteBox.innerHTML = "";
  }
});
// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.main-navbar');
  navbar.classList.toggle('scrolled-navbar', window.scrollY > 50);
});
// ===== Voice Search Integration =====
const voiceBtn = document.getElementById("voiceBtn");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

voiceBtn.addEventListener("click", () => {
  recognition.start();
  voiceBtn.classList.add("listening");
  voiceBtn.innerHTML = '<i class="bi bi-mic-mute-fill"></i>';
});

recognition.addEventListener("result", (event) => {
  const transcript = event.results[0][0].transcript.trim();
  searchInput.value = transcript;
  searchInput.dispatchEvent(new Event("input"));
});

recognition.addEventListener("end", () => {
  voiceBtn.classList.remove("listening");
  voiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i>';
});

recognition.addEventListener("error", () => {
  voiceBtn.classList.remove("listening");
  voiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i>';
});

  recognition.addEventListener("result", (event) => {
    const transcript = event.results[0][0].transcript.trim();
    searchInput.value = transcript;
    searchInput.dispatchEvent(new Event("input"));
  });

  recognition.addEventListener("end", () => {
    voiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i>';
  });

  recognition.addEventListener("error", () => {
    voiceBtn.innerHTML = '<i class="bi bi-mic-fill"></i>';
  });
} else {
  voiceBtn.disabled = true;
  voiceBtn.title = "Voice search is not supported in this browser.";
}
