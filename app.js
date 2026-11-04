// Webword · game logic and DOM (EPA 4). The rules live in evaluate.js.
import { evaluateGuess, dailyIndex } from "./evaluate.js";

const ROWS = 6;
const LENGTH = 5;
const LABELS = { correct: "correct", present: "elsewhere", absent: "not in the word" };
const RANK = { absent: 1, present: 2, correct: 3 };   // a key keeps its best state

const $ = (selector) => document.querySelector(selector);
const board = $("#board");
const form = $("#guess-form");
const input = $("#guess");
const status = $("#status");
const keyboard = $("#keyboard");

let words;            // { answers: [{word, hint}], allowed: [...] }
let allowed;          // Set for fast lookup
let game;             // { mode, key, answer, hint, guesses: [], results: [], over }

// ---------- start ----------
init();

async function init() {
  buildBoard();
  buildKeyboard();
  try {
    const response = await fetch("words.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    words = await response.json();
    allowed = new Set(words.allowed);
  } catch (error) {
    announce("The word list could not be loaded. Please reload the page.");
    console.error(error);
    form.querySelector("button").disabled = true;
    return;
  }
  startGame("daily");
}

// ---------- building the DOM ----------
function buildBoard() {
  for (let r = 0; r < ROWS; r++) {
    const row = document.createElement("li");
    row.className = "row";
    row.innerHTML =
      `<span class="visually-hidden" data-summary>Guess ${r + 1}: empty</span>` +
      `<span class="tile" aria-hidden="true"></span>`.repeat(LENGTH);
    board.append(row);
  }
}

function buildKeyboard() {
  const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];
  rows.forEach((letters, i) => {
    const row = document.createElement("div");
    row.className = "key-row";
    if (i === 2) row.append(keyButton("Enter", "Guess", "wide"));
    for (const letter of letters) row.append(keyButton(letter, letter));
    if (i === 2) row.append(keyButton("Backspace", "Delete", "wide"));
    keyboard.append(row);
  });
}

function keyButton(key, text, extraClass = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.dataset.key = key;
  if (extraClass) button.className = extraClass;
  return button;
}

// ---------- game state ----------
function startGame(mode) {
  const today = new Date();
  const index = mode === "daily"
    ? dailyIndex(today, words.answers.length)
    : Math.floor(Math.random() * words.answers.length);
  const { word, hint } = words.answers[index];
  const key = mode === "daily" ? `webword-daily-${today.toISOString().slice(0, 10)}` : null;

  game = { mode, key, answer: word, hint, guesses: [], results: [], over: false };

  // restore today's daily game, if any
  if (key) {
    const saved = load(key);
    if (saved) Object.assign(game, saved);
  }

  $("#mode-info").textContent = mode === "daily" ? "Daily word" : "Practice word";
  $("#mode-toggle").textContent = mode === "daily" ? "Practice mode" : "Daily word";
  $("#result").hidden = true;
  input.disabled = false;
  input.value = "";
  render();
  if (game.over) finish(false);
  else announce(mode === "daily" ? "New daily word. Six tries." : "New practice word. Six tries.");
}

function submitGuess() {
  if (game.over) return;
  const guess = input.value.trim().toUpperCase();

  if (!/^[A-Z]{5}$/.test(guess)) return announce("Enter exactly five letters A to Z.");
  if (!allowed.has(guess)) return announce(`${guess} is not in the word list.`);

  const result = evaluateGuess(guess, game.answer);
  game.guesses.push(guess);
  game.results.push(result);
  input.value = "";

  const won = result.every((r) => r === "correct");
  game.over = won || game.guesses.length === ROWS;
  save();
  render(true);
  announce(describe(game.guesses.length - 1));
  if (game.over) finish(true);
}

function finish(isNew) {
  const won = game.results.at(-1)?.every((r) => r === "correct");
  if (isNew) updateStats(won);
  input.disabled = true;
  $("#result-text").textContent = won
    ? `Solved in ${game.guesses.length} of ${ROWS} tries.`
    : `Not this time. The word was ${game.answer}.`;
  $("#result-word").textContent = game.answer;
  $("#result-hint").textContent = game.hint;
  showStats();
  $("#result").hidden = false;
  $("#result-heading").focus();   // move focus to the result, it is announced
}

