// Just enough JavaScript to make the broken page "work" with a mouse.
// The real game logic follows in EPA 4. You do not need to change this file
// (but you may, if your repair needs it).
const input = document.getElementById("guess");
function press(key) {
  if (key === "Back") input.value = input.value.slice(0, -1);
  else if (key === "Enter") toast("This is a static page: the game logic follows in EPA 4.");
  else if (input.value.length < 5) input.value += key;
}
function toast(text) {
  const t = document.getElementById("toast");
  t.textContent = text;
  setTimeout(() => (t.textContent = ""), 2000);
}
function openHelp() { document.getElementById("help").style.display = "block"; }
function closeHelp() { document.getElementById("help").style.display = "none"; }
