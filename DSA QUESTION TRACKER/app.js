// ==========================================================================
// DSA Question Tracker - Application Logic
// ==========================================================================

const STORAGE_KEY_TOPICS = "dsa_tracker_topics_v1";
const STORAGE_KEY_PROGRESS = "dsa_tracker_progress_v1";
const STORAGE_KEY_THEME = "dsa_tracker_theme_v1";

// State
let topics = [];
let progress = {}; // { [problemId]: { solved: boolean, bookmarked: boolean, notes: string } }
let currentTheme = "dark";
let activeDifficulty = "all";
let activeStatus = "all";
let activeTopicId = "all";
let searchQuery = "";
let expandedTopics = new Set();
let currentEditingProblemId = null;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadData();
  setupEventListeners();
  populateTopicSelectOptions();
  renderTopicTabs();
  renderAll();
});

// Load data from LocalStorage or Data.js fallback
function loadData() {
  const savedTopics = localStorage.getItem(STORAGE_KEY_TOPICS);
  if (savedTopics) {
    try {
      topics = JSON.parse(savedTopics);
    } catch (e) {
      console.error("Error parsing saved topics:", e);
      topics = JSON.parse(JSON.stringify(initialTopicsData));
    }
  } else {
    topics = JSON.parse(JSON.stringify(initialTopicsData));
  }

  const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
  if (savedProgress) {
    try {
      progress = JSON.parse(savedProgress);
    } catch (e) {
      console.error("Error parsing saved progress:", e);
      progress = {};
    }
  } else {
    progress = {};
  }

  // Expand all topics by default
  topics.forEach((t) => expandedTopics.add(t.id));
}

function saveTopics() {
  localStorage.setItem(STORAGE_KEY_TOPICS, JSON.stringify(topics));
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
}

// Event Listeners setup
function setupEventListeners() {
  // Search Input
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderTopicsAndProblems();
  });

  // Difficulty Filter Buttons
  document.querySelectorAll("[data-difficulty]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-difficulty]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeDifficulty = btn.getAttribute("data-difficulty");
      renderTopicsAndProblems();
    });
  });

  // Status Filter Buttons
  document.querySelectorAll("[data-status]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-status]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeStatus = btn.getAttribute("data-status");
      renderTopicsAndProblems();
    });
  });

  // Header Action Buttons
  document.getElementById("btn-add-problem").addEventListener("click", () => openAddProblemModal());
  document.getElementById("modal-add-close").addEventListener("click", () => closeAddProblemModal());
  document.getElementById("btn-cancel-add").addEventListener("click", () => closeAddProblemModal());
  document.getElementById("form-add-problem").addEventListener("submit", handleAddProblemSubmit);

  // Notes Modal Buttons
  document.getElementById("modal-notes-close").addEventListener("click", () => closeNotesModal());
  document.getElementById("btn-cancel-notes").addEventListener("click", () => closeNotesModal());
  document.getElementById("btn-save-notes").addEventListener("click", handleSaveNotes);

  // Random Pick Button
  document.getElementById("btn-random-pick").addEventListener("click", handleRandomPick);

  // Theme Toggle Button
  const themeToggleBtn = document.getElementById("btn-theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", handleToggleTheme);
  }

  // Export Data Button
  document.getElementById("btn-export-data").addEventListener("click", handleExportData);

  // Reset Data Button
  document.getElementById("btn-reset-data").addEventListener("click", handleResetData);

  // Close modals on overlay backdrop click
  document.querySelectorAll(".modal-overlay").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  });
}

// Theme Logic
function initTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
  if (savedTheme) {
    currentTheme = savedTheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    currentTheme = "light";
  } else {
    currentTheme = "dark";
  }
  applyTheme(currentTheme, false);
}

function applyTheme(theme, showNotification = true) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY_THEME, theme);

  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");
  const label = document.getElementById("theme-toggle-label");
  const toggleBtn = document.getElementById("btn-theme-toggle");

  if (theme === "light") {
    if (sunIcon) sunIcon.style.display = "none";
    if (moonIcon) moonIcon.style.display = "inline-flex";
    if (label) label.textContent = "Dark";
    if (toggleBtn) toggleBtn.setAttribute("title", "Switch to Dark Mode");
  } else {
    if (sunIcon) sunIcon.style.display = "inline-flex";
    if (moonIcon) moonIcon.style.display = "none";
    if (label) label.textContent = "Light";
    if (toggleBtn) toggleBtn.setAttribute("title", "Switch to Light Mode");
  }

  if (showNotification) {
    const formatted = theme.charAt(0).toUpperCase() + theme.slice(1);
    showToast(`Switched to ${formatted} Mode`, "info");
  }
}

