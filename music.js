/**
 * Saints n' Sinners - Premium Music Experience
 * Playlist Module - "After The Halo"
 */

const playlist = [
    {
        id: 1,
        title: "Friday In The City",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/S%26S_afterTheHalo/09_S%26S_FridayInTheCity.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/Saturday.jpg"
    },
    {
        id: 2,
        title: "AmaSaints & Sinners",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/TheFirstSaint/02AmaSaints%26Sinners.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/Wednesday.jpg"
    },
    {
        id: 3,
        title: "Saints Flow Sinners",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/TheFirstSaint/05SaintsFlowSinners.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/Thursday.jpg"
    },
    {
        id: 4,
        title: "No Empty VIP",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/S%26S_afterTheHalo/06_S%26S_NoEmptyVIP.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Menu/Main.jpg"
    },
    {
        id: 5,
        title: "Sweet Joina City Spot",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/TheFirstSaint/08SweetJoinaCity_Spot.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Menu/Appetizers.jpg"
    },
    {
        id: 6,
        title: "Soft Lipstick Signals",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/S%26S_afterTheHalo/08_S%26S_SoftLipstickSignals.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Menu/Cocktails.jpg"
    },
    {
        id: 7,
        title: "Neon Conversations",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/S%26S_afterTheHalo/11_S%26S_NeonConversations.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Menu/Main.jpg"
    },
    {
        id: 8,
        title: "PayDay Feelings",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/S%26S_afterTheHalo/12_S%26S_PayDayFeelings.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/Saturday.jpg"
    },
    {
        id: 9,
        title: "Half Past Noon",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/saints-after-sunrise/04S%26S_HalfPastNoon.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Menu/Cocktails.jpg"
    },
    {
        id: 10,
        title: "Rise & Sin",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/saints-after-sunrise/06S%26S_Rise%26Sin.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/Wednesday.jpg"
    },
    {
        id: 11,
        title: "Golden Motif",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/saints-after-sunrise/02S%26S_GoldenMotif.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/Saturday.jpg"
    },
    {
        id: 12,
        title: "Sin City Stack",
        artist: "Saints n’ Sinners",
        url: "https://pub-e81a254724df4bfaa01f780b72af68c4.r2.dev/saints%26sinners/saints-after-sunrise/10S%26S_SinCityStack.mp3",
        cover: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/Thursday.jpg"
    }
];

// Audio State
let audio = new Audio();
let currentTrackIndex = -1;
let isPlaying = false;

// DOM Elements
const trackListEl = document.getElementById('track-list');
const heroPlayBtn = document.getElementById('hero-play-btn');
const heroPlayIcon = document.getElementById('hero-play-icon');
const heroPauseIcon = document.getElementById('hero-pause-icon');
const playerArtwork = document.getElementById('player-artwork');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');
const playPauseBtn = document.getElementById('play-pause');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const eqAnimation = document.getElementById('eq-animation');
const miniPlayer = document.getElementById('mini-player');

// Initialize Playlist UI
function initPlaylist() {
    trackListEl.innerHTML = '';
    playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'track-item';
        item.innerHTML = `
            <div class="active-indicator"></div>
            <div class="track-number">${(index + 1).toString().padStart(2, '0')}</div>
            <div class="track-details">
                <div class="track-name">${track.title}</div>
                <div class="track-artist">${track.artist}</div>
            </div>
            <div class="track-actions">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1" fill="currentColor"></circle>
                    <circle cx="12" cy="5" r="1" fill="currentColor"></circle>
                    <circle cx="12" cy="19" r="1" fill="currentColor"></circle>
                </svg>
            </div>
        `;
        item.addEventListener('click', () => loadTrack(index, true));
        trackListEl.appendChild(item);
    });
}

// Load and Play Track
function loadTrack(index, autoPlay = false) {
    if (index === currentTrackIndex) {
        togglePlay();
        return;
    }

    currentTrackIndex = index;
    const track = playlist[index];

    audio.src = track.url;
    audio.load();

    // Update UI
    playerTitle.textContent = track.title;
    playerArtist.textContent = track.artist;
    playerArtwork.style.backgroundImage = `url('${track.cover}')`;
    
    // Update active state in list
    const items = document.querySelectorAll('.track-item');
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });

    miniPlayer.classList.add('active');

    if (autoPlay) {
        playTrack();
    }
}

function playTrack() {
    audio.play().then(() => {
        isPlaying = true;
        updatePlayUI();
    }).catch(err => console.error("Playback failed:", err));
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    updatePlayUI();
}

function togglePlay() {
    if (currentTrackIndex === -1) {
        loadTrack(0, true);
        return;
    }
    
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

function updatePlayUI() {
    if (isPlaying) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        if (heroPlayIcon) heroPlayIcon.style.display = 'none';
        if (heroPauseIcon) heroPauseIcon.style.display = 'block';
        
        eqAnimation.classList.add('playing');
        miniPlayer.style.borderColor = 'var(--accent-gold)';
        miniPlayer.style.boxShadow = '0 10px 40px rgba(255, 204, 51, 0.2)';
    } else {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        if (heroPlayIcon) heroPlayIcon.style.display = 'block';
        if (heroPauseIcon) heroPauseIcon.style.display = 'none';

        eqAnimation.classList.remove('playing');
        miniPlayer.style.borderColor = 'var(--glass-border)';
        miniPlayer.style.boxShadow = '0 10px 40px rgba(0,0,0,0.8)';
    }
}

// Audio Events
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progress}%`;
    }
});

audio.addEventListener('ended', () => {
    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlist.length) nextIndex = 0;
    loadTrack(nextIndex, true);
});

// Progress Bar Seeking
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
});

// Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
if (heroPlayBtn) {
    heroPlayBtn.addEventListener('click', togglePlay);
}

// Initial Atmosphere Motion
function atmosphericMotion() {
    const atmosphere = document.querySelector('.music-atmosphere');
    let angle = 0;

    function animate() {
        angle += 0.005;
        const x = 50 + Math.sin(angle) * 10;
        const y = -20 + Math.cos(angle * 0.8) * 10;
        atmosphere.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255, 204, 51, 0.08) 0%, transparent 70%)`;
        requestAnimationFrame(animate);
    }
    animate();
}

// Boot
window.onload = () => {
    initPlaylist();
    atmosphericMotion();
};
