const lowRancidSongs = ["assets/audio/low1.mp3", "assets/audio/low2.mp3"];
const highRancidSongs = ["assets/audio/high1.mp3", "assets/audio/high2.mp3"];

let rancidLevel = "low";
let currentTrackIndex = 0;
let isPaused = false;

const audioPlayer = document.getElementById("audio-player");
const statusText = document.getElementById("status-text");
const skipButton = document.getElementById("skip-button");
const pauseButton = document.getElementById("pause-button");
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
  sliderKnob.style.left = (rancidLevel === "low") ? "0px" : "528px";
}

function skipTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % 2;
  playCurrentTrack();
}

function togglePause() {
  if (isPaused) {
    audioPlayer.play();
    isPaused = false;
    statusText.textContent = "Now Playing: " + audioPlayer.src.split('/').pop();
  } else {
    audioPlayer.pause();
    isPaused = true;
    statusText.textContent = "Paused";
  }
}

function toggleRancid() {
  rancidLevel = (rancidLevel === "low") ? "full" : "low";
  currentTrackIndex = 0;
  playCurrentTrack();
}

skipButton.addEventListener("click", skipTrack);
pauseButton.addEventListener("click", togglePause);
sliderKnob.addEventListener("click", toggleRancid);

window.onload = playCurrentTrack;
