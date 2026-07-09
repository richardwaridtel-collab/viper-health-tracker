/* ==========================================================================
   Beyond Fitness Tracker — App Logic
   ========================================================================== */

const STORAGE_KEY = "viperTracker.logs.v1";
const SETTINGS_KEY = "viperTracker.settings.v1";
const THEME_KEY = "viperTracker.theme.v1";

let toastTimer = null;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

/* -------------------------------------------------------------- theme */
function systemTheme() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f3f3f4" : "#111214");
  const sun = document.getElementById("themeIconSun");
  const moon = document.getElementById("themeIconMoon");
  if (sun && moon) {
    sun.style.display = theme === "light" ? "none" : "block";
    moon.style.display = theme === "light" ? "block" : "none";
  }
}

function readThemePref() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch (e) {
    return null;
  }
}

function initTheme() {
  const stored = readThemePref();
  applyTheme(stored || systemTheme());
  if (!stored && window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
      if (!readThemePref()) applyTheme(systemTheme());
    });
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || systemTheme();
  const next = current === "light" ? "dark" : "light";
  try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* theme just won't persist */ }
  applyTheme(next);
}

initTheme();
document.getElementById("themeToggle").addEventListener("click", toggleTheme);

/* ------------------------------------------------------------- splash */
(function hideSplashOnLoad() {
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minDisplay = reduceMotion ? 80 : 750;
  const dismiss = () => {
    const splash = document.getElementById("splashScreen");
    if (!splash) return;
    splash.classList.add("hide");
    setTimeout(() => splash.remove(), 420);
  };
  window.addEventListener("load", () => setTimeout(dismiss, minDisplay));
  // Fallback in case the load event is delayed by a slow network
  setTimeout(dismiss, 2500);
})();

/* ------------------------------------------------------- install prompt */
const INSTALL_DISMISSED_KEY = "viperTracker.installDismissed.v1";
let deferredInstallPrompt = null;

function isRunningStandalone() {
  return (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
}

window.addEventListener("beforeinstallprompt", (e) => {
  if (isRunningStandalone()) return;
  e.preventDefault();
  deferredInstallPrompt = e;
  const installSection = document.getElementById("settingsInstallSection");
  if (installSection) installSection.hidden = false;

  let dismissed = false;
  try { dismissed = localStorage.getItem(INSTALL_DISMISSED_KEY) === "1"; } catch (err) { /* ignore */ }
  if (dismissed) return;
  const banner = document.getElementById("installBanner");
  if (banner) banner.hidden = false;
});

window.addEventListener("appinstalled", () => {
  const banner = document.getElementById("installBanner");
  if (banner) banner.hidden = true;
  const installSection = document.getElementById("settingsInstallSection");
  if (installSection) installSection.hidden = true;
  deferredInstallPrompt = null;
});

/* ------------------------------------------------------------ small utils */
function $(id) { return document.getElementById(id); }

function todayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function splitEntryFor(day) {
  return PLAN.split.find((s) => s.day === Number(day));
}

function isTrainingDay(day) {
  return splitEntryFor(day).type === "training";
}

function sumBool(arr) {
  return { done: arr.filter(Boolean).length, total: arr.length };
}

function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* -------------------------------------------------------------- storage */
let storageWarningShown = false;

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    if (!storageWarningShown) {
      storageWarningShown = true;
      showToast("⚠ Couldn't save — storage may be full or private browsing is blocking it");
    }
    return false;
  }
}

function loadAllLogs() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveAllLogs(logs) {
  safeSetItem(STORAGE_KEY, JSON.stringify(logs));
}

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || { nextSplitDay: 1 };
  } catch (e) {
    return { nextSplitDay: 1 };
  }
}

function saveSettings(settings) {
  safeSetItem(SETTINGS_KEY, JSON.stringify(settings));
}

/* -------------------------------------------------------- default shapes */
function defaultDietChecks(dietType, training) {
  return {
    dietType,
    morningDrink: PLAN.diet.morningDrink.items.map(() => false),
    meal1: PLAN.diet.meals[1][dietType].map(() => false),
    meal2: PLAN.diet.meals[2][dietType].map(() => false),
    meal3: PLAN.diet.meals[3][dietType].map(() => false),
    meal4: PLAN.diet.meals[4][dietType].map(() => false),
    preWorkout: training ? PLAN.diet.training.preWorkout.items.map(() => false) : [],
    intraWorkout: training ? PLAN.diet.training.intraWorkout.items.map(() => false) : [],
    postWorkout: training ? PLAN.diet.training.postWorkout.items.map(() => false) : [],
    beforeBed: PLAN.diet.beforeBed.items.map(() => false),
  };
}

function defaultWorkoutChecks(entry) {
  const exercises = entry.workout ? PLAN.workouts[entry.workout].exercises : [];
  return {
    cardio: false,
    exercises: exercises.map(() => false),
    logs: exercises.map(() => ({ weight: "", reps: "" })),
  };
}

function defaultSupplementChecks() {
  return PLAN.supplements.map((s) => {
    const obj = {};
    s.timing.forEach((t) => (obj[t] = false));
    return obj;
  });
}

