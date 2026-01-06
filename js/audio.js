/**
 * StarryStories Web App - Audio Player
 * HTML5 Audio handling for story playback
 */

class AudioPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.duration = 0;
        this.currentTime = 0;
        this.onTimeUpdate = null;
        this.onEnded = null;
        this.onLoaded = null;
        this.targetPlaybackRate = 1.0; // Store target rate

        this._setupEventListeners();
    }

    _setupEventListeners() {
        this.audio.addEventListener('loadedmetadata', () => {
            this.duration = this.audio.duration;
            // Apply playback rate after metadata loads
            this.audio.playbackRate = this.targetPlaybackRate;
            console.log('🎵 Audio loaded, playback rate:', this.targetPlaybackRate);
            if (this.onLoaded) this.onLoaded(this.duration);
        });

        // Also apply on canplay to be safe
        this.audio.addEventListener('canplay', () => {
            this.audio.playbackRate = this.targetPlaybackRate;
        });

        this.audio.addEventListener('timeupdate', () => {
            this.currentTime = this.audio.currentTime;
            if (this.onTimeUpdate) {
                this.onTimeUpdate(this.currentTime, this.duration);
            }
        });

        this.audio.addEventListener('ended', () => {
            this.isPlaying = false;
            if (this.onEnded) this.onEnded();
        });

        this.audio.addEventListener('error', (e) => {
            console.error('Audio error:', e);
        });
    }

    /**
     * Load audio from URL
     * @param {string} url 
     * @param {number} playbackRate - Playback speed (0.5 for English, 0.2 for others)
     */
    load(url, playbackRate = 0.5) {
        this.targetPlaybackRate = playbackRate;
        this.audio.src = url;
        this.audio.playbackRate = playbackRate;
        console.log('🎵 Loading audio with rate:', playbackRate);
        this.audio.load();
    }

    /**
     * Play audio
     */
    async play() {
        try {
            // Ensure playback rate is set before playing
            this.audio.playbackRate = this.targetPlaybackRate;
            await this.audio.play();
            this.isPlaying = true;
        } catch (error) {
            console.error('Play failed:', error);
        }
    }

    /**
     * Pause audio
     */
    pause() {
        this.audio.pause();
        this.isPlaying = false;
    }

    /**
     * Toggle play/pause
     */
    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    /**
     * Seek to position
     * @param {number} time - Time in seconds
     */
    seek(time) {
        this.audio.currentTime = time;
    }

    /**
     * Seek by percentage
     * @param {number} percent - 0 to 1
     */
    seekPercent(percent) {
        this.audio.currentTime = this.duration * percent;
    }

    /**
     * Set volume
     * @param {number} volume - 0 to 1
     */
    setVolume(volume) {
        this.audio.volume = Math.max(0, Math.min(1, volume));
    }

    /**
     * Mute/unmute
     */
    toggleMute() {
        this.audio.muted = !this.audio.muted;
        return this.audio.muted;
    }

    /**
     * Get current progress as percentage
     * @returns {number} 0 to 100
     */
    getProgress() {
        if (this.duration === 0) return 0;
        return (this.currentTime / this.duration) * 100;
    }

    /**
     * Format time as MM:SS
     * @param {number} seconds 
     * @returns {string}
     */
    static formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Destroy player
     */
    destroy() {
        this.audio.pause();
        this.audio.src = '';
        this.audio = null;
    }
}

// Export
window.AudioPlayer = AudioPlayer;
