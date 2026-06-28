"use strict";

const API_URL = "/generate";

const LANGS = [
  { code: "uk", label: "Ukrainian", native: "Українська" },
  { code: "en", label: "English", native: "English" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "zh", label: "Chinese", native: "中文" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "pl", label: "Polish", native: "Polski" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ar", label: "Arabic", native: "العربية" },
];

const SPICE = [
  "Calm, traditional, contemplative haiku about nature and transience.",
  "A light, quiet sketch with a gentle mood.",
  "Slightly unexpected, with subtle irony.",
  "Playful, with humor and a surprising twist.",
  "Bold and sharp, with an absurd image.",
  "Very spicy, chaotic, grotesque and funny.",
  "Maximum heat: absurd, chaotic, surreal and dark-humored — yet still three lines of haiku.",
];

const state = {
  keywords: "",
  lang: "",
  spice: 0,
  resultState: "empty",
  errorMsg: "",
  lines: [],
  doneLang: "",
  doneSpice: "",
  history: [],
};

const els = {};

function labelOf(code) {
  const lang = LANGS.find((item) => item.code === code);
  return lang ? lang.label : "";
}

function nativeOf(code) {
  const lang = LANGS.find((item) => item.code === code);
  return lang ? lang.native : "";
}

function cap(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

function phrases() {
  return state.keywords
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

// ===== RENDER =====
function renderEmpty() {
  els.resultStage.innerHTML = `
    <div class="empty-state">
      <div class="empty-ring"></div>
      <div class="empty-title">No haiku yet</div>
      <div class="empty-copy">Enter your words and press "Generate"</div>
    </div>`;
  els.doneMeta.classList.add("is-hidden");
}

function renderLoading() {
  els.resultStage.innerHTML = `
    <div class="loader">
      <div class="loader-ring"></div>
      <div class="loader-text">Composing the lines…</div>
    </div>`;
  els.doneMeta.classList.add("is-hidden");
}

function renderError() {
  els.resultStage.innerHTML = `
    <div class="error-state">
      <div class="error-icon">!</div>
      <div class="error-text">${state.errorMsg}</div>
    </div>`;
  els.doneMeta.classList.add("is-hidden");
}

function renderDone() {
  els.resultStage.innerHTML = '<div class="done-state"></div>';
  const wrap = els.resultStage.querySelector(".done-state");
  state.lines.forEach((line) => {
    const item = document.createElement("div");
    item.className = "haiku-line";
    item.textContent = line;
    wrap.append(item);
  });
  els.doneMeta.innerHTML = "";
  const lang = document.createElement("span");
  lang.textContent = state.doneLang;
  const spice = document.createElement("span");
  spice.textContent = state.doneSpice;
  els.doneMeta.append(lang, spice);
  els.doneMeta.classList.remove("is-hidden");
}

function renderResult() {
  if (state.resultState === "loading") renderLoading();
  else if (state.resultState === "error") renderError();
  else if (state.resultState === "done") renderDone();
  else renderEmpty();
}

function renderKeywords() {
  if (els.keywords.value !== state.keywords) {
    els.keywords.value = state.keywords;
  }
  const count = phrases().length;
  els.countLabel.textContent =
    count === 0 ? "3–7 needed" : count + (count >= 3 && count <= 7 ? " of 3–7 ✓" : " of 3–7");
  els.clearKeywords.disabled = count === 0;
}

function renderLanguage() {
  els.langGrid.innerHTML = "";
  LANGS.forEach((lang) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-btn";
    btn.classList.toggle("is-selected", state.lang === lang.code);
    btn.innerHTML = `${lang.label} <span class="lang-native">${lang.native}</span>`;
    btn.addEventListener("click", () => {
      state.lang = lang.code;
      render();
    });
    els.langGrid.append(btn);
  });
}

function renderWasabi() {
  els.wasabiDots.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("span");
    dot.className = "wasabi-dot";
    dot.classList.toggle("is-active", i < state.spice);
    dot.classList.toggle("is-max", state.spice === 6 && i < 6);
    els.wasabiDots.append(dot);
  }
  els.spiceLabel.textContent = "Heat level: " + state.spice + " / 6";
  els.spiceLabel.classList.toggle("is-active", state.spice > 0);
  els.spiceLabel.classList.toggle("is-max", state.spice === 6);
  els.spiceMax.classList.toggle("is-hidden", state.spice !== 6);
  els.wasabiButton.classList.toggle("is-max", state.spice === 6);
  if (state.spice === 0) {
    els.wasabiButton.innerHTML =
      '<span class="wasabi-drop" aria-hidden="true"></span> 50 wasabi';
  } else if (state.spice === 6) {
    els.wasabiButton.innerHTML =
      '<span class="wasabi-drop" aria-hidden="true"></span> Cool down';
  } else {
    els.wasabiButton.innerHTML =
      '<span class="wasabi-drop" aria-hidden="true"></span> More wasabi!';
  }
}

function renderHistory() {
  els.historyCount.textContent = state.history.length > 0 ? state.history.length + " saved" : "";
  els.historyEmpty.classList.toggle("is-hidden", state.history.length > 0);
  els.historyList.classList.toggle("is-hidden", state.history.length === 0);
  els.historyList.innerHTML = "";
  if (state.history.length === 0) return;

  const maxShow = 20;
  state.history.slice(0, maxShow).forEach((item) => {
    const card = document.createElement("div");
    card.className = "history-item";
    card.title = "Click to reload keywords + language";

    const lines = document.createElement("div");
    lines.className = "history-lines";
    item.lines.forEach((line) => {
      const row = document.createElement("div");
      row.textContent = line;
      lines.append(row);
    });

    const tags = document.createElement("div");
    tags.className = "history-tags";
    const lang = document.createElement("span");
    lang.textContent = item.langLabel;
    const spice = document.createElement("span");
    spice.textContent = "wasabi " + item.spice;
    const time = document.createElement("span");
    time.textContent = item.timeLabel;
    tags.append(lang, spice, time);

    card.append(lines, tags);
    card.addEventListener("click", () => {
      state.keywords = item.originalKeywords || "";
      state.lang = item.langCode || "";
      render();
    });
    els.historyList.append(card);
  });
}

function renderGenerateButton() {
  const loading = state.resultState === "loading";
  els.generateButton.textContent = loading ? "Generating…" : "Generate haiku";
  els.generateButton.disabled = loading;
}

function render() {
  renderResult();
  renderKeywords();
  renderLanguage();
  renderWasabi();
  renderHistory();
  renderGenerateButton();
}

// ===== GENERATE =====
async function generate() {
  if (state.resultState === "loading") return;

  const parts = phrases();
  if (parts.length < 3) {
    state.resultState = "error";
    state.errorMsg = "Enter at least 3 keywords or short phrases";
    render();
    return;
  }
  if (parts.length > 7) {
    state.resultState = "error";
    state.errorMsg = "Maximum 7 keywords allowed";
    render();
    return;
  }
  if (!state.lang) {
    state.resultState = "error";
    state.errorMsg = "Choose a generation language";
    render();
    return;
  }

  const langName = labelOf(state.lang);
  const spice = state.spice;
  state.resultState = "loading";
  state.errorMsg = "";
  render();

  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keywords: state.keywords,
        language: state.lang,
        spiceLevel: spice,
      }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      state.resultState = "error";
      state.errorMsg = data.error || "Server error";
      render();
      return;
    }

    const lines = (data.lines || data.haiku.split("\n")).filter(Boolean).slice(0, 3);
    if (lines.length === 0) {
      state.resultState = "error";
      state.errorMsg = "Empty response from server";
      render();
      return;
    }

    const date = new Date();
    const timeLabel =
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0");
    const item = {
      id: Date.now(),
      lines,
      langLabel: langName,
      langCode: state.lang,
      originalKeywords: state.keywords,
      spice,
      timeLabel,
    };

    // Save to localStorage (max 100)
    const history = [item, ...state.history].slice(0, 100);
    try {
      localStorage.setItem("haiku50_history", JSON.stringify(history));
    } catch (_) {}

    state.resultState = "done";
    state.lines = lines;
    state.doneLang = langName;
    state.doneSpice = "wasabi " + spice;
    state.history = history;
    render();
  } catch (err) {
    state.resultState = "error";
    state.errorMsg = "Server unreachable — is the backend running?";
    render();
  }
}

