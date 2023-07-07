const video = document.querySelector("video"),
  playVideo = document.querySelector(".playVideo"),
  currTime = document.querySelector(".currTime"),
  duration = document.querySelector(".duration"),
  videoProgressbarContainer = document.querySelector(".videoProgressContainer"),
  videoProgressbar = document.querySelector(".videoProgress span"),
  videoProgressTime = document.querySelector(".progressTime"),
  forwardIcon = document.querySelector(".forwardIcon"),
  backwardsIcon = document.querySelector(".replayBackwardsIcon"),
  volumeIcon = document.querySelector(".volumeIcon"),
  volumeSlider = document.querySelector(".videoVolumeSlider"),
  replayIcon = document.querySelector(".replayIcon"),
  pictureInPictureIcon = document.querySelector(".pictureInPictureIcon"),
  fullscreen = document.querySelector(".fullscreen"),
  videoControls = video.nextElementSibling.nextElementSibling,
  videoTitle = document.querySelector(".videoTitle"),
  bufferProgress = document.querySelector(".bufferProgress"),
  settingsIcon = document.querySelector(".settingsIcon"),
  playbackSpeedItems = document.querySelectorAll(".settingsMenu li"),
  videoSpinner = document.querySelector(".videoSpinner");
let isProgressMouseDown = false;

function moveProgress(event) {
  if (isProgressMouseDown) {
    let percent =
      (event.offsetX / videoProgressbar.parentElement.offsetWidth) * 100;
    video.currentTime = (percent / 100) * video.duration;
  }
}

function displayTimeOverProgress(event) {
  const rect =
    videoProgressbarContainer.firstElementChild.getBoundingClientRect();
  const progressWidth = rect.width;
  const relativeX = event.clientX - rect.left;
  const percentage = (relativeX / progressWidth) * 100;
  const videoDuration = video.duration;
  const timestamp = (percentage / 100) * videoDuration;
  const timestampWidth = videoProgressTime.offsetWidth;
  const left = relativeX - timestampWidth / 2;
  videoProgressTime.style.left = `${left}px`;
  videoProgressTime.classList.add("active");
  videoProgressTime.textContent = formatTime(Math.round(timestamp));
}

function hideControls() {
  let timeout;
  if (video.paused) {
    videoControls.classList.remove("hide");
    videoProgressbarContainer.classList.remove("hide");
    videoTitle.classList.remove("hide");
  } else {
    video.parentElement.addEventListener("mousemove", () => {
      videoControls.classList.remove("hide");
      videoProgressbarContainer.classList.remove("hide");
      videoTitle.classList.remove("hide");
      video.style.cursor = "default";

      clearTimeout(timeout);
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        videoControls.classList.remove("hide");
        videoProgressbarContainer.classList.remove("hide");
        videoTitle.classList.remove("hide");
        video.style.cursor = "default";

        clearTimeout(timeout);
      }
    });
    timeout = setTimeout(() => {
      if (!video.ended) {
        videoControls.classList.add("hide");
        videoProgressbarContainer.classList.add("hide");
        videoTitle.classList.add("hide");
        video.style.cursor = "none";
      }
    }, 3000);
  }
}

// Format time function
function formatTime(timeInSeconds) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  let seconds = timeInSeconds - hours * 3600 - minutes * 60;
  let timeString = "";

  if (hours > 0) {
    timeString =
      hours +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
  } else {
    timeString = minutes + ":" + seconds.toString().padStart(2, "0");
  }

  return timeString;
}

function playPauseVideo() {
  if (video.paused) {
    video.play();
    video.parentElement.classList.add("paused");
  } else {
    video.pause();
    video.parentElement.classList.remove("paused");
  }
}

function toggleMute() {
  video.parentElement.classList.toggle("muted");
  if (video.parentElement.classList.contains("muted")) {
    video.volume = 0;
    volumeSlider.value = 0;
    video.parentElement.classList.remove("volume-down");
  } else {
    video.volume = 0.5;
    volumeSlider.value = 50;
  }
}

function goForwards() {
  if (video.currentTime === video.duration) return;
  video.currentTime += 10;
}

function goBackwards() {
  if (video.currentTime === 0) return;
  video.currentTime -= 10;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    video.parentElement.classList.remove("fullscreen-mode");
  } else {
    video.parentElement.classList.add("fullscreen-mode");
    video.parentElement.requestFullscreen();
  }
}

// Play/Pause
playVideo.addEventListener("click", playPauseVideo);
video.addEventListener("click", () => {
  video.parentElement.classList.remove("ended");
  playPauseVideo();
});