// ---------- rendering ----------
function render(revealLast = false) {
  const rows = board.children;
  for (let r = 0; r < ROWS; r++) {
    const guess = game.guesses[r] ?? (r === game.guesses.length ? input.value.toUpperCase() : "");
    const result = game.results[r];
    const tiles = rows[r].querySelectorAll(".tile");
    tiles.forEach((tile, i) => {
      tile.textContent = guess[i] ?? "";
      if (result) tile.dataset.state = result[i];
      else delete tile.dataset.state;
      tile.classList.toggle("reveal", revealLast && r === game.guesses.length - 1);
    });
    rows[r].querySelector("[data-summary]").textContent =
      result ? describe(r) : `Guess ${r + 1}: empty`;
  }
  renderKeyboard();
}

function renderKeyboard() {
  const best = {};
  game.guesses.forEach((guess, r) => {
    [...guess].forEach((letter, i) => {
      const state = game.results[r][i];
      if (!best[letter] || RANK[state] > RANK[best[letter]]) best[letter] = state;
    });
  });
  keyboard.querySelectorAll("button[data-key]").forEach((button) => {
    const state = best[button.dataset.key];
    if (state) {
      button.dataset.state = state;
      button.setAttribute("aria-label", `${button.dataset.key}, ${LABELS[state]}`);
    } else {
      delete button.dataset.state;
      button.removeAttribute("aria-label");
    }
  });
}

/** "Guess 2, FETCH: F correct, E elsewhere, T not in the word, …" */
function describe(r) {
  const parts = [...game.guesses[r]].map((letter, i) => `${letter} ${LABELS[game.results[r][i]]}`);
  return `Guess ${r + 1}, ${game.guesses[r]}: ${parts.join(", ")}.`;
}

function announce(message) {
  status.textContent = message;
}

// ---------- input ----------
form.addEventListener("submit", (event) => {
  event.preventDefault();
  submitGuess();
});

input.addEventListener("input", () => {
  if (!game) return;
  input.value = input.value.replace(/[^a-z]/gi, "").slice(0, LENGTH);
  render();
});

keyboard.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-key]");
  if (!button || game?.over) return;
  pressKey(button.dataset.key);
});

// typing anywhere on the page (except in fields and on buttons) goes into the guess
document.addEventListener("keydown", (event) => {
  if (event.target === input || event.ctrlKey || event.metaKey || event.altKey) return;
  if (event.target.closest("button, dialog, a")) return;
  if (/^[a-z]$/i.test(event.key) || event.key === "Backspace" || event.key === "Enter") {
    event.preventDefault();
    pressKey(event.key.length === 1 ? event.key.toUpperCase() : event.key);
  }
});

function pressKey(key) {
  if (!game || game.over) return;
  if (key === "Enter") return submitGuess();
  if (key === "Backspace") input.value = input.value.slice(0, -1);
  else if (input.value.length < LENGTH) input.value += key;
  render();
}

$("#mode-toggle").addEventListener("click", () => startGame(game.mode === "daily" ? "practice" : "daily"));
$("#play-again").addEventListener("click", () => startGame("practice"));
$("#help-open").addEventListener("click", () => $("#help").showModal());

// ---------- storage ----------
function save() {
  if (!game.key) return;
  const { guesses, results, over } = game;
  try { localStorage.setItem(game.key, JSON.stringify({ guesses, results, over })); } catch { /* private mode */ }
}

function load(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}

function updateStats(won) {
  const stats = load("webword-stats") ?? { played: 0, won: 0, streak: 0 };
  stats.played++;
  if (won) { stats.won++; stats.streak++; } else { stats.streak = 0; }
  try { localStorage.setItem("webword-stats", JSON.stringify(stats)); } catch { /* ignore */ }
}

function showStats() {
  const stats = load("webword-stats") ?? { played: 0, won: 0, streak: 0 };
  $("#stat-played").textContent = stats.played;
  $("#stat-won").textContent = stats.won;
  $("#stat-streak").textContent = stats.streak;
}