/* ------------------------------------------------------------- day logic */
function getOrCreateDayLog(dateKey) {
  const logs = loadAllLogs();
  if (!logs[dateKey]) {
    const settings = loadSettings();
    const splitDay = settings.nextSplitDay || 1;
    const entry = splitEntryFor(splitDay);
    logs[dateKey] = {
      splitDay,
      dietChecks: defaultDietChecks(entry.type === "training" ? "A" : "B", entry.type === "training"),
      workoutChecks: defaultWorkoutChecks(entry),
      supplementChecks: defaultSupplementChecks(),
      notes: "",
      bodyWeight: "",
    };
    settings.nextSplitDay = (splitDay % 7) + 1;
    saveSettings(settings);
    saveAllLogs(logs);
  }
  return logs[dateKey];
}

function updateDayLog(dateKey, mutator) {
  const logs = loadAllLogs();
  const log = logs[dateKey];
  if (!log) return;
  mutator(log);
  logs[dateKey] = log;
  saveAllLogs(logs);
}

function hasAnyProgress(log) {
  const d = log.dietChecks;
  const dietFlag = ["morningDrink", "meal1", "meal2", "meal3", "meal4", "preWorkout", "intraWorkout", "postWorkout", "beforeBed"]
    .some((k) => (d[k] || []).some(Boolean));
  const workoutFlag = log.workoutChecks.cardio || log.workoutChecks.exercises.some(Boolean);
  return dietFlag || workoutFlag;
}

function changeSplitDay(dateKey, newDay) {
  const logs = loadAllLogs();
  const log = logs[dateKey];
  if (hasAnyProgress(log)) {
    const ok = confirm("Changing the split day will reset today's Diet and Workout checklists (Supplements and notes are kept). Continue?");
    if (!ok) {
      renderAll();
      return;
    }
  }
  const entry = splitEntryFor(newDay);
  log.splitDay = Number(newDay);
  log.dietChecks = defaultDietChecks(entry.type === "training" ? "A" : "B", entry.type === "training");
  log.workoutChecks = defaultWorkoutChecks(entry);
  logs[dateKey] = log;
  saveAllLogs(logs);

  const settings = loadSettings();
  settings.nextSplitDay = (Number(newDay) % 7) + 1;
  saveSettings(settings);

  showToast(`Switched to Day ${newDay} — ${entry.label}`);
  renderAll();
}

function changeDietType(dateKey, newType) {
  const logs = loadAllLogs();
  const log = logs[dateKey];
  const training = isTrainingDay(log.splitDay);
  log.dietChecks = defaultDietChecks(newType, training);
  logs[dateKey] = log;
  saveAllLogs(logs);
  showToast(`Switched to Diet ${newType} — checklist reset for today`);
  renderAll();
}

function resetToday(dateKey) {
  const ok = confirm("Reset all of today's checklists (Diet, Workout, Supplements)? Notes will be kept.");
  if (!ok) return;
  const logs = loadAllLogs();
  const log = logs[dateKey];
  const entry = splitEntryFor(log.splitDay);
  log.dietChecks = defaultDietChecks(log.dietChecks.dietType, entry.type === "training");
  log.workoutChecks = defaultWorkoutChecks(entry);
  log.supplementChecks = defaultSupplementChecks();
  logs[dateKey] = log;
  saveAllLogs(logs);
  showToast("Today's checklists were reset");
  renderAll();
}

/* --------------------------------------------------------------- totals */
function dietTotals(log) {
  const sections = ["morningDrink", "meal1", "meal2", "meal3", "meal4", "preWorkout", "intraWorkout", "postWorkout", "beforeBed"];
  let done = 0, total = 0;
  sections.forEach((s) => {
    const r = sumBool(log.dietChecks[s] || []);
    done += r.done;
    total += r.total;
  });
  return { done, total };
}

function workoutTotals(log) {
  let done = (log.workoutChecks.cardio ? 1 : 0);
  let total = 1;
  const r = sumBool(log.workoutChecks.exercises);
  done += r.done;
  total += r.total;
  return { done, total };
}

function supplementTotals(log) {
  let done = 0, total = 0;
  log.supplementChecks.forEach((obj) => {
    Object.values(obj).forEach((v) => {
      total += 1;
      if (v) done += 1;
    });
  });
  return { done, total };
}

function pct(r) {
  return r.total === 0 ? 0 : Math.round((r.done / r.total) * 100);
}

function findPreviousBodyWeight(excludeDateKey) {
  const logs = loadAllLogs();
  const keys = Object.keys(logs)
    .filter((dk) => dk < excludeDateKey && parseFloat(logs[dk].bodyWeight) > 0)
    .sort();
  if (!keys.length) return null;
  const dk = keys[keys.length - 1];
  return { date: dk, weight: parseFloat(logs[dk].bodyWeight) };
}

