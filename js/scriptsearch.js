let currentMatchIndex = 0;
let matches = [];
let scrollLocked = false;
let scrollTimeout;
let lastKeyword = "";

function clearHighlights() {
  document.querySelectorAll("mark.highlight").forEach(mark => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });
  matches = [];
  currentMatchIndex = 0;
}

function highlightMatches(keyword) {
  clearHighlights();
  matches = [];

  if (!keyword.trim()) return;

  const elements = Array.from(document.querySelectorAll("main section *")).filter(
    el => el.children.length === 0 && el.textContent.trim() !== ""
  );

  const foundMatches = [];

  for (const el of elements) {
    const text = el.textContent;
    const regex = new RegExp(`(${keyword})`, "gi");

    if (regex.test(text)) {
      const newHTML = text.replace(regex, '<mark class="highlight">$1</mark>');
      el.innerHTML = newHTML;
      foundMatches.push(...el.querySelectorAll("mark.highlight"));
    }
  }

  matches = foundMatches;
}

function scrollToMatch(index) {
  if (matches.length === 0) return;

  if (index >= matches.length) {
    currentMatchIndex = 0;
  } else if (index < 0) {
    currentMatchIndex = matches.length - 1;
  } else {
    currentMatchIndex = index;
  }

  matches.forEach(m => m.classList.remove("active-match"));
  matches[currentMatchIndex].classList.add("active-match");
  matches[currentMatchIndex].scrollIntoView({ behavior: "smooth", block: "center" });

  scrollLocked = true;
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    scrollLocked = false;
  }, 300);
}

function nextMatch() {
  scrollToMatch(currentMatchIndex + 1);
}

function prevMatch() {
  scrollToMatch(currentMatchIndex - 1);
}

function handleNextClick(input) {
  const keyword = input.value.trim();

  if (!keyword) {
    clearHighlights();
    return;
  }

  if (keyword !== lastKeyword) {
    lastKeyword = keyword;
    highlightMatches(keyword);
    if (matches.length > 0) {
      currentMatchIndex = -1;
      nextMatch();
    } else {
      clearHighlights();
      alert("No matches found");
    }
  } else {
    if (matches.length > 0) {
      nextMatch();
    } else {
      alert("No matches found");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  const searchToggle = document.getElementById("searchToggle");
  const closeSearch = document.getElementById("closeSearch");
  const closeSearchDesktop = document.getElementById("closeSearchDesktop");
  const mobileModal = document.getElementById("mobileSearchModal");
  const nextResult = document.getElementById("nextResult");
  const nextResultDesktop = document.getElementById("nextResultDesktop");
  const prevResult = document.getElementById("prevResult");
  const prevResultDesktop = document.getElementById("prevResultDesktop");

  function handleSearch(input) {
    const keyword = input.value.trim();
    highlightMatches(keyword);
    lastKeyword = keyword;
    if (matches.length > 0) {
      scrollToMatch(0);
    } else {
      alert("No matches found");
    }
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (matches.length > 0) {
          nextMatch();
        } else {
          handleSearch(searchInput);
        }
      }
    });

    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.trim();

      if (closeSearchDesktop) {
        closeSearchDesktop.style.display = keyword ? "inline-block" : "none";
      }

      highlightMatches(keyword);
      lastKeyword = keyword;
      if (matches.length > 0) {
        scrollToMatch(0);
      } else {
        clearHighlights();
      }
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (matches.length > 0) {
          nextMatch();
        } else {
          handleSearch(mobileSearchInput);
        }
      }
    });

    mobileSearchInput.addEventListener("input", () => {
      const keyword = mobileSearchInput.value.trim();

      if (closeSearch) {
        closeSearch.style.display = keyword ? "inline-block" : "none";
      }

      highlightMatches(keyword);
      lastKeyword = keyword;
      if (matches.length > 0) {
        scrollToMatch(0);
      } else {
        clearHighlights();
      }
    });
  }

  if (searchToggle) {
    searchToggle.addEventListener("click", () => {
      mobileModal.classList.add("show");
      mobileSearchInput.focus();
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener("click", () => {
      mobileModal.classList.remove("show");
      mobileSearchInput.value = "";
      closeSearch.style.display = "none";
      clearHighlights();
      matches = [];
      currentMatchIndex = 0;
      lastKeyword = "";
    });
  }

  if (closeSearchDesktop) {
    closeSearchDesktop.addEventListener("click", () => {
      searchInput.value = "";
      closeSearchDesktop.style.display = "none";
      clearHighlights();
      matches = [];
      currentMatchIndex = 0;
      lastKeyword = "";
    });
  }

  document.addEventListener("click", (e) => {
    if (
      mobileModal.classList.contains("show") &&
      !e.target.closest(".mobile-search-box") &&
      !e.target.closest("#searchToggle")
    ) {
      mobileModal.classList.remove("show");
    }
  });

  if (nextResult) {
    nextResult.addEventListener("click", () => {
      handleNextClick(mobileSearchInput);
    });
  }

  if (nextResultDesktop) {
    nextResultDesktop.addEventListener("click", () => {
      handleNextClick(searchInput);
    });
  }

  if (prevResult) {
    prevResult.addEventListener("click", () => {
      prevMatch();
    });
  }

  if (prevResultDesktop) {
    prevResultDesktop.addEventListener("click", () => {
      prevMatch();
    });
  }
});
