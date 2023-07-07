export default class VideoPlayer {
  constructor(videoElement) {
    this.video = videoElement;
    this.playVideo = document.querySelector(".playVideo");
    this.currTime = document.querySelector(".currTime");
    this.duration = document.querySelector(".duration");
    this.videoProgressbarContainer = document.querySelector(
      ".videoProgressContainer"
    );
    this.videoProgressbar = document.querySelector(".videoProgress span");
    this.videoProgressTime = document.querySelector(".progressTime");
    this.forwardIcon = document.querySelector(".forwardIcon");
    this.backwardsIcon = document.querySelector(".replayBackwardsIcon");
    this.volumeIcon = document.querySelector(".volumeIcon");
    this.volumeSlider = document.querySelector(".videoVolumeSlider");
    this.replayIcon = document.querySelector(".replayIcon");
    this.pictureInPictureIcon = document.querySelector(".pictureInPictureIcon");
    this.fullscreen = document.querySelector(".fullscreen");
    this.videoControls = video.nextElementSibling.nextElementSibling;
    this.videoTitle = document.querySelector(".videoTitle");
    this.bufferProgress = document.querySelector(".bufferProgress");
    this.settingsIcon = document.querySelector(".settingsIcon");
    this.playbackSpeedItems = document.querySelectorAll(".settingsMenu li");
    this.videoSpinner = document.querySelector(".videoSpinner");
    let isProgressMouseDown = false;
  }
}

const player = new VideoPlayer(video);
