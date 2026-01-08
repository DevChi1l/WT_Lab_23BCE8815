document.addEventListener('DOMContentLoaded', function() {
    // Audio player setup
    const audio = document.getElementById('audioPlayer');
    const audioPlay = document.getElementById('audioPlay');
    const audioPause = document.getElementById('audioPause');
    const audioMute = document.getElementById('audioMute');
    const audioVolume = document.getElementById('audioVolume');
    const audioTime = document.getElementById('audioTime');
    const audioDuration = document.getElementById('audioDuration');
    const audioFile = document.getElementById('audioFile');
    const audioFileName = document.getElementById('audioFileName');
    
    // Video player setup
    const video = document.getElementById('videoPlayer');
    const videoPlay = document.getElementById('videoPlay');
    const videoPause = document.getElementById('videoPause');
    const videoMute = document.getElementById('videoMute');
    const videoVolume = document.getElementById('videoVolume');
    const videoTime = document.getElementById('videoTime');
    const videoDuration = document.getElementById('videoDuration');
    const videoFile = document.getElementById('videoFile');
    const videoFileName = document.getElementById('videoFileName');
    
    // Format time from seconds to MM:SS
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Update time display
    function updateTimeDisplay(element, currentTime, duration) {
        element.textContent = formatTime(currentTime);
        return formatTime(duration);
    }
    
    // Initialize durations
    audio.addEventListener('loadedmetadata', function() {
        audioDuration.textContent = updateTimeDisplay(audioTime, 0, audio.duration);
    });
    
    video.addEventListener('loadedmetadata', function() {
        videoDuration.textContent = updateTimeDisplay(videoTime, 0, video.duration);
    });
    
    // Audio file selection
    audioFile.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            audioFileName.textContent = file.name;
            audio.src = URL.createObjectURL(file);
            audio.load();
            
            audio.addEventListener('loadedmetadata', function() {
                audioDuration.textContent = formatTime(audio.duration);
            });
        }
    });
    
    // Video file selection
    videoFile.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            videoFileName.textContent = file.name;
            video.src = URL.createObjectURL(file);
            video.load();
            
            video.addEventListener('loadedmetadata', function() {
                videoDuration.textContent = formatTime(video.duration);
            });
        }
    });
    
    // Audio controls
    audioPlay.addEventListener('click', function() {
        audio.play();
    });
    
    audioPause.addEventListener('click', function() {
        audio.pause();
    });
    
    audioMute.addEventListener('click', function() {
        audio.muted = !audio.muted;
        audioMute.textContent = audio.muted ? '🔇 Muted' : '🔊 Volume';
    });
    
    audioVolume.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });
    
    // Update audio time
    audio.addEventListener('timeupdate', function() {
        audioTime.textContent = formatTime(audio.currentTime);
    });
    
    // Video controls
    videoPlay.addEventListener('click', function() {
        video.play();
    });
    
    videoPause.addEventListener('click', function() {
        video.pause();
    });
    
    videoMute.addEventListener('click', function() {
        video.muted = !video.muted;
        videoMute.textContent = video.muted ? '🔇 Muted' : '🔊 Volume';
    });
    
    videoVolume.addEventListener('input', function() {
        video.volume = this.value / 100;
    });
    
    // Update video time
    video.addEventListener('timeupdate', function() {
        videoTime.textContent = formatTime(video.currentTime);
    });
});