// ===== HISTORY LOAD =====
function loadHistory() {
  try {
    const raw = localStorage.getItem("haiku50_history");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) state.history = parsed.slice(0, 100);
    }
  } catch (_) {}
}

function clearHistory() {
  if (!confirm("Clear all history?")) return;
  state.history = [];
  try { localStorage.removeItem("haiku50_history"); } catch (_) {}
  render();
}

// ===== BIND =====
function bindElements() {
  els.resultStage = document.getElementById("result-stage");
  els.doneMeta = document.getElementById("done-meta");
  els.keywords = document.getElementById("keywords");
  els.countLabel = document.getElementById("count-label");
  els.clearKeywords = document.getElementById("clear-keywords");
  els.langGrid = document.getElementById("lang-grid");
  els.wasabiButton = document.getElementById("wasabi-button");
  els.wasabiDots = document.getElementById("wasabi-dots");
  els.spiceLabel = document.getElementById("spice-label");
  els.spiceMax = document.getElementById("spice-max");
  els.historyCount = document.getElementById("history-count");
  els.historyEmpty = document.getElementById("history-empty");
  els.historyList = document.getElementById("history-list");
  els.historyClear = document.getElementById("history-clear");
  els.generateButton = document.getElementById("generate-button");
}

function bindEvents() {
  els.keywords.addEventListener("input", (e) => {
    state.keywords = e.target.value;
    renderKeywords();
  });

  els.clearKeywords.addEventListener("click", () => {
    state.keywords = "";
    els.keywords.value = "";
    renderKeywords();
  });

  els.wasabiButton.addEventListener("click", () => {
    if (state.spice === 6) {
      state.spice = 0;
    } else {
      state.spice = state.spice + 1;
    }
    renderWasabi();
  });

  els.generateButton.addEventListener("click", generate);

  if (els.historyClear) {
    els.historyClear.addEventListener("click", clearHistory);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  bindElements();
  loadHistory();
  bindEvents();
  render();
});
