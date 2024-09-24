// Select elements here
const video = document.getElementById('video');
const videoControls = document.getElementById('video-controls');
const playButton = document.getElementById('play');
const playbackIcons = document.querySelectorAll('.playback-icons use');
const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const seek = document.getElementById('seek');
const seekTooltip = document.getElementById('seek-tooltip');
const volumeButton = document.getElementById('volume-button');
const volumeIcons = document.querySelectorAll('.volume-button use');
const volumeMute = document.querySelector('use[href="#volume-mute"]');
const volumeLow = document.querySelector('use[href="#volume-low"]');
const volumeHigh = document.querySelector('use[href="#volume-high"]');
const volume = document.getElementById('volume');
const playbackAnimation = document.getElementById('playback-animation');
const fullscreenButton = document.getElementById('fullscreen-button');
const videoContainer = document.getElementById('video-container');
const fullscreenIcons = fullscreenButton.querySelectorAll('use');
const pipButton = document.getElementById('pip-button')
const videoTitle = document.getElementById('video-title');


const videoWorks = !!document.createElement('video').canPlayType;
if (videoWorks) {
	video.controls = false
	videoControls.classList.remove('hidden');
}

// Add functions here

// togglePlay toggles the playback state of the video.
// If the video playback is paused or ended, the video is played
// otherwise, the video is paused
function togglePlay() {
	if (video.paused || video.ended) {
		video.play();
	} else {
		video.pause();
	}
}

function AddClass(tag, className) {
	if (!tag.classList.contains(className)) {
		tag.classList.add(className)
	}
}

function RemoveClass(tag, className) {
	if (tag.classList.contains(className)) {
		tag.classList.remove(className)
	}
}

// updatePlayButton updates the playback icon and tooltip
// depending on the playback state
function updatePlayButton() {
	let fns = [];
	// playbackIcons.forEach(icon => {
	// 	console.log(icon);
	// 	icon.classList.toggle('hidden')
	// });

	if (video.paused) {
		fns = [ AddClass, RemoveClass, RemoveClass, AddClass ];
		playButton.setAttribute('data-title', 'Play')
	} else {
		fns = [RemoveClass , AddClass, AddClass, RemoveClass ];
		playButton.setAttribute('data-title', 'Pause')
	}
	playbackIcons.forEach((icon, idx) => fns[idx](icon, "hidden"))
}

// formatTime takes a time length in seconds and returns the time in
// minutes and seconds
function formatTime(timeInSeconds) {
	const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
	return {
		hours: result.substr(0, 2),
		minutes: result.substr(3, 2),
		seconds: result.substr(6, 2),
	};
};

// initializeVideo sets the video duration, and maximum value of the
// progressBar
function initializeVideo() {
	// const videoDuration = Math.round(video.duration);
	// console.log({ videoDuration})
	// seek.setAttribute('max', videoDuration);
	// progressBar.setAttribute('max', videoDuration);
	// const time = formatTime(videoDuration);
	// duration.innerText = `${time.minutes}:${time.seconds}`;
	// duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)

	const videoDuration = Math.round(video.duration);
	seek.setAttribute('max', videoDuration);
	progressBar.setAttribute('max', videoDuration);
	const time = formatTime(videoDuration);
	duration.innerText = (time.hours == '00' && false) ? `${time.minutes}:${time.seconds}` : `${time.hours}:${time.minutes}:${time.seconds}`;
	duration.setAttribute('datetime', (time.hours == '00' && false) ? `${time.minutes}m ${time.seconds}s` : `${time.hours}h ${time.minutes}m ${time.seconds}s `)
}

// updateTimeElapsed indicates how far through the video
// the current playback is by updating the timeElapsed element
function updateTimeElapsed() {
	const time = formatTime(Math.round(video.currentTime));
	// timeElapsed.innerText = `${time.hours}:${time.minutes}:${time.seconds}`;
	// timeElapsed.setAttribute('datetime', `${time.hours}h ${time.minutes}m ${time.seconds}s`)
	timeElapsed.innerText = (time.hours == '00' && false) ? `${time.minutes}:${time.seconds}` : `${time.hours}:${time.minutes}:${time.seconds}`;
	timeElapsed.setAttribute('datetime', (time.hours == '00' && false) ? `${time.minutes}m ${time.seconds}s` : `${time.hours}h ${time.minutes}m ${time.seconds}s `)
}

// updateProgress indicates how far through the video
// the current playback is by updating the progress bar
function updateProgress() {
	seek.value = Math.floor(video.currentTime);
	progressBar.value = Math.floor(video.currentTime);
}

