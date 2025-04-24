let timer;
let time = 25 * 60;

function updateDisplay() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById("timer").innerText =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

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
    console.log("🐱 Meow! Timer complete!");
  }
  
