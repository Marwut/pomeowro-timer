let timer;
let time = 25 * 60;

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer").innerText =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const quotes = [
  "Stay focused — a well-rested cat always pounces best. 🐾",
  "Take it slow and stretch — even lions do. 🐈‍⬛",
  "You don’t need nine lives to finish this. Just one focused one.",
  "Paws, breathe, and try again. You’ve got this. 🐾",
  "Big naps, small tasks. The cat way.",
  "Every day’s a new chance to land on your feet."
];


function setTime(minutes) {
  time = minutes * 60;
  clearInterval(timer);
  updateDisplay();
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateDisplay();
    } else {
      clearInterval(timer);
      playMeow();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  setTime(25);
}

function playMeow() {
    const audio = new Audio("meow.mp3");
    audio.play();
    console.log("Meow! Timer complete!");
  }

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
  

  let quoteInterval;

function startQuoteRotation() {
  let index = 0;
  const quoteElement = document.querySelector(".quote");

  quoteElement.innerText = quotes[index]; // show first one

  // clear old one if it exists
  clearInterval(quoteInterval);

  quoteInterval = setInterval(() => {
    index = (index + 1) % quotes.length;
    quoteElement.innerText = quotes[index];
  }, 5 * 60 * 1000); // 5 minutes in ms
}

startQuoteRotation();
// Initialize the timer display

  
