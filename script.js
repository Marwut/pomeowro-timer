let timer;
let time = 25 * 60;
let meowSound;
let isBreak = false;
let customTimeSet = false;
let sessionCount = parseInt(localStorage.getItem("sessionCount")) || 0;

// 🐱 Load on page
window.onload = () => {
  meowSound = new Audio("images/Audio/meow.mp3");
  meowSound.load();

  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    const btn = document.querySelector(".dark-mode-toggle");
    if (btn) btn.innerText = "☀️";
  }

  updateDisplay();
  updateSessionCounter();
  startQuoteRotation();
};

// ⏰ Display
function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer").innerText =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// 🍅 Counter
function updateSessionCounter() {
  const counter = document.getElementById("sessionCounter");
  counter.innerText = `🍅 Pomodoros completed: ${sessionCount}`;
  localStorage.setItem("sessionCount", sessionCount);
}

// 🔊 Meow
function playMeow() {
  if (meowSound) {
    meowSound.play().catch(err => {
      console.log("Audio play failed:", err);
    });
  }
}

// 🔢 Time
function setTime(minutes) {
  time = minutes * 60;
  clearInterval(timer);
  updateDisplay();
}

// 🎯 Focus Session
function startFocusSession(minutes = 25) {
  isBreak = false;

  if (!customTimeSet) {
    setTime(minutes);
  } else {
    customTimeSet = false; // reset after using custom
  }

  startTimer();
}

// 🧘 Break Session
function startBreakSession(minutes = 5) {
  isBreak = true;
  setTime(minutes);
  startTimer();
}

// 🧼 Reset
function resetTimer() {
  clearInterval(timer);
  setTime(25);
}

// ▶️ Timer
function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      playMeow();

      if (!isBreak) {
        sessionCount++;
        updateSessionCounter();
      }

      if ("Notification" in window && Notification.permission === "granted") {
        if (!document.hasFocus()) {
          new Notification("Pomeowro says: Time’s up! 🐾");
        } else {
          console.log("Time’s up (focused tab — no notif)");
        }
      } else {
        alert("Time’s up! 🐾");
      }

      if (isBreak) {
        if (confirm("Break's over! Start a new 25-minute session?")) {
          startFocusSession();
        }
      }

      resetTimer();
    }
  }, 1000);
}

// 🌈 Theme toggle
function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  const btn = document.querySelector(".dark-mode-toggle");
  btn.innerText = isDark ? "☀️" : "🌙";
}

// 📝 Custom Time
function toggleCustomInput() {
  const container = document.getElementById("customTimeContainer");
  container.style.display = container.style.display === "none" ? "block" : "none";
}

function setCustomTime() {
  const input = document.getElementById("customTimeInput").value;
  const minutes = parseInt(input);

  if (!isNaN(minutes) && minutes > 0) {
    isBreak = false;
    setTime(minutes);
    customTimeSet = true;
    document.getElementById("customTimeContainer").style.display = "none";
  } else {
    alert("Please enter a valid number greater than 0.");
  }
}

// 💬 Rotating quotes
const quotes = [
  "Stay focused — a well-rested cat always pounces best. 🐾",
  "Take it slow and stretch — even lions do. 🐈‍⬛",
  "You don’t need nine lives to finish this. Just one focused one.",
  "Paws, breathe, and try again. You’ve got this. 🐾",
  "Big naps, small tasks. The cat way.",
  "Every day’s a new chance to land on your feet."
];

let quoteInterval;

function startQuoteRotation() {
  let index = 0;
  const quoteElement = document.querySelector(".quote");

  quoteElement.innerText = quotes[index];

  clearInterval(quoteInterval);
  quoteInterval = setInterval(() => {
    index = (index + 1) % quotes.length;
    quoteElement.innerText = quotes[index];
  }, 5 * 60 * 1000); // every 5 mins
}



