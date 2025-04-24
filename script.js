let timer;
let time = 25 * 60;
let meowSound;

// 🐱 Load meow on page load (no autoplay)
window.onload = () => {
  meowSound = new Audio("images/Audio/meow.mp3");
  meowSound.load();

  // Request notification permission once
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  startQuoteRotation();
  updateDisplay();
};

// ⏰ Update time display
function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer").innerText =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// ⏱️ Set session time
function setTime(minutes) {
  time = minutes * 60;
  clearInterval(timer);
  updateDisplay();
}

// ▶️ Start timer
function startTimer() {
  clearInterval(timer);

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      playMeow();

      // Notify only if not looking at tab
      if ("Notification" in window && Notification.permission === "granted") {
        if (!document.hasFocus()) {
          new Notification("Pomeowro says: Time’s up! 🐾");
        } else {
          console.log("Time’s up (focused tab — no notif)");
        }
      } else {
        alert("Time’s up! 🐾");
      }

      resetTimer();
    }
  }, 1000);
}

// 🔁 Reset to default 25 minutes
function resetTimer() {
  clearInterval(timer);
  setTime(25);
}

// 🔊 Play the meow (only if allowed)
function playMeow() {
  if (meowSound) {
    meowSound.play().catch(err => {
      console.log("Audio play failed:", err);
    });
  }
}

// 🎯 Custom time input
function toggleCustomInput() {
  const container = document.getElementById("customTimeContainer");
  container.style.display = container.style.display === "none" ? "block" : "none";
}

function setCustomTime() {
  const input = document.getElementById("customTimeInput").value;
  const minutes = parseInt(input);

  if (!isNaN(minutes) && minutes > 0) {
    time = minutes * 60;
    clearInterval(timer);
    updateDisplay();
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
  }, 5 * 60 * 1000); // 5 min
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const btn = document.querySelector(".dark-mode-toggle");
  btn.innerText = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
}

function startBreak(minutes) {
  clearInterval(timer);
  time = minutes * 60;
  updateDisplay();

  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      playMeow();

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Break's over! Ready to focus again? 🐾");
      }

      // Ask the user to restart the main timer
      if (confirm("Break's over! Start a new 25-minute session?")) {
        setTime(25);
        startTimer();
      }
    }
  }, 1000);
}


