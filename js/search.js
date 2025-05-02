const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const searchBox = document.getElementById("search-nav");
const matchInfo = document.getElementById("match-info");
const btnPrev = document.getElementById("prevMatch");
const btnNext = document.getElementById("nextMatch");
const btnClose = document.getElementById("closeMatch");

const searchableElements = document.querySelectorAll(".hero-text, .projects-section, .case-study, .certificates-section, .stats, .contact-banner, .footer");

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
  const query = searchInput.value.trim().toLowerCase();

  if (query === "") {
    alert("Please type a word to search.");
    return;
  }

  isSearchActive = true;
  matchSpans = [];
  currentIndex = 0;
  let resultsFound = false;

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
  if (resultsFound && matchSpans.length > 0) {
    searchBox.classList.remove("d-none");
    matchInfo.textContent = `1/${matchSpans.length}`;
    scrollToMatch(0);
  } else {
    searchableElements.forEach(section => {
      section.style.display = "";
    });
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
