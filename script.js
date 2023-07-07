const videoContainer = document.querySelector(".video-container");
const video = document.getElementById("video");
const playBtn = document.querySelector(".video-play-btn");
const volumeSlider = document.getElementById("volume-slider");
const volumeBtn = document.querySelector(".video-volume-btn");
const videoTimeElapsed = document.querySelector(".video-time-elapsed");
const videoDuration = document.querySelector(".video-time-duration");
const videoProgress = document.querySelector(".video-progress");
const videpProgressFilled = document.querySelector(".video-progress-filled");

// Functions
const playPause = () => {
  videoContainer.classList.contains("paused")
    ? (videoContainer.classList.remove("paused"), video.play())
    : (videoContainer.classList.add("paused"), video.pause());
};

// Format time in seconds to mm:ss format
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// play - pause video
playBtn.addEventListener("click", playPause);
video.addEventListener("click", playPause);

// video volume event
volumeSlider.addEventListener("change", () => {
  video.volume = volumeSlider.value / 100;
  if (video.volume === 1) {
    videoContainer.classList.add("volume-max");
    videoContainer.classList.remove("volume-muted");
  } else if (video.volume === 0) {
    videoContainer.classList.remove("volume-max");
    videoContainer.classList.add("volume-muted");
  } else {
    videoContainer.classList.remove("volume-max");
    videoContainer.classList.remove("volume-muted");
  }
});

// Toggle volume mute
volumeBtn.addEventListener("click", () => {
  videoContainer.classList.toggle("volume-muted");
  if (videoContainer.classList.contains("volume-muted")) {
    videoContainer.classList.remove("volume-max");
    volumeSlider.value = 0;
    video.volume = volumeSlider.value / 100;
  } else {
    volumeSlider.value = 50;
    video.volume = volumeSlider.value / 100;
  }
});

video.addEventListener("loadedmetadata", () => {
  videoDuration.textContent = formatTime(video.duration);
});

// Display elapsed time
video.addEventListener("timeupdate", () => {
  videoTimeElapsed.textContent = formatTime(video.duration - video.currentTime);
  // Progress bar
  videpProgressFilled.style.width = `${Math.round(
    (video.currentTime / video.duration) * 100
  )}%`;
});

videoProgress.addEventListener("click", (e) => {
  // video.currentTime = (e.offsetX / e.offsetWidth) * 100;
  let percent = (e.offsetX / videoProgress.offsetWidth) * 100;
  video.currentTime = (percent / 100) * video.duration;
});

// When clicking on the progress bar of a video go to that part and also move the progress to the clicked part and explain code like i'm a child
