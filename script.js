"use strict";

const letter = document.querySelector(".letter");
const title = document.getElementById("letter-title");
const label = document.getElementById("letter-label");
const message = document.getElementById("message");
const signOff = document.getElementById("sign-off");
const actions = document.getElementById("actions");
const resultActions = document.getElementById("result-actions");
const confetti = document.getElementById("confetti");
let cleanupTimer;

function clearConfetti() {
  window.clearTimeout(cleanupTimer);
  confetti.replaceChildren();
}

function celebrate() {
  clearConfetti();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#a84759", "#e8b7a9", "#c7987e", "#d8acb7", "#e4cd94"];
  const pieces = document.createDocumentFragment();
  for (let i = 0; i < 55; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.setProperty("--x", `${Math.random() * 100}%`);
    piece.style.setProperty("--color", colors[i % colors.length]);
    piece.style.setProperty("--duration", `${2.5 + Math.random() * 1.5}s`);
    piece.style.setProperty("--delay", `${Math.random() * 0.8}s`);
    piece.style.setProperty("--drift", `${Math.random() * 160 - 80}px`);
    piece.style.setProperty("--rotation", `${Math.random() * 720 - 360}deg`);
    pieces.append(piece);
  }
  confetti.append(pieces);
  cleanupTimer = window.setTimeout(clearConfetti, 5000);
}

function showResult(happy) {
  actions.hidden = true;
  resultActions.hidden = false;
  letter.classList.toggle("is-happy", happy);
  label.textContent = happy ? "Yeni bir başlangıca…" : "Kalbimden, sana.";
  title.textContent = happy ? "İyi ki barıştık!" : "Seni anlıyorum.";
  message.replaceChildren();
  message.append(happy ? "Şimdi yüzümde kocaman bir gülümseme var." : "Hazır olduğunda ben buradayım.");
  message.append(document.createElement("br"));
  message.append(happy ? "Seninle her şey daha güzel. ♡" : "Kendine iyi bak. ♡");
  signOff.textContent = happy ? "Bir kelime, bir sürü mutluluk." : "Bazı şeyler biraz zamana ihtiyaç duyar.";
  title.focus({ preventScroll: true });
  if (happy) celebrate();
  else clearConfetti();
}

document.getElementById("yes").addEventListener("click", () => showResult(true));
document.getElementById("no").addEventListener("click", () => showResult(false));
document.getElementById("reset").addEventListener("click", () => {
  clearConfetti();
  letter.classList.remove("is-happy");
  actions.hidden = false;
  resultActions.hidden = true;
  label.textContent = "Kalbimden, sana.";
  title.textContent = "Barışalım mı?";
  message.replaceChildren("Küslük bize yakışmıyor.", document.createElement("br"), "Birlikte yeniden gülümseyelim mi?");
  signOff.textContent = "Bazen tek bir kelime yeter.";
  document.getElementById("yes").focus({ preventScroll: true });
});