function handleToggleTheme() {
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme, true);
}

// Populate topic dropdown for the Add Problem form
function populateTopicSelectOptions() {
  const select = document.getElementById("select-problem-topic");
  select.innerHTML = topics
    .map((topic) => `<option value="${topic.id}">${escapeHtml(topic.name)}</option>`)
    .join("");
}

// Render topic navigation pill strip
function renderTopicTabs() {
  const container = document.getElementById("topic-tabs-container");
  const allCount = getTotalProblemsCount();

  let html = `
    <button class="topic-tab-btn ${activeTopicId === "all" ? "active" : ""}" data-topic-id="all">
      All Topics (${allCount})
    </button>
  `;

  topics.forEach((topic) => {
    const isAct = activeTopicId === topic.id;
    html += `
      <button class="topic-tab-btn ${isAct ? "active" : ""}" data-topic-id="${topic.id}">
        ${escapeHtml(topic.name)} (${topic.problems.length})
      </button>
    `;
  });

  container.innerHTML = html;

  // Add click handlers
  container.querySelectorAll(".topic-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".topic-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeTopicId = btn.getAttribute("data-topic-id");
      renderTopicsAndProblems();
    });
  });
}

// Calculate and render all metrics
function renderStats() {
  let totalProblems = 0;
  let totalSolved = 0;

  let easyTotal = 0;
  let easySolved = 0;

  let mediumTotal = 0;
  let mediumSolved = 0;

  let hardTotal = 0;
  let hardSolved = 0;

  topics.forEach((topic) => {
    topic.problems.forEach((problem) => {
      totalProblems++;
      const isSolved = progress[problem.id]?.solved || false;

      if (isSolved) totalSolved++;

      if (problem.difficulty === "Easy") {
        easyTotal++;
        if (isSolved) easySolved++;
      } else if (problem.difficulty === "Medium") {
        mediumTotal++;
        if (isSolved) mediumSolved++;
      } else if (problem.difficulty === "Hard") {
        hardTotal++;
        if (isSolved) hardSolved++;
      }
    });
  });

  // Calculate percentages
  const overallPercent = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;
  const easyPercent = easyTotal > 0 ? Math.round((easySolved / easyTotal) * 100) : 0;
  const mediumPercent = mediumTotal > 0 ? Math.round((mediumSolved / mediumTotal) * 100) : 0;
  const hardPercent = hardTotal > 0 ? Math.round((hardSolved / hardTotal) * 100) : 0;

  // Update Hero Circular Progress
  document.getElementById("stat-solved-count").textContent = totalSolved;
  document.getElementById("stat-total-count").textContent = totalProblems;
  document.getElementById("stat-overall-percentage").textContent = `${overallPercent}%`;
  document.getElementById("stat-progress-sub").textContent = `${overallPercent}% of question sheet completed`;

  // Animate Circular Ring (circumference = 2 * PI * 40 = 251.2)
  const circleOffset = 251.2 - (251.2 * overallPercent) / 100;
  const circleEl = document.getElementById("circle-progress-fill");
  circleEl.style.strokeDashoffset = circleOffset;

  // Update Easy
  document.getElementById("stat-easy-solved").textContent = easySolved;
  document.getElementById("stat-easy-total").textContent = easyTotal;
  document.getElementById("stat-easy-percent").textContent = `${easyPercent}%`;
  document.getElementById("bar-easy-fill").style.width = `${easyPercent}%`;

  // Update Medium
  document.getElementById("stat-medium-solved").textContent = mediumSolved;
  document.getElementById("stat-medium-total").textContent = mediumTotal;
  document.getElementById("stat-medium-percent").textContent = `${mediumPercent}%`;
  document.getElementById("bar-medium-fill").style.width = `${mediumPercent}%`;

  // Update Hard
  document.getElementById("stat-hard-solved").textContent = hardSolved;
  document.getElementById("stat-hard-total").textContent = hardTotal;
  document.getElementById("stat-hard-percent").textContent = `${hardPercent}%`;
  document.getElementById("bar-hard-fill").style.width = `${hardPercent}%`;
}