// Replay video when ended
video.addEventListener("ended", () => {
  video.parentElement.classList.add("ended");
  replayIcon.addEventListener("click", () => {
    video.parentElement.classList.remove("ended");
    if (!video.paused) {
      video.play();
      playPauseVideo();
    }
  });
});

// Duration
video.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(Math.round(video.duration));
  currTime.textContent = formatTime(Math.round(video.currentTime));
  video.volume = 0.5;
});

// Current time
video.addEventListener("timeupdate", () => {
  currTime.textContent = formatTime(Math.round(video.currentTime));

  // Progressbar
  videoProgressbar.style.width = `${Math.round(
    (video.currentTime / video.duration) * 100
  )}%`;

  // If the video is playing hide controls
  hideControls();
});

// Display time on hover
videoProgressbarContainer.addEventListener("mouseenter", (e) => {
  displayTimeOverProgress(e);
});

videoProgressbarContainer.addEventListener("mousemove", (e) => {
  displayTimeOverProgress(e);
});

videoProgressbarContainer.addEventListener("mouseleave", () => {
  videoProgressTime.classList.remove("active");
});

// Go to clicked part
videoProgressbar.parentElement.addEventListener("mousedown", (e) => {
  isProgressMouseDown = true;
  moveProgress(e);
});
videoProgressbar.parentElement.addEventListener("mousemove", (e) => {
  moveProgress(e);
});
videoProgressbar.parentElement.addEventListener("mouseup", () => {
  isProgressMouseDown = false;
});

videoProgressbar.parentElement.addEventListener("mouseleave", () => {
  isProgressMouseDown = false;
});

// Go forward 30 seconds
forwardIcon.addEventListener("click", goForwards);

// Go Backwards 30 seconds
backwardsIcon.addEventListener("click", goBackwards);

// Volume Mute
volumeIcon.addEventListener("click", toggleMute);

// Change Volume
volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value / 100;
  if (video.volume === 0) {
    video.parentElement.classList.add("muted");
  } else {
    video.parentElement.classList.remove("muted");
  }

  if (video.volume < 0.5 && video.volume !== 0) {
    video.parentElement.classList.add("volume-down");
  } else {
    video.parentElement.classList.remove("volume-down");
  }
});

// Picture in Picture
pictureInPictureIcon.addEventListener("click", () => {
  const picInpic = document.pictureInPictureEnabled;
  try {
    if (picInpic) {
      video.requestPictureInPicture();
    } else {
      throw new Error("Browser doesnt support PIP");
    }
  } catch (error) {
    console.log(error);
  }
});

// Full Screen
fullscreen.addEventListener("click", () => {
  toggleFullscreen();
});

// Go fullsceen when double clicking the video
video.addEventListener("dblclick", toggleFullscreen);

// Prevent user from right clicking the video
video.addEventListener("contextmenu", (e) => e.preventDefault());

// Video buffer progress
video.addEventListener("progress", (e) => {
  if (video.buffered.length > 0) {
    // get the end time of the buffered range
    const bufferedEnd = video.buffered.end(0);
    // Video duration
    const duration = video.duration;
    // calculate the progress as a percentage
    const progress = (bufferedEnd / duration) * 100;
    bufferProgress.style.width = `${progress}%`;
  }
});

// Settings
settingsIcon.addEventListener("click", () => {
  settingsIcon.classList.toggle("active");
  settingsIcon.nextElementSibling.classList.toggle("active");
});

// Change playback speed of a video
playbackSpeedItems.forEach((speedItem) => {
  let speedData = Number(speedItem.dataset.speed);

  // Default playback rate
  if (speedItem.classList.contains("active")) {
    video.playbackRate = speedData;
  }

  speedItem.addEventListener("click", (e) => {
    e.preventDefault();
    playbackSpeedItems.forEach((item) => item.classList.remove("active"));
    speedItem.classList.add("active");
    video.playbackRate = speedData;
  });
});

// Spinner
video.addEventListener("onwaiting", () => {
  videoSpinner.classList.add("active");
});

video.addEventListener("onplaying", () => {
  videoSpinner.classList.remove("active");
});

// KEYBOARD SHORTCUTS
// Space to pause and play
window.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === " ") {
    video.parentElement.classList.remove("ended");
    playPauseVideo();
  }
});

// Muting video by typing M
window.addEventListener("keydown", (e) => {
  if (e.key === "m") {
    toggleMute();
  }
});

// Seek forward 30 seconds
window.addEventListener("keydown", (e) => {
  if (e.key === "f") {
    goForwards();
  }
});

// Seek backwards 30 seconds
window.addEventListener("keydown", (e) => {
  if (e.key === "b") {
    goBackwards();
  }
});

// Things to do
// Change video quality