function computeStreak(logs) {
  let streak = 0;
  const cursor = new Date();
  while (true) {
    const dk = todayKey(cursor);
    const log = logs[dk];
    if (!log) break;
    const dTot = dietTotals(log), wTot = workoutTotals(log), sTot = supplementTotals(log);
    const done = dTot.done + wTot.done + sTot.done;
    if (done <= 0) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

const RING_COLOR_VARS = { Diet: "--accent-2", Workout: "--teal", Supps: "--good", Overall: "--accent" };

function buildRing(label, r) {
  const size = 76, stroke = 9, radius = (size - stroke) / 2;
  const c = 2 * Math.PI * radius;
  const p = pct(r);
  const offset = c * (1 - p / 100);
  const varName = RING_COLOR_VARS[label] || "--accent";
  const color = getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || "#c6ff3d";
  return `
    <div class="ring-item">
      <div class="ring-wrap">
        <svg class="ring-svg" viewBox="0 0 ${size} ${size}">
          <circle class="ring-track" cx="${size / 2}" cy="${size / 2}" r="${radius}" />
          <circle class="ring-fill" cx="${size / 2}" cy="${size / 2}" r="${radius}"
            stroke="${color}" stroke-dasharray="${c}" stroke-dashoffset="${offset}" />
        </svg>
        <div class="ring-pct">${p}%</div>
      </div>
      <div class="ring-label">${label}</div>
    </div>`;
}

/* ---------------------------------------------------------------- render */
const TAB_TITLES = { today: "Today", diet: "Diet", workout: "Workout", supplements: "Supplements", history: "Progress" };

function renderAll() {
  const dateKey = todayKey();
  const log = getOrCreateDayLog(dateKey);
  const logs = loadAllLogs();

  const activeTab = document.querySelector(".nav-btn.active")?.dataset.tab || "today";
  $("pageTitle").textContent = TAB_TITLES[activeTab];

  $("todayDisplay").textContent = new Date().toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric",
  });
  $("streakPill").textContent = `🔥 ${computeStreak(logs)}`;
  $("disclaimerText").textContent = PLAN.coach.disclaimer;
  $("coachLine").textContent = `Coach ${PLAN.coach.name} — ${PLAN.coach.title} — ${PLAN.coach.email}`;

  renderToday(dateKey, log);
  renderDiet(dateKey, log);
  renderWorkout(dateKey, log);
  renderSupplements(dateKey, log);
  renderHistory();
}

function renderToday(dateKey, log) {
  $("daySelector").innerHTML = PLAN.split.map((s) => `
    <button class="day-chip ${s.type} ${s.day === log.splitDay ? "selected" : ""}" data-day="${s.day}">
      <span class="dn">Day ${s.day}</span>
      <span class="dl">${s.label}</span>
      <span class="dt">${s.type === "training" ? "Train" : "Rest"}</span>
    </button>
  `).join("");

  const entry = splitEntryFor(log.splitDay);
  const badge = $("todayTypeBadge");
  badge.textContent = entry.type === "training" ? `Training · ${entry.cardio}` : `Rest · ${entry.cardio}`;
  badge.className = "day-strip-current" + (entry.type === "rest" ? " rest" : "");

  const dTot = dietTotals(log), wTot = workoutTotals(log), sTot = supplementTotals(log);
  const overallDone = dTot.done + wTot.done + sTot.done;
  const overallTotal = dTot.total + wTot.total + sTot.total;

  const items = [
    ["Diet", dTot],
    ["Workout", wTot],
    ["Supps", sTot],
    ["Overall", { done: overallDone, total: overallTotal }],
  ];

  $("ringsRow").innerHTML = items.map(([label, r]) => buildRing(label, r)).join("");

  $("bodyWeightInput").value = log.bodyWeight || "";
  const prevWeight = findPreviousBodyWeight(dateKey);
  const trendEl = $("bodyWeightTrend");
  const currentWeight = parseFloat(log.bodyWeight);
  if (prevWeight && !isNaN(currentWeight) && currentWeight > 0) {
    const diff = currentWeight - prevWeight.weight;
    const arrow = diff > 0 ? "▲" : diff < 0 ? "▼" : "▬";
    trendEl.textContent = `${arrow} ${Math.abs(diff).toFixed(1)}kg since ${prevWeight.date}`;
    trendEl.className = "bodyweight-trend" + (diff > 0 ? " up" : diff < 0 ? " down" : "");
  } else if (prevWeight) {
    trendEl.textContent = `Last logged: ${prevWeight.weight}kg (${prevWeight.date})`;
    trendEl.className = "bodyweight-trend";
  } else {
    trendEl.textContent = "";
    trendEl.className = "bodyweight-trend";
  }

  const snapshotSections = [
    ["Morning Drink", sumBool(log.dietChecks.morningDrink)],
    ["Meal 1", sumBool(log.dietChecks.meal1)],
    ["Meal 2", sumBool(log.dietChecks.meal2)],
    ["Meal 3", sumBool(log.dietChecks.meal3)],
    ["Meal 4", sumBool(log.dietChecks.meal4)],
    ["Before Bed", sumBool(log.dietChecks.beforeBed)],
    ["Cardio", { done: log.workoutChecks.cardio ? 1 : 0, total: 1 }],
    ["Exercises", sumBool(log.workoutChecks.exercises)],
    ["Supplements", supplementTotals(log)],
  ];
  if (entry.type === "training") {
    snapshotSections.splice(4, 0,
      ["Pre-Workout", sumBool(log.dietChecks.preWorkout)],
      ["Intra-Workout", sumBool(log.dietChecks.intraWorkout)],
      ["Post-Workout", sumBool(log.dietChecks.postWorkout)],
    );
  }
  $("todaySnapshot").innerHTML = snapshotSections.map(([label, r]) => `
    <div class="snapshot-pill ${r.total > 0 && r.done === r.total ? "done" : ""}">
      <span class="dot"></span>${label} (${r.done}/${r.total})
    </div>
  `).join("");

  $("dayNotes").value = log.notes || "";
}