// Render the list of topics and their problems based on filters
function renderTopicsAndProblems() {
  const container = document.getElementById("topics-list-container");
  let renderedTopicsCount = 0;
  let totalMatchingProblems = 0;

  let html = "";

  topics.forEach((topic) => {
    // If specific topic is chosen in tab filter and this doesn't match, skip
    if (activeTopicId !== "all" && activeTopicId !== topic.id) {
      return;
    }

    // Filter problems of this topic
    const matchingProblems = topic.problems.filter((problem) => {
      // Difficulty filter
      if (activeDifficulty !== "all" && problem.difficulty !== activeDifficulty) {
        return false;
      }

      // Status filter
      const isSolved = progress[problem.id]?.solved || false;
      const isBookmarked = progress[problem.id]?.bookmarked || false;

      if (activeStatus === "solved" && !isSolved) return false;
      if (activeStatus === "unsolved" && isSolved) return false;
      if (activeStatus === "bookmarked" && !isBookmarked) return false;

      // Search query filter
      if (searchQuery) {
        const titleMatch = problem.title.toLowerCase().includes(searchQuery);
        const hintMatch = (problem.hint || "").toLowerCase().includes(searchQuery);
        const topicMatch = topic.name.toLowerCase().includes(searchQuery);
        if (!titleMatch && !hintMatch && !topicMatch) return false;
      }

      return true;
    });

    // If search/filter active and no problems match, hide this topic card
    if ((searchQuery || activeDifficulty !== "all" || activeStatus !== "all") && matchingProblems.length === 0) {
      return;
    }

    renderedTopicsCount++;
    totalMatchingProblems += matchingProblems.length;

    // Calculate topic progress (all problems in topic, regardless of current filter)
    const topicTotal = topic.problems.length;
    const topicSolved = topic.problems.filter((p) => progress[p.id]?.solved).length;
    const topicPercent = topicTotal > 0 ? Math.round((topicSolved / topicTotal) * 100) : 0;
    const isExpanded = expandedTopics.has(topic.id);

    html += `
      <section class="topic-section ${isExpanded ? "expanded" : ""}" id="topic-sec-${topic.id}">
        <div class="topic-header" onclick="toggleTopicAccordion('${topic.id}')">
          <div class="topic-title-group">
            <div class="topic-icon">
              ${getTopicIconSvg(topic.icon)}
            </div>
            <div class="topic-meta">
              <h2>${escapeHtml(topic.name)}</h2>
              <p>${escapeHtml(topic.description)}</p>
            </div>
          </div>

          <div class="topic-right-group">
            <div class="topic-progress-badge">
              <span class="topic-progress-text">${topicSolved}/${topicTotal} (${topicPercent}%)</span>
              <div class="topic-progress-bar">
                <div class="topic-progress-fill" style="width: ${topicPercent}%;"></div>
              </div>
            </div>
            <svg class="accordion-chevron" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <div class="problem-list" style="display: ${isExpanded ? "flex" : "none"};">
          ${
            matchingProblems.length === 0
              ? `<div class="empty-state" style="padding: 2rem 1rem;">
                   <p>No problems match current filters in this topic.</p>
                 </div>`
              : matchingProblems
                  .map((problem) => renderProblemRow(problem, topic))
                  .join("")
          }
        </div>
      </section>
    `;
  });

  if (renderedTopicsCount === 0) {
    html = `
      <div class="empty-state">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3>No problems found</h3>
        <p>No questions matched your current filter criteria or search query.</p>
      </div>
    `;
  }

  container.innerHTML = html;
}

