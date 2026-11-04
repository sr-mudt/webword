// Webword · the rules of the game in one pure function.
// Pure = no DOM, no global state: easy to test (EPA 6).

/**
 * Compare a guess with the answer.
 * @param {string} guess   five letters, upper case
 * @param {string} answer  five letters, upper case
 * @returns {("correct"|"present"|"absent")[]} one result per letter
 *
 * Duplicate letters are the classic bug: a letter can only be "present"
 * as often as it still occurs in the answer after the exact matches.
 * Example: answer CLASS, guess SASSY
 *   pass 1 (exact):  only position 3 (S = S) is correct
 *   left over:       C, L, A, S  (the S at position 4 of CLASS is still free)
 *   pass 2 (rest):   S at 0 present (uses up the free S), A at 1 present,
 *                    S at 2 absent (no S left), Y at 4 absent
 *   → present, present, absent, correct, absent
 */
export function evaluateGuess(guess, answer) {
  const result = Array(guess.length).fill("absent");
  const remaining = {};

  // Pass 1: exact matches; count the letters of the answer that are left over
  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = "correct";
    } else {
      remaining[answer[i]] = (remaining[answer[i]] ?? 0) + 1;
    }
  }

  // Pass 2: letters in the wrong position, only while some are left
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "correct") continue;
    const letter = guess[i];
    if (remaining[letter] > 0) {
      result[i] = "present";
      remaining[letter]--;
    }
  }
  return result;
}

/** Index of today's answer: the same word for everybody on the same day. */
export function dailyIndex(date, count) {
  const start = Date.UTC(2026, 0, 1);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.floor((today - start) / 86_400_000);
  return ((days % count) + count) % count;
}