function checkItemHtml(text, checked, kind, section, index, note) {
  return `
    <label class="check-item ${checked ? "checked" : ""}">
      <input type="checkbox" data-kind="${kind}" data-section="${section || ""}" data-index="${index}" ${checked ? "checked" : ""} />
      <span class="item-text">${text}${note ? `<span class="item-note">${note}</span>` : ""}</span>
    </label>`;
}

function renderDiet(dateKey, log) {
  const entry = splitEntryFor(log.splitDay);
  const type = log.dietChecks.dietType;
  const training = entry.type === "training";

  let html = "";

  html += `<div class="card">
    <div class="diet-toggle">
      <button data-diet-type="A" class="${type === "A" ? "active" : ""}">Diet A — Training Day</button>
      <button data-diet-type="B" class="${type === "B" ? "active" : ""}">Diet B — Rest Day</button>
    </div>
    <p class="mini-note">Today is <strong>Day ${log.splitDay} — ${entry.label}</strong> (${entry.type === "training" ? "training" : "rest"} day). Diet is auto-matched to your split, but you can override above. ${PLAN.diet.note}</p>
  </div>`;

  html += `<div class="card">
    <h2>${PLAN.diet.morningDrink.title}</h2>
    <p class="mini-note">${PLAN.diet.morningDrink.subtitle}</p>
    ${PLAN.diet.morningDrink.items.map((it, i) => checkItemHtml(it, log.dietChecks.morningDrink[i], "diet", "morningDrink", i)).join("")}
  </div>`;

  const renderMeal = (n) => {
    const meal = PLAN.diet.meals[n];
    const items = meal[type];
    html += `<div class="card meal-block">
      <div class="meal-title">${meal.name}</div>
      ${meal.subtitle ? `<div class="meal-subtitle">${meal.subtitle}</div>` : ""}
      ${items.map((it, i) => checkItemHtml(it, log.dietChecks["meal" + n][i], "diet", "meal" + n, i)).join("")}
      ${meal.note ? `<p class="mini-note">${meal.note}</p>` : ""}
    </div>`;
  };

  [1, 2, 3].forEach(renderMeal);

  if (training) {
    const tw = PLAN.diet.training;
    ["preWorkout", "intraWorkout", "postWorkout"].forEach((key) => {
      const sec = tw[key];
      html += `<div class="card">
        <h2>${sec.title}</h2>
        <p class="mini-note">${sec.subtitle}</p>
        ${sec.items.map((it, i) => checkItemHtml(it, log.dietChecks[key][i], "diet", key, i)).join("")}
      </div>`;
    });
  } else {
    html += `<div class="card"><h2>Pre / Intra / Post-Workout Nutrition</h2><p class="mini-note">Not applicable — today is a rest day.</p></div>`;
  }

  renderMeal(4);

  html += `<div class="card">
    <h2>${PLAN.diet.beforeBed.title}</h2>
    <p class="mini-note">${PLAN.diet.beforeBed.subtitle}</p>
    ${PLAN.diet.beforeBed.items.map((it, i) => checkItemHtml(it, log.dietChecks.beforeBed[i], "diet", "beforeBed", i)).join("")}
  </div>`;

  html += `<div class="card">
    <h2>${PLAN.diet.eliminated.title}</h2>
    <ul class="eliminated-list">${PLAN.diet.eliminated.items.map((it) => `<li>${it}</li>`).join("")}</ul>
    <h2 style="margin-top:16px">${PLAN.diet.cookingAllowed.title}</h2>
    <ul class="cooking-list">${PLAN.diet.cookingAllowed.items.map((it) => `<li>${it}</li>`).join("")}</ul>
  </div>`;

  $("dietContent").innerHTML = html;
}

const expandedVideos = new Set();

function youtubeEmbedId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function videoBlockHtml(ex, key) {
  const ytId = ex.video ? youtubeEmbedId(ex.video) : null;

  if (ytId) {
    if (expandedVideos.has(key)) {
      return `
        <div class="video-frame-wrap">
          <iframe src="https://www.youtube.com/embed/${ytId}?rel=0" title="${ex.exercise} form video"
            frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
        <button class="video-btn video-btn-collapse" data-video-key="${key}" data-video-action="collapse">✕ Hide video</button>`;
    }
    return `<button class="video-btn" data-video-key="${key}" data-video-action="expand">▶ Watch form video</button>`;
  }

  const query = encodeURIComponent(`${ex.exercise} proper form exercise`);
  return `<a class="video-btn video-btn-secondary" href="https://www.youtube.com/results?search_query=${query}" target="_blank" rel="noopener">🔍 Find form videos ↗</a>`;
}

function escapeAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function parseMaxNumber(str) {
  const nums = (String(str).match(/[\d.]+/g) || []).map(Number);
  return nums.length ? Math.max(...nums) : 0;
}

/* ------------------------------------------------------------- PR badges */
function bestWeightFor(exerciseName, excludeDateKey) {
  const logs = loadAllLogs();
  let best = 0;
  Object.keys(logs).forEach((dk) => {
    if (dk === excludeDateKey) return;
    const dayLog = logs[dk];
    const entry = splitEntryFor(dayLog.splitDay);
    if (!entry.workout) return;
    PLAN.workouts[entry.workout].exercises.forEach((ex, i) => {
      if (ex.exercise !== exerciseName) return;
      const w = (dayLog.workoutChecks.logs[i] || {}).weight || "";
      best = Math.max(best, parseMaxNumber(w));
    });
  });
  return best;
}