// Render individual problem item
function renderProblemRow(problem, topic) {
  const isSolved = progress[problem.id]?.solved || false;
  const isBookmarked = progress[problem.id]?.bookmarked || false;
  const hasNote = Boolean(progress[problem.id]?.notes && progress[problem.id]?.notes.trim().length > 0);

  const diffBadgeClass =
    problem.difficulty === "Easy"
      ? "badge-easy"
      : problem.difficulty === "Medium"
      ? "badge-medium"
      : "badge-hard";

  return `
    <div class="problem-row ${isSolved ? "solved" : ""}" id="problem-row-${problem.id}">
      <div class="problem-left">
        <!-- Solved Checkbox -->
        <label class="checkbox-container" title="Mark as solved">
          <input 
            type="checkbox" 
            ${isSolved ? "checked" : ""} 
            onchange="toggleProblemSolved('${problem.id}', this.checked)"
          >
          <span class="checkmark">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
          </span>
        </label>

        <!-- Problem Details -->
        <div class="problem-details">
          <div class="problem-name-line">
            <a 
              href="${escapeHtml(problem.leetcodeUrl)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="problem-name"
              title="Open problem on LeetCode"
            >
              ${escapeHtml(problem.title)}
            </a>
            <div class="problem-badges">
              <span class="badge ${diffBadgeClass}">${escapeHtml(problem.difficulty)}</span>
            </div>
          </div>
          ${
            problem.hint
              ? `<div class="problem-hint-text" title="${escapeHtml(problem.hint)}">&#128161; ${escapeHtml(problem.hint)}</div>`
              : ""
          }
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="problem-actions">
        <!-- Bookmark / Star -->
        <button 
          class="action-icon-btn btn-star ${isBookmarked ? "bookmarked" : ""}" 
          title="${isBookmarked ? "Remove bookmark" : "Bookmark for revision"}"
          onclick="toggleProblemBookmark('${problem.id}')"
        >
          <svg fill="${isBookmarked ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path>
          </svg>
        </button>

        <!-- Notes Button -->
        <button 
          class="action-icon-btn btn-notes ${hasNote ? "has-note" : ""}" 
          title="${hasNote ? "View/edit notes" : "Add personal solution notes"}"
          onclick="openNotesModal('${problem.id}')"
        >
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
          </svg>
        </button>

        <!-- External Link Button -->
        <a 
          href="${escapeHtml(problem.leetcodeUrl)}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="action-icon-btn" 
          title="Open in LeetCode"
        >
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"></path>
          </svg>
        </a>
      </div>
    </div>
  `;
}

// Toggle solved state of a question
window.toggleProblemSolved = function (problemId, isChecked) {
  if (!progress[problemId]) {
    progress[problemId] = { solved: false, bookmarked: false, notes: "" };
  }

  progress[problemId].solved = isChecked;
  if (isChecked) {
    progress[problemId].solvedAt = new Date().toISOString();
    triggerCelebration();
    showToast("Problem completed! Keep the streak going!", "success");
  }

  saveProgress();
  renderStats();
  renderTopicsAndProblems();
};

// Toggle bookmark
window.toggleProblemBookmark = function (problemId) {
  if (!progress[problemId]) {
    progress[problemId] = { solved: false, bookmarked: false, notes: "" };
  }

  progress[problemId].bookmarked = !progress[problemId].bookmarked;
  saveProgress();
  renderTopicsAndProblems();

  if (progress[problemId].bookmarked) {
    showToast("Added to bookmarked revision list", "info");
  }
};

// Toggle accordion expand / collapse
window.toggleTopicAccordion = function (topicId) {
  if (expandedTopics.has(topicId)) {
    expandedTopics.delete(topicId);
  } else {
    expandedTopics.add(topicId);
  }
  renderTopicsAndProblems();
};

// Open Add Problem Modal
function openAddProblemModal() {
  document.getElementById("modal-add-problem").classList.add("active");
  document.getElementById("input-problem-title").focus();
}

function closeAddProblemModal() {
  document.getElementById("modal-add-problem").classList.remove("active");
  document.getElementById("form-add-problem").reset();
}

// Submit custom problem
function handleAddProblemSubmit(e) {
  e.preventDefault();

  const title = document.getElementById("input-problem-title").value.trim();
  const topicId = document.getElementById("select-problem-topic").value;
  const difficulty = document.getElementById("select-problem-difficulty").value;
  const leetcodeUrl = document.getElementById("input-problem-url").value.trim();
  const hint = document.getElementById("input-problem-hint").value.trim();

  if (!title || !leetcodeUrl) {
    showToast("Please enter title and valid URL", "info");
    return;
  }

  const targetTopic = topics.find((t) => t.id === topicId);
  if (!targetTopic) return;

  const newProblem = {
    id: `custom-${Date.now()}`,
    title: title,
    difficulty: difficulty,
    leetcodeUrl: leetcodeUrl,
    platform: "LeetCode",
    hint: hint || "Custom added question."
  };

  targetTopic.problems.push(newProblem);
  saveTopics();

  closeAddProblemModal();
  renderTopicTabs();
  renderStats();
  renderTopicsAndProblems();
  showToast(`Added "${title}" to ${targetTopic.name}`, "success");
}

// Notes Modal
window.openNotesModal = function (problemId) {
  currentEditingProblemId = problemId;
  const problem = findProblemById(problemId);
  if (!problem) return;

  document.getElementById("notes-modal-title").textContent = `Notes: ${problem.title}`;
  const existingNotes = progress[problemId]?.notes || "";
  document.getElementById("textarea-notes").value = existingNotes;

  document.getElementById("modal-notes").classList.add("active");
  document.getElementById("textarea-notes").focus();
};

function closeNotesModal() {
  document.getElementById("modal-notes").classList.remove("active");
  currentEditingProblemId = null;
}

function handleSaveNotes() {
  if (!currentEditingProblemId) return;

  const notesText = document.getElementById("textarea-notes").value.trim();
  if (!progress[currentEditingProblemId]) {
    progress[currentEditingProblemId] = { solved: false, bookmarked: false, notes: "" };
  }

  progress[currentEditingProblemId].notes = notesText;
  saveProgress();
  closeNotesModal();
  renderTopicsAndProblems();
  showToast("Personal notes saved!", "success");
}

// Random Pick feature
function handleRandomPick() {
  const unsolvedProblems = [];

  topics.forEach((topic) => {
    topic.problems.forEach((p) => {
      if (!progress[p.id]?.solved) {
        unsolvedProblems.push({ ...p, topicName: topic.name, topicId: topic.id });
      }
    });
  });

  if (unsolvedProblems.length === 0) {
    showToast("Outstanding! You have solved every problem on the sheet!", "success");
    return;
  }

  const randomIndex = Math.floor(Math.random() * unsolvedProblems.length);
  const picked = unsolvedProblems[randomIndex];

  // Expand topic and scroll to it
  expandedTopics.add(picked.topicId);
  activeTopicId = "all";
  renderTopicTabs();
  renderTopicsAndProblems();

  setTimeout(() => {
    const el = document.getElementById(`problem-row-${picked.id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.style.boxShadow = "0 0 25px rgba(99, 102, 241, 0.8)";
      el.style.borderColor = "var(--primary)";
      setTimeout(() => {
        el.style.boxShadow = "";
        el.style.borderColor = "";
      }, 3000);
    }
  }, 150);

  showToast(`Next challenge: "${picked.title}" in ${picked.topicName}!`, "info");
}

