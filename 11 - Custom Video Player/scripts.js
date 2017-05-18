const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.fullscreen');

function togglePlay () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton () {
  const icon = this.paused ? '►' : '❚❚';
  
  toggle.textContent = icon;
}

function skip () {
  video.currentTime += +this.dataset.skip;
}

function rangeUpdateHandler (e) {
  video[e.target.name] = e.target.value;
}

function progressHandler () {
  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
}

function progressBarHandler (e) {
  const selectedTime = (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = selectedTime;
}

function fullScreenHandler () {
  if (video.webkitDisplayingFullscreen) return video.webkitExitFullscreen();

  video.webkitRequestFullscreen();
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

let mouseDown = false;

ranges.forEach(range => range.addEventListener('mousedown', () => mouseDown = true));
ranges.forEach(range => range.addEventListener('mouseup', () => mouseDown = false));
ranges.forEach(range => range.addEventListener('change', rangeUpdateHandler));
ranges.forEach(range => range.addEventListener('mousemove', (e) => mouseDown && rangeUpdateHandler(e)));
video.addEventListener('timeupdate', progressHandler);
progressBar.addEventListener('mousedown', () => mouseDown = true);
progressBar.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('click', progressBarHandler);
progress.addEventListener('mousemove', (e) => mouseDown && progressBarHandler(e));
fullScreen.addEventListener('click', fullScreenHandler);