function prBadgeInnerHtml(exerciseName, currentWeightStr, dateKey) {
  const best = bestWeightFor(exerciseName, dateKey);
  const currentMax = parseMaxNumber(currentWeightStr);
  if (best <= 0) return `<span class="pr-hint">No history yet — first logged weight will set your baseline</span>`;
  if (currentMax > best) return `<span class="pr-hint pr-flag">🏆 New PR! Previous best: ${best}kg</span>`;
  return `<span class="pr-hint">Best so far: ${best}kg</span>`;
}

/* --------------------------------------------------------- plate calculator */
const BAR_WEIGHT = 20;
const PLATE_SIZES = [20, 15, 10, 5, 2.5, 1.25];
const expandedPlateCalc = new Set();

function plateBreakdown(totalWeight) {
  let perSide = (totalWeight - BAR_WEIGHT) / 2;
  if (perSide <= 0) return null;
  const plates = [];
  for (const p of PLATE_SIZES) {
    while (perSide + 1e-6 >= p) {
      plates.push(p);
      perSide -= p;
    }
  }
  return { plates, remainder: perSide };
}

function plateCalcInnerHtml(weightStr) {
  const total = parseMaxNumber(weightStr);
  if (!total) return `<span class="plate-hint">Enter a weight above first</span>`;
  const result = plateBreakdown(total);
  if (!result) return `<span class="plate-hint">Weight must exceed the ${BAR_WEIGHT}kg bar</span>`;
  const grouped = {};
  result.plates.forEach((p) => { grouped[p] = (grouped[p] || 0) + 1; });
  const parts = Object.keys(grouped).sort((a, b) => b - a).map((p) => `${p}×${grouped[p]}`);
  const remNote = result.remainder > 0.01 ? ` (+${result.remainder.toFixed(2)}kg not loadable)` : "";
  return `<span class="plate-hint">Per side (kg): ${parts.join(" + ")}${remNote} <span class="plate-muted">· ${BAR_WEIGHT}kg bar</span></span>`;
}

function plateCalcBlockHtml(key, weightStr) {
  if (!expandedPlateCalc.has(key)) {
    return `<button class="plate-toggle-btn" data-plate-key="${key}" data-plate-action="expand">🧮 Plate calculator</button>`;
  }
  return `
    <div class="plate-display" id="plate-display-${key}">${plateCalcInnerHtml(weightStr)}</div>
    <button class="plate-toggle-btn" data-plate-key="${key}" data-plate-action="collapse">Hide plate calculator</button>`;
}

/* -------------------------------------------------------------- rest timer */
let activeTimer = null;
let timerTickHandle = null;

function formatTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  } catch (e) { /* audio not available, ignore */ }
}

function onRestTimerDone() {
  if (navigator.vibrate) navigator.vibrate([250, 100, 250]);
  playBeep();
  showToast("Rest complete — next set!");
  renderAll();
}

function tickRestTimer() {
  if (timerTickHandle) clearInterval(timerTickHandle);
  timerTickHandle = setInterval(() => {
    if (!activeTimer) { clearInterval(timerTickHandle); timerTickHandle = null; return; }
    const remaining = Math.max(0, Math.round((activeTimer.endsAt - Date.now()) / 1000));
    const el = document.getElementById(`timerDisplay-${activeTimer.key}`);
    if (el) el.textContent = formatTime(remaining);
    if (remaining <= 0) {
      clearInterval(timerTickHandle);
      timerTickHandle = null;
      activeTimer = null;
      onRestTimerDone();
    }
  }, 250);
}

function startRestTimer(key, seconds) {
  activeTimer = { key, endsAt: Date.now() + seconds * 1000 };
  tickRestTimer();
}

function stopRestTimer() {
  activeTimer = null;
  if (timerTickHandle) { clearInterval(timerTickHandle); timerTickHandle = null; }
}

function restTimerBlockHtml(key) {
  if (activeTimer && activeTimer.key === key) {
    const remaining = Math.max(0, Math.round((activeTimer.endsAt - Date.now()) / 1000));
    return `
      <div class="timer-block active">
        <span class="timer-display" id="timerDisplay-${key}">${formatTime(remaining)}</span>
        <button class="timer-btn timer-btn-cancel" data-timer-action="cancel" data-timer-key="${key}">Cancel</button>
      </div>`;
  }
  return `
    <div class="timer-block">
      <span class="timer-label">⏱ Rest</span>
      <button class="timer-btn" data-timer-action="start" data-timer-key="${key}" data-timer-secs="60">60s</button>
      <button class="timer-btn" data-timer-action="start" data-timer-key="${key}" data-timer-secs="90">90s</button>
      <button class="timer-btn" data-timer-action="start" data-timer-key="${key}" data-timer-secs="120">120s</button>
    </div>`;
}

