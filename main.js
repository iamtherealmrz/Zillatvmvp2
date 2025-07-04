const lowRancidSongs = ["assets/audio/low1.mp3", "assets/audio/low2.mp3"];
const highRancidSongs = ["assets/audio/high1.mp3", "assets/audio/high2.mp3"];

let rancidLevel = "low"; // 'low' or 'full'
let currentTrackIndex = 0;
let isPaused = false;

const audioPlayer = document.getElementById("audio-player");
const statusText = document.getElementById("status-text");
const sliderKnob = document.getElementById("slider-knob");

function getCurrentPool() {
  return rancidLevel === "low" ? lowRancidSongs : highRancidSongs;
}

function playCurrentTrack() {
  const pool = getCurrentPool();
  const track = pool[currentTrackIndex % 2];
  audioPlayer.src = track;
  audioPlayer.play();
  isPaused = false;
  statusText.textContent = "Now Playing: " + track.split('/').pop();
}

function skipTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % 2;
  playCurrentTrack();
}

function setRancidLevel(level) {
  rancidLevel = level;
  currentTrackIndex = 0;
  playCurrentTrack();
  sliderKnob.style.left = level === "full" ? "645px" : "115px";
}

document.getElementById("skip-button").addEventListener("click", skipTrack);
document.getElementById("pause-button").addEventListener("click", () => {
  if (isPaused) {
    audioPlayer.play();
    isPaused = false;
    statusText.textContent = "Now Playing: " + audioPlayer.src.split('/').pop();
  } else {
    audioPlayer.pause();
    isPaused = true;
    statusText.textContent = "Paused";
  }
});

sliderKnob.addEventListener("click", () => {
  if (rancidLevel === "low") {
    setRancidLevel("full");
  } else {
    setRancidLevel("low");
  }
});

window.onload = playCurrentTrack;
