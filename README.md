# Webword · the course's running game example

A small word-guessing game with **five-letter web development terms** (FETCH, ASIDE, LABEL …). It is the second running example of SE-501 next to the Campus Café: the café is a *content site* (HTML, accessibility, layout), Webword is an *app* (state, events, data, tests).

**Live:** https://sr-mudt.github.io/webword/ · **Repository:** https://github.com/sr-mudt/webword

Play it locally: `npx serve .` or `python3 -m http.server` in this folder, then open the URL (a server is needed because `app.js` loads `words.json` with `fetch`).

## Why not "Wordle"?

The game mechanics are free, but **"Wordle" is a trademark of The New York Times**, and the Times has sent takedown notices to clones that copied the name, the layout or the green/yellow/grey colour scheme (AP, March 2024). So the course uses its own name, its own word list, its own colours (blue/orange plus symbols) and an accessible input form. A good professional lesson in itself: names, logos and "trade dress" are not free to copy.

## Files

| File | What | Session / EPA |
|------|------|------|
| `index.html` | semantic structure: header, `ol` board, form with label, live region, native `<dialog>` | EPA 2 (Session 4) |
| `style.css` | tokens (incl. tile states and dark mode), Grid board, Flexbox keyboard, reduced motion | EPA 3 (Sessions 5, 6) |
| `evaluate.js` | the rules as a pure function (two passes for duplicate letters), daily index | EPA 4, tests in EPA 6 |
| `app.js` | state, rendering, events, `fetch`, `localStorage` | EPA 4 |
| `words.json` | 66 answers with a one-line explanation each + 12,656 allowed guesses | EPA 4 (`fetch`) |
| `LICENSE-wordlist.txt` | MIT licence of the allowed-guesses list (*an-array-of-english-words*) | |

## Accessibility decisions (show them in class)

- **Not colour only (1.4.1):** correct = filled blue + ✓, elsewhere = dashed orange border + ↔, not in the word = grey + strike-through.
- **Text alternative:** every row has a visually hidden summary ("Guess 2, FETCH: F correct, E elsewhere …"); the tiles themselves are `aria-hidden`.
- **Live region:** `<p role="status">` exists from the start; each guess is announced.
- **Real buttons:** the on-screen keyboard is made of `<button>`s; after a guess they get `aria-label="F, correct"`.
- **A form as the input:** works with every keyboard, screen reader and phone; the on-screen keyboard is an extra.
- **Focus:** after the game the focus moves to the result heading; `<dialog>` with `showModal()` traps the focus natively.
- **Reduced motion:** the flip animation is switched off with `prefers-reduced-motion`.

Measured: W3C validator 0 errors; axe 0 violations in light and dark mode, also with the dialog open; no horizontal scrolling at 320 and 1280 px.

## Roadmap through the course

| Session | Webword step |
|:--:|------|
| 4 | demo: what does a screen reader hear in a word game? (colour only vs. symbols + text, live region) |
| 5 | Lab I bonus: build the board with Grid and the keyboard with Flexbox (`session-05/lab-files/webword-board/`) |
| 6 | Lab K bonus: tokens for the tile states, contrast, dark mode, not colour only |
| EPA 4 | live coding / labs: events, state, `evaluateGuess`, `fetch('words.json')`, `localStorage` |
| EPA 5 | Webword as an Astro **island** in a static site (rules, word archive as a content collection) |
| EPA 6 | unit tests for `evaluateGuess`, an E2E test, Lighthouse; discussion: the answer is in the client code, so anybody can cheat with the DevTools. What does "no secrets in the client" mean? |