function renderWorkout(dateKey, log) {
  const entry = splitEntryFor(log.splitDay);
  let html = `<div class="card">
    <div class="workout-day-card">
      <div>
        <div class="day-name">Day ${entry.day} — ${entry.label}</div>
        <div class="day-meta">${entry.cardio}</div>
      </div>
    </div>
    <label class="check-item ${log.workoutChecks.cardio ? "checked" : ""}" style="margin-top:8px">
      <input type="checkbox" data-kind="workout-cardio" ${log.workoutChecks.cardio ? "checked" : ""} />
      <span class="item-text">Completed ${entry.type === "training" ? "cardio" : "cardio + abs"} session</span>
    </label>
  </div>`;

  if (entry.type === "training") {
    const workout = PLAN.workouts[entry.workout];
    html += `<div class="card"><h2>${workout.name} — Lifting Program</h2>`;
    workout.exercises.forEach((ex, i) => {
      const checked = log.workoutChecks.exercises[i];
      const logEntry = log.workoutChecks.logs[i] || { weight: "", reps: "" };
      const videoKey = `${entry.workout}-${i}`;
      html += `<div class="exercise-row" data-video-key="${videoKey}" data-exercise-name="${escapeAttr(ex.exercise)}">
        <div class="exercise-head">
          <div>
            <div class="exercise-muscle">${ex.muscle} · ${ex.order}</div>
            <div class="exercise-title">${ex.exercise}</div>
          </div>
          <label class="check-item" style="padding:0">
            <input type="checkbox" data-kind="workout-exercise" data-index="${i}" ${checked ? "checked" : ""} />
          </label>
        </div>
        <div class="exercise-meta"><span>${ex.sets} sets</span><span>${ex.reps} reps</span></div>
        ${ex.notes ? `<div class="exercise-notes">${ex.notes}</div>` : ""}
        <div class="exercise-video">${videoBlockHtml(ex, videoKey)}</div>
        <div class="exercise-log">
          <div>
            <label>Weight used</label>
            <input type="text" data-kind="workout-log-weight" data-index="${i}" value="${logEntry.weight}" placeholder="kg" />
            <div class="pr-badge" id="pr-badge-${videoKey}">${prBadgeInnerHtml(ex.exercise, logEntry.weight, dateKey)}</div>
          </div>
          <div><label>Reps achieved</label><input type="text" data-kind="workout-log-reps" data-index="${i}" value="${logEntry.reps}" placeholder="e.g. 10,9,8" /></div>
        </div>
        <div class="plate-calc">${plateCalcBlockHtml(videoKey, logEntry.weight)}</div>
        <div class="timer-section">${restTimerBlockHtml(videoKey)}</div>
      </div>`;
    });
    html += `</div>`;
  } else {
    html += `<div class="card"><p class="mini-note">Rest day — no lifting scheduled. Keep to light abs work and your cardio session.</p></div>`;
  }

  $("workoutContent").innerHTML = html;
}

function renderSupplements(dateKey, log) {
  let html = `<div class="card"><h2>Daily Supplement Schedule</h2>`;
  PLAN.supplements.forEach((s, i) => {
    const checks = log.supplementChecks[i] || {};
    html += `<div class="supp-row">
      <div>
        <div class="supp-name">${s.name}</div>
        <div class="supp-brand">${s.brand}</div>
      </div>
      <div>
        <div class="supp-dosage">${s.dosage}</div>
        ${s.note ? `<div class="supp-note">${s.note}</div>` : ""}
      </div>
      <div class="supp-checks">
        ${s.timing.map((t) => `
          <label class="supp-check">
            <input type="checkbox" data-kind="supp" data-index="${i}" data-timing="${t}" ${checks[t] ? "checked" : ""} />
            ${t}
          </label>
        `).join("")}
      </div>
    </div>`;
  });
  html += `</div>`;
  $("supplementsContent").innerHTML = html;
}

function renderHeatmap() {
  const logs = loadAllLogs();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - 83);
  start.setDate(start.getDate() - start.getDay());

  const cells = [];
  const cursor = new Date(start);
  while (cursor <= today) {
    const dk = todayKey(cursor);
    const log = logs[dk];
    let p = null;
    if (log) {
      const dTot = dietTotals(log), wTot = workoutTotals(log), sTot = supplementTotals(log);
      p = pct({ done: dTot.done + wTot.done + sTot.done, total: dTot.total + wTot.total + sTot.total });
    }
    cells.push({ date: dk, pct: p });
    cursor.setDate(cursor.getDate() + 1);
  }

  const levelFor = (p) => {
    if (p === null) return 0;
    if (p === 0) return 1;
    if (p < 40) return 2;
    if (p < 75) return 3;
    if (p < 100) return 4;
    return 5;
  };

  $("heatmapWrap").innerHTML = `
    <div class="heatmap-grid">
      ${cells.map((c) => `<div class="heatmap-cell level-${levelFor(c.pct)}" title="${c.date}${c.pct !== null ? `: ${c.pct}%` : ": no log"}"></div>`).join("")}
    </div>
    <div class="heatmap-legend">
      <span>Less</span>
      <span class="heatmap-cell level-1"></span><span class="heatmap-cell level-2"></span><span class="heatmap-cell level-3"></span><span class="heatmap-cell level-4"></span><span class="heatmap-cell level-5"></span>
      <span>More</span>
    </div>`;
}

function renderWeightChart() {
  const logs = loadAllLogs();
  const points = Object.keys(logs)
    .filter((dk) => parseFloat(logs[dk].bodyWeight) > 0)
    .sort()
    .map((dk) => ({ date: dk, weight: parseFloat(logs[dk].bodyWeight) }));

  if (points.length < 2) {
    $("weightChartWrap").innerHTML = `<p class="mini-note">Log your body weight on the Today tab for a few days to see a trend line here.</p>`;
    return;
  }

  const weights = points.map((p) => p.weight);
  const min = Math.min(...weights), max = Math.max(...weights);
  const range = max - min || 1;
  const w = 100, h = 40, padY = 4;
  const stepX = w / (points.length - 1);
  const coords = points.map((p, i) => {
    const x = i * stepX;
    const y = padY + (h - 2 * padY) * (1 - (p.weight - min) / range);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });
  const path = "M" + coords.join(" L");

  $("weightChartWrap").innerHTML = `
    <svg class="weight-chart-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <path d="${path}" fill="none" stroke="var(--accent)" stroke-width="1.2" vector-effect="non-scaling-stroke" />
    </svg>
    <div class="weight-chart-labels">
      <span>${min.toFixed(1)}kg</span>
      <span>${points[0].date} → ${points[points.length - 1].date}</span>
      <span>${max.toFixed(1)}kg</span>
    </div>`;
}