// updateSeekTooltip uses the position of the mouse on the progress bar to
// roughly work out what point in the video the user will skip to if
// the progress bar is clicked at that point
function updateSeekTooltip(event) {
	const skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
	seek.setAttribute('data-seek', skipTo)
	const t = formatTime(skipTo);
	seekTooltip.textContent = `${t.hours}:${t.minutes}:${t.seconds}`;
	const rect = video.getBoundingClientRect();
	seekTooltip.style.left = `${event.pageX - rect.left}px`;
}

// skipAhead jumps to a different point in the video when the progress bar
// is clicked
function skipAhead(event) {
	const skipTo = event.target.dataset.seek
		? event.target.dataset.seek
		: event.target.value;
	video.currentTime = skipTo;
	progressBar.value = skipTo;
	seek.value = skipTo;
}

// updateVolume updates the video's volume
// and disables the muted state if active
function updateVolume() {
	if (video.muted) {
		video.muted = false;
	}

	// video.volume = volume.value;
	if (audioEnabled) {
		audio.gainNode.gain.value = volume.value;
	}
	else {
		video.volume = volume.value;
	}
}

// updateVolumeIcon updates the volume icon so that it correctly reflects
// the volume of the video
function updateVolumeIcon() {
	volumeIcons.forEach(icon => {
		icon.classList.add('hidden');
	});

	volumeButton.setAttribute('data-title', 'Mute')

	if (video.muted || video.volume === 0) {
		volumeMute.classList.remove('hidden');
		volumeButton.setAttribute('data-title', 'Unmute')
	} else if (video.volume > 0 && video.volume <= 0.5) {
		volumeLow.classList.remove('hidden');
	} else {
		volumeHigh.classList.remove('hidden');
	}
}

// toggleMute mutes or unmutes the video when executed
// When the video is unmuted, the volume is returned to the value
// it was set to before the video was muted
function toggleMute() {
	video.muted = !video.muted;

	if (video.muted) {
		volume.setAttribute('data-volume', volume.value);
		volume.value = 0;
	} else {
		volume.value = volume.dataset.volume;
	}
}

// animatePlayback displays an animation when
// the video is played or paused
function animatePlayback() {
		playbackAnimation.animate([
			{
				opacity: 1,
				transform: "scale(1)",
			},
			{
				opacity: 0,
				transform: "scale(1.3)",
			}
		], {
			duration: 500,
		});
}

// toggleFullScreen toggles the full screen state of the video
// If the browser is currently in fullscreen mode,
// then it must be exited and vice versa.
function toggleFullScreen() {
	if (document.fullscreenElement) {
		document.exitFullscreen();
		if (videoControls.classList.contains('top2')) {
			videoControls.classList.remove('top2');
			videoControls.classList.add('top1');
		}
	} else {
		videoContainer.requestFullscreen();
		if (videoControls.classList.contains('top1')) {
			videoControls.classList.remove('top1');
			videoControls.classList.add('top2');
		}
	}

}

// updateFullscreenButton changes the icon of the full screen button
// and tooltip to reflect the current full screen state of the video
function updateFullscreenButton() {
	fullscreenIcons.forEach(icon => icon.classList.toggle('hidden'));

	if (document.fullscreenElement) {
		fullscreenButton.setAttribute('data-title', 'Exit full screen')
	} else {
		fullscreenButton.setAttribute('data-title', 'Full screen')
	}
}

// togglePip toggles Picture-in-Picture mode on the video
async function togglePip() {
	try {
		if (video !== document.pictureInPictureElement) {
			pipButton.disabled = true;
			await video.requestPictureInPicture();
		} else {
			await document.exitPictureInPicture();
		}
	} catch (error) {
		console.error(error)
	} finally {
		pipButton.disabled = false;
	}
}

// hideControls hides the video controls when not in use
// if the video is paused, the controls must remain visible
function hideControls() {
	if (video.paused) {
		return;
	}

	videoControls.classList.add('hide');
}

// showControls displays the video controls
function showControls() {
	videoControls.classList.remove('hide');
}

let keepControlsVisible = 0;
let canIntervalStart = true;
let keyPressed = null;