// Export Progress as JSON file
function handleExportData() {
  const exportData = {
    exportedAt: new Date().toISOString(),
    topics: topics,
    progress: progress
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `dsa-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();

  showToast("Progress backup downloaded successfully", "success");
}

// Reset Progress confirmation
function handleResetData() {
  const confirmed = confirm(
    "Are you sure you want to reset all solved status and progress? This cannot be undone unless you have an exported backup."
  );

  if (confirmed) {
    progress = {};
    saveProgress();
    renderStats();
    renderTopicsAndProblems();
    showToast("Progress has been reset.", "info");
  }
}

// Helper: Find problem by id
function findProblemById(problemId) {
  for (const topic of topics) {
    const found = topic.problems.find((p) => p.id === problemId);
    if (found) return found;
  }
  return null;
}

// Helper: Total problem count
function getTotalProblemsCount() {
  return topics.reduce((acc, topic) => acc + topic.problems.length, 0);
}

// Render everything
function renderAll() {
  renderStats();
  renderTopicsAndProblems();
}

// Toast notification helper
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconSvg =
    type === "success"
      ? `<svg width="18" height="18" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
      : `<svg width="18" height="18" fill="none" stroke="#818cf8" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path></svg>`;

  toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Simple celebration confetti
function triggerCelebration() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#6366f1", "#10b981", "#38bdf8", "#f59e0b", "#ec4899", "#8b5cf6"];

  for (let i = 0; i < 70; i++) {
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.5) * 14 - 3,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: Math.random() * 0.02 + 0.015
    });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let active = false;

    particles.forEach((p) => {
      if (p.alpha > 0) {
        active = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.25; // gravity
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }
    });

    if (active) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(frame);
}

// Icon generator based on topic name / identifier
function getTopicIconSvg(iconName) {
  switch (iconName) {
    case "grid":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"></path></svg>`;
    case "split":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"></path></svg>`;
    case "layers":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path></svg>`;
    case "link":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"></path></svg>`;
    case "search":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>`;
    case "tree":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21V11m0 0L7 6m5 5l5-5M7 6a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0zM12 21a2 2 0 100-4 2 2 0 000 4z"></path></svg>`;
    case "share-2":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"></path></svg>`;
    case "cpu":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z"></path></svg>`;
    case "award":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.504-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.004 0A5.25 5.25 0 0017.25 9.75v-.75a.75.75 0 00-.75-.75h-9a.75.75 0 00-.75.75v.75a5.25 5.25 0 004.871 4.5z"></path></svg>`;
    case "git-branch":
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 3v12a3 3 0 003 3h6m-9-15a3 3 0 110-6 3 3 0 010 6zm0 15a3 3 0 110-6 3 3 0 010 6zm12 0a3 3 0 110-6 3 3 0 010 6z"></path></svg>`;
    default:
      return `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>`;
  }
}

// Utility: XSS escape
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
