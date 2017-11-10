/* Global Variables */
var mediaPlayer;
var playPauseBtn;
var progressBar;


// Wait for the DOM to be loaded before initialising the media player
document.addEventListener("DOMContentLoaded", function () {
    initialiseMediaPlayer();
}, false);

/*
 * Initialization of the HTML5 media player
 */
function initialiseMediaPlayer() {

    try {
        // Get a handle to the player
        mediaPlayer = document.getElementById('media-video');

        // Get handles to each of the buttons and required elements
        playPauseBtn = document.getElementById('play-pause-button');
        progressBar = document.getElementById('progress-bar');

        // Hide the browser's default controls
        mediaPlayer.controls = true;

        // Add a listener for the timeupdate event so we can update the progress bar
        mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
        mediaPlayer.addEventListener('ended', function () {
            this.pause();
            saveCompletion();
        }, false);

    }
    catch (err) {

        // console.log(err.message);
        
    }

}

/*
 * Toggle between PLAY/PAUSE
 */
function togglePlayPause() {
    // If the mediaPlayer is currently paused or has ended
    if (mediaPlayer.paused || mediaPlayer.ended) {
        // Change the button to be a pause button
        // changeButtonType(playPauseBtn, 'pause');
        swapPlayPauseBtn('play');
        // Play the media
        mediaPlayer.play();
    }
    // Otherwise it must currently be playing
    else {
        // Change the button to be a play button
        // changeButtonType(playPauseBtn, 'play');
        swapPlayPauseBtn('pause');

        // Pause the media
        mediaPlayer.pause();
    }
}

/*
 * Swap the play/pause button glyphicon
 */
function swapPlayPauseBtn(command) {

    switch (command) {
        case 'play':
            document.getElementById('playbtn').className = 'glyphicon glyphicon-pause';
            break;
        case 'pause':
            document.getElementById('playbtn').className = 'glyphicon glyphicon-play';
            break;
    }

}

/*
 * Stop the current media from playing, and return it to the start position
 */
function stopPlayer() {
    mediaPlayer.pause();
    mediaPlayer.currentTime = 0;
    document.getElementById('playbtn').className = 'glyphicon glyphicon-play';

}

/*
 * Changes the volume on the media player
 */
function changeVolume(direction) {
    if (direction === '+')
        mediaPlayer.volume += mediaPlayer.volume === 1 ? 0 : 0.1;
    else
        mediaPlayer.volume -= (mediaPlayer.volume === 0 ? 0 : 0.1);
    mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}

/*
 * Replays the media currently loaded in the player
 */
function replayMedia() {
    resetPlayer();
    mediaPlayer.play();
}

/*
 * Update the progress bar
 */
function updateProgressBar() {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
    // Update the progress bar's value
    progressBar.value = percentage;
    // Update the progress bar's text (for browsers that don't support the progress element)
    progressBar.innerHTML = percentage + '% played';
}

/*
 * Updates a button's title, innerHTML and CSS class to a certain value (outdated)
 */
function changeButtonType(btn, value) {
    btn.title = value;
    btn.innerHTML = value;
    btn.className = value;
}

/*
 *  Loads a video item into the media player
 */
function loadVideo() {
    for (var i = 0; i < arguments.length; i++) {
        var file = arguments[i].split('.');
        var ext = file[file.length - 1];
        // Check if this media can be played
        if (canPlayVideo(ext)) {
            // Reset the player, change the source file and load it
            resetPlayer();
            mediaPlayer.src = arguments[i];
            mediaPlayer.load();
            break;
        }
    }
}

/*
 * Checks if the browser can play this particular type of file or not
 */
function canPlayVideo(ext) {
    var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
    if (ableToPlay === '')
        return false;
    else
        return true;
}

/*
 * Resets the media player
 */
function resetPlayer() {
    // Reset the progress bar to 0
    progressBar.value = 0;
    // Move the media back to the start
    mediaPlayer.currentTime = ;
    // Ensure that the play pause button is set as 'play'
    changeButtonType(playPauseBtn, 'play');
}