// keyboardShortcuts executes the relevant functions for
// each supported shortcut key
function keyboardShortcuts(event) {
	let showTempControls = false;
	const { key, keyCode } = event;
	switch(keyCode) {
		case 32: // Spazio
			togglePlay();
			animatePlayback();
			if (video.paused) {
				showControls();
			} else {
				setTimeout(() => {
					hideControls();
				}, 2000);
			}
			break;
		case 77: // M
			toggleMute();
			break;
		case 70: // F
			toggleFullScreen();
			break;
		case 27: // ESC
			if (document.fullscreenElement) {
				document.exitFullscreen();
				if (videoControls.classList.contains('top2')) {
					videoControls.classList.remove('top2');
					videoControls.classList.add('top1');
				}
			}
			break;
		case 80: // P
			togglePip();
			break;
		case 37: // ArrowLeft
			let skipLs = 5;
			video.currentTime = (video.currentTime - skipLs > 0) ? video.currentTime - skipLs : 0;
			updateProgress();
			updateTimeElapsed();
			showTempControls = true;
			break;
		case 39: // ArrowRight
			let skipRs = 5;
			video.currentTime = (video.currentTime + skipRs < video.duration) ? video.currentTime + skipRs : video.duration;
			updateProgress();
			updateTimeElapsed();
			showTempControls = true;
			break;
		case 38: // ArrowUp
			volume.value = ((volume.value * 1) + (volume.step * 1) < (volume.max * 1)) ?
							(volume.value * 1) + (volume.step * 1) : (volume.max * 1);
			updateVolume();
			showTempControls = true;
			break;
		case 40: // ArrowDown
			volume.value = ((volume.value * 1) - (volume.step * 1) > (volume.min * 1)) ?
							(volume.value * 1) - (volume.step * 1) : (volume.min * 1);
			updateVolume();
			showTempControls = true;
			break;
		default:
			console.log({ key, keyCode });
			break;
	}
	if (showTempControls) {
		keyPressed = Date.now();
		if (canIntervalStart) {
			canIntervalStart = false;
			keepControlsVisible = setInterval(() => {
				let offset = 1000 * 2;
				let diff = Date.now() - keyPressed;
				if (diff > offset) {
					clearInterval(keepControlsVisible);
					hideControls();
					keyPressed = null;
					canIntervalStart = true;
				}
				else {
					showControls();
				}
			}, 50);
		}
	}
}

// Add eventlisteners here
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
// video.addEventListener('loadeddata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('volumechange', updateVolumeIcon);
video.addEventListener('click', togglePlay);
video.addEventListener('dblclick', toggleFullScreen);
video.addEventListener('click', animatePlayback);
video.addEventListener('mouseenter', showControls);
video.addEventListener('mouseleave', hideControls);
videoControls.addEventListener('mouseenter', showControls);
videoControls.addEventListener('mouseleave', hideControls);
seek.addEventListener('mousemove', updateSeekTooltip);
seek.addEventListener('input', skipAhead);
volume.addEventListener('input', updateVolume);
volumeButton.addEventListener('click', toggleMute);
fullscreenButton.addEventListener('click', toggleFullScreen);
videoContainer.addEventListener('fullscreenchange', updateFullscreenButton);
pipButton.addEventListener('click', togglePip);

videoControls.classList.add('bottom');

document.addEventListener('DOMContentLoaded', () => {
	if (!('pictureInPictureEnabled' in document)) {
		pipButton.classList.add('hidden');
	}
});

window.addEventListener('keydown', (e) => {
    if (e.target.localName != 'input') {   // if you need to filter <input> elements
        switch (e.keyCode) {
            case 37: // left
            case 39: // right
                e.preventDefault();
                break;
            case 38: // up
            case 40: // down
                e.preventDefault();
                break;
			case 32: // Space
				e.preventDefault();
				break;
            default:
                break;
        }
    }
}, {
    capture: true,   // this disables arrow key scrolling in modern Chrome
    passive: false   // this is optional, my code works without it
});

video.addEventListener('keydown', keyboardShortcuts);

async function watchVideo(url, isUrl=true, isSub=false) {
	if (!video.paused) {
		updatePlayButton();
	}
	return new Promise((resolve) => {
		if (!video.hasAttribute('tabindex')) {
			video.setAttribute('tabindex', '-1');
			video.focus();
		}
		let container = document.getElementById('video-container');
		if (container.hasAttribute('style')) {
			container.removeAttribute('style');
		}
		if (isSub) {
			if (!videoControls.classList.contains('top1')) {
				if (videoControls.classList.contains('bottom')) {
					videoControls.classList.remove('bottom');
				}
				videoControls.classList.add('top1');
			}
		}
		else {
			if (!videoControls.classList.contains('bottom')) {
				if (videoControls.classList.contains('top1')) {
					videoControls.classList.remove('top1');
				}
				videoControls.classList.add('bottom');
			}
		}
		if (!video.paused) {
			updatePlayButton()
		}
		video.setAttribute('src', (isUrl) ? url : `http://localhost:8877/stream/${url}`);
		video.onloadeddata = () => {
			// setTimeout(() => {
				initializeVideo();
				// volume.value = 0.25;
				// updateVolume();
				resolve(video.getAttribute('src'));
			// }, 200)
		}
	})
}

function setVideoTitle(title) {
	videoTitle.innerHTML = title;
}

function removeVideoTitle() {
	videoTitle.innerHTML = '';
}