function renderHistory() {
  renderHeatmap();
  renderWeightChart();
  const logs = loadAllLogs();
  const dateKeys = Object.keys(logs).sort().reverse();
  $("historyEmptyHint").style.display = dateKeys.length ? "none" : "block";

  $("historyList").innerHTML = dateKeys.map((dk) => {
    const log = logs[dk];
    const entry = splitEntryFor(log.splitDay);
    const dTot = dietTotals(log), wTot = workoutTotals(log), sTot = supplementTotals(log);
    const overall = pct({ done: dTot.done + wTot.done + sTot.done, total: dTot.total + wTot.total + sTot.total });
    return `<div class="history-card">
      <div class="history-card-top">
        <div>
          <div class="history-date">${dk}</div>
          <div class="history-day">Day ${log.splitDay} — ${entry.label}</div>
        </div>
        <button class="link-btn" data-delete-date="${dk}" aria-label="Delete log for ${dk}">✕</button>
      </div>
      <div class="history-stats">
        <span class="history-stat">Diet ${pct(dTot)}%</span>
        <span class="history-stat">Workout ${pct(wTot)}%</span>
        <span class="history-stat">Supps ${pct(sTot)}%</span>
        <span class="history-stat overall">Overall ${overall}%</span>
      </div>
    </div>`;
  }).join("");
}

/* --------------------------------------------------------------- export */
function csvEscape(val) {
  const s = String(val ?? "");
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadBlob(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportCsv() {
  const logs = loadAllLogs();
  const dateKeys = Object.keys(logs).sort();
  const header = ["Date", "Split Day", "Day Label", "Day Type", "Diet Type", "Body Weight (kg)", "Diet %", "Workout %", "Supplements %", "Overall %", "Cardio Done", "Exercises Completed", "Notes"];
  const rows = [header];

  dateKeys.forEach((dk) => {
    const log = logs[dk];
    const entry = splitEntryFor(log.splitDay);
    const dTot = dietTotals(log), wTot = workoutTotals(log), sTot = supplementTotals(log);
    const overall = pct({ done: dTot.done + wTot.done + sTot.done, total: dTot.total + wTot.total + sTot.total });
    const exTot = sumBool(log.workoutChecks.exercises);
    rows.push([
      dk,
      log.splitDay,
      entry.label,
      entry.type,
      log.dietChecks.dietType,
      log.bodyWeight || "",
      pct(dTot),
      pct(wTot),
      pct(sTot),
      overall,
      log.workoutChecks.cardio ? "Yes" : "No",
      `${exTot.done}/${exTot.total}`,
      log.notes || "",
    ]);
  });

  const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\r\n");
  downloadBlob(csv, `beyond-fitness-log-${todayKey()}.csv`, "text/csv;charset=utf-8;");
  showToast("Sheet exported");
}

function exportJson() {
  const data = { logs: loadAllLogs(), settings: loadSettings() };
  downloadBlob(JSON.stringify(data, null, 2), `beyond-fitness-backup-${todayKey()}.json`, "application/json");
  showToast("Backup downloaded");
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data.logs) throw new Error("Invalid file");
      saveAllLogs(data.logs);
      if (data.settings) saveSettings(data.settings);
      showToast("Backup restored");
      renderAll();
    } catch (e) {
      alert("Could not restore this file — it doesn't look like a valid Beyond Fitness backup.");
    }
  };
  reader.readAsText(file);
}

/* ---------------------------------------------------------------- events */
document.addEventListener("DOMContentLoaded", () => {
  renderAll();

  // Bottom tab navigation
  $("bottomNav").addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-btn");
    if (!btn) return;
    document.querySelectorAll(".nav-btn").forEach((b) => { b.classList.remove("active"); b.removeAttribute("aria-current"); });
    document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    btn.setAttribute("aria-current", "page");
    $(`panel-${btn.dataset.tab}`).classList.add("active");
    $("pageTitle").textContent = TAB_TITLES[btn.dataset.tab];
    window.scrollTo(0, 0);
  });

  // Day strip selector
  $("daySelector").addEventListener("click", (e) => {
    const chip = e.target.closest(".day-chip");
    if (chip) changeSplitDay(todayKey(), chip.dataset.day);
  });

  // Notes
  $("dayNotes").addEventListener("input", (e) => {
    updateDayLog(todayKey(), (log) => { log.notes = e.target.value; });
  });

  // Body weight
  $("bodyWeightInput").addEventListener("input", (e) => {
    updateDayLog(todayKey(), (log) => { log.bodyWeight = e.target.value; });
  });
  $("bodyWeightInput").addEventListener("change", (e) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && (val < 20 || val > 400)) {
      const clamped = String(Math.min(400, Math.max(20, val)));
      e.target.value = clamped;
      updateDayLog(todayKey(), (log) => { log.bodyWeight = clamped; });
      showToast("Body weight adjusted to a realistic range (20–400kg)");
    }
    renderAll();
  });

  // Diet type toggle (event delegation on diet content)
  $("dietContent").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-diet-type]");
    if (btn) changeDietType(todayKey(), btn.dataset.dietType);
  });

  // Inline form-video expand/collapse, rest timer, and plate calculator (event delegation on workout content)
  $("workoutContent").addEventListener("click", (e) => {
    const videoBtn = e.target.closest("[data-video-action]");
    const timerBtn = e.target.closest("[data-timer-action]");
    const plateBtn = e.target.closest("[data-plate-action]");
    if (!videoBtn && !timerBtn && !plateBtn) return;

    if (videoBtn) {
      const key = videoBtn.dataset.videoKey;
      if (videoBtn.dataset.videoAction === "expand") expandedVideos.add(key);
      else expandedVideos.delete(key);
    } else if (timerBtn) {
      const key = timerBtn.dataset.timerKey;
      if (timerBtn.dataset.timerAction === "start") startRestTimer(key, Number(timerBtn.dataset.timerSecs));
      else stopRestTimer();
    } else if (plateBtn) {
      const key = plateBtn.dataset.plateKey;
      if (plateBtn.dataset.plateAction === "expand") expandedPlateCalc.add(key);
      else expandedPlateCalc.delete(key);
    }
    const scrollY = window.scrollY;
    renderAll();
    window.scrollTo(0, scrollY);
  });

  // Checkbox delegation for diet / workout / supplements
  ["dietContent", "workoutContent", "supplementsContent"].forEach((id) => {
    $(id).addEventListener("change", (e) => {
      const t = e.target;
      if (t.tagName !== "INPUT") return;
      const kind = t.dataset.kind;
      const dateKey = todayKey();

      if (kind === "diet") {
        const section = t.dataset.section;
        const idx = Number(t.dataset.index);
        updateDayLog(dateKey, (log) => { log.dietChecks[section][idx] = t.checked; });
      } else if (kind === "workout-cardio") {
        updateDayLog(dateKey, (log) => { log.workoutChecks.cardio = t.checked; });
      } else if (kind === "workout-exercise") {
        const idx = Number(t.dataset.index);
        updateDayLog(dateKey, (log) => { log.workoutChecks.exercises[idx] = t.checked; });
      } else if (kind === "supp") {
        const idx = Number(t.dataset.index);
        const timing = t.dataset.timing;
        updateDayLog(dateKey, (log) => { log.supplementChecks[idx][timing] = t.checked; });
      }
      const scrollY = window.scrollY;
      renderAll();
      window.scrollTo(0, scrollY);
    });

    $(id).addEventListener("input", (e) => {
      const t = e.target;
      if (t.dataset.kind === "workout-log-weight" || t.dataset.kind === "workout-log-reps") {
        const idx = Number(t.dataset.index);
        const field = t.dataset.kind === "workout-log-weight" ? "weight" : "reps";
        updateDayLog(todayKey(), (log) => { log.workoutChecks.logs[idx][field] = t.value; });

        if (t.dataset.kind === "workout-log-weight") {
          const row = t.closest(".exercise-row");
          if (row) {
            const key = row.dataset.videoKey;
            const badge = document.getElementById(`pr-badge-${key}`);
            if (badge) badge.innerHTML = prBadgeInnerHtml(row.dataset.exerciseName, t.value, todayKey());
            const plateDisplay = document.getElementById(`plate-display-${key}`);
            if (plateDisplay) plateDisplay.innerHTML = plateCalcInnerHtml(t.value);
          }
        }
      }
    });
  });

  // Settings modal
  const openSettings = () => { $("settingsModal").hidden = false; };
  const closeSettings = () => { $("settingsModal").hidden = true; };
  $("settingsBtn").addEventListener("click", openSettings);
  $("settingsClose").addEventListener("click", closeSettings);
  $("settingsBackdrop").addEventListener("click", closeSettings);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("settingsModal").hidden) closeSettings();
  });
  $("settingsResetToday").addEventListener("click", () => {
    resetToday(todayKey());
    closeSettings();
  });
  $("settingsInstallBtn").addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    $("settingsInstallSection").hidden = true;
    closeSettings();
  });

  // Install banner
  $("installBannerInstall").addEventListener("click", async () => {
    const banner = $("installBanner");
    if (!deferredInstallPrompt) { banner.hidden = true; return; }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    banner.hidden = true;
  });
  $("installBannerClose").addEventListener("click", () => {
    $("installBanner").hidden = true;
    try { localStorage.setItem(INSTALL_DISMISSED_KEY, "1"); } catch (e) { /* ignore */ }
  });

  // History actions
  $("exportCsvBtn").addEventListener("click", exportCsv);
  $("exportJsonBtn").addEventListener("click", exportJson);
  $("importJsonInput").addEventListener("change", (e) => {
    if (e.target.files[0]) importJson(e.target.files[0]);
    e.target.value = "";
  });

  $("historyList").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-delete-date]");
    if (!btn) return;
    const dk = btn.dataset.deleteDate;
    if (confirm(`Delete the log for ${dk}? This cannot be undone.`)) {
      const logs = loadAllLogs();
      delete logs[dk];
      saveAllLogs(logs);
      renderAll();
    }
  });
});
