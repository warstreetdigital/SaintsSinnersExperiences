// Saints n' Sinners | Official Events Experience
// Architecture: Data-Driven, Mobile-First, Performance-Optimized

const EVENTS_DATA = [
    {
        id: "munhumutapa-day",
        name: "Munhumutapa Day",
        dateString: "Tuesday 15 September 2026",
        dayName: "TUESDAY",
        dayNum: 15,
        month: "SEPTEMBER",
        year: 2026,
        category: "Cultural Celebration",
        tag: "Holiday Special",
        posterUrl: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/saints_n_sinners_munhumutapa_day.webp",
        filename: "saints_n_sinners_munhumutapa_day.webp",
        description: "Official celebration honoring heritage, culture, and high-vibe nightlife at Saints n' Sinners.",
        status: "archive",
        badge: "15 SEP",
        accentColor: "rgba(255, 180, 50, 0.25)"
    },
    {
        id: "diva-dayout",
        name: "Diva Dayout",
        dateString: "Wednesday 16 September 2026",
        dayName: "WEDNESDAY",
        dayNum: 16,
        month: "SEPTEMBER",
        year: 2026,
        category: "Wednesday Nightlife",
        tag: "Ladies & Divas",
        posterUrl: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/saints_sinners_wednesday_16_september_2026.webp",
        filename: "saints_sinners_wednesday_16_september_2026.webp",
        description: "The premier mid-week ritual celebrating elegance, cocktails, and seductive sounds. Featuring top resident DJs.",
        status: "tonight",
        badge: "TONIGHT • 16 SEP",
        isTonight: true,
        accentColor: "rgba(200, 255, 100, 0.25)"
    },
    {
        id: "karaoke-and-chaos",
        name: "Karaoke and Chaos",
        dateString: "Thursday 17 September 2026",
        dayName: "THURSDAY",
        dayNum: 17,
        month: "SEPTEMBER",
        year: 2026,
        category: "Live Entertainment",
        tag: "Vocals & Cocktails",
        posterUrl: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/saints_n_sinners_karaoke_and_chaos.webp",
        filename: "saints_n_sinners_karaoke_and_chaos.webp",
        description: "Unleash your inner superstar or soak in the madness. High-energy karaoke, craft cocktails, and unscripted nightlife.",
        status: "upcoming",
        badge: "THU 17 SEP",
        accentColor: "rgba(230, 50, 255, 0.25)"
    },
    {
        id: "aphrodisiac-fridays",
        name: "Aphrodisiac Fridays",
        dateString: "Friday 18 September 2026",
        dayName: "FRIDAY",
        dayNum: 18,
        month: "SEPTEMBER",
        year: 2026,
        category: "Weekend Ignition",
        tag: "Seductive Grooves",
        posterUrl: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/saints_n_sinners_aphrodisiac_fridays.webp",
        filename: "saints_n_sinners_aphrodisiac_fridays.webp",
        description: "Ignite your weekend with seductive rhythms, premium mixology, and an electrifying atmosphere until late.",
        status: "weekend",
        badge: "FRI 18 SEP",
        isWeekend: true,
        accentColor: "rgba(255, 60, 100, 0.25)"
    },
    {
        id: "baddies-bottles",
        name: "Baddies & Bottles Saturday",
        dateString: "Saturday 19 September 2026",
        dayName: "SATURDAY",
        dayNum: 19,
        month: "SEPTEMBER",
        year: 2026,
        category: "VIP Nightlife",
        tag: "Bottles & Champagne",
        posterUrl: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/saints_n_sinners_baddies_bottles_saturday.webp",
        filename: "saints_n_sinners_baddies_bottles_saturday.webp",
        description: "The peak of weekend luxury. Exclusive bottle service, elevated VIP booths, and high-octane celebration.",
        status: "weekend",
        badge: "SAT 19 SEP",
        isWeekend: true,
        accentColor: "rgba(255, 140, 0, 0.25)"
    },
    {
        id: "felt-naughty-sunday",
        name: "Felt Naughty Sunday",
        dateString: "Sunday 20 September 2026",
        dayName: "SUNDAY",
        dayNum: 20,
        month: "SEPTEMBER",
        year: 2026,
        category: "Sunday Session",
        tag: "Beats, Chill & Shisha",
        posterUrl: "https://pub-e10a28ca38cf452da437555e0f90e288.r2.dev/saints%26sinners/Events/saints_n_sinners_felt_naughty_sunday.webp",
        filename: "saints_n_sinners_felt_naughty_sunday.webp",
        description: "Close the week in style with laid-back luxury, shisha, craft cocktails, and deep soulful beats.",
        status: "weekend",
        badge: "SUN 20 SEP",
        isWeekend: true,
        accentColor: "rgba(180, 100, 255, 0.25)"
    }
];

// Application State
let currentFilter = 'all';
let currentLightboxIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    renderEvents();
    initFilters();
    initLightboxEvents();
    initCountdown();
});

/**
 * Ambient Particles for Nightlife Atmosphere
 */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const count = 18;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'ambient-particle';
        const size = Math.random() * 2.5 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        const duration = 12 + Math.random() * 18;
        const delay = Math.random() * -20;
        p.style.animation = `ambientFloat ${duration}s linear ${delay}s infinite`;
        p.style.opacity = (Math.random() * 0.3 + 0.1).toFixed(2);
        container.appendChild(p);
    }
}

/**
 * Render Events Grid based on Filter
 */
function renderEvents() {
    const grid = document.getElementById('events-grid');
    if (!grid) return;

    let filtered = EVENTS_DATA;
    if (currentFilter === 'tonight') {
        filtered = EVENTS_DATA.filter(e => e.isTonight);
    } else if (currentFilter === 'upcoming') {
        filtered = EVENTS_DATA.filter(e => e.status === 'upcoming' || e.status === 'weekend');
    } else if (currentFilter === 'weekend') {
        filtered = EVENTS_DATA.filter(e => e.isWeekend);
    }

    grid.innerHTML = filtered.map((event) => {
        const globalIndex = EVENTS_DATA.findIndex(e => e.id === event.id);
        const isTonight = event.isTonight;
        
        return `
            <article class="event-card ${isTonight ? 'is-tonight' : ''}" id="event-card-${event.id}">
                <div class="poster-frame" onclick="openLightbox(${globalIndex})" role="button" tabindex="0" aria-label="View poster for ${event.name}">
                    <img class="poster-blur-backdrop" src="${event.posterUrl}" alt="" loading="lazy" aria-hidden="true" />
                    <img class="poster-image" src="${event.posterUrl}" alt="Official poster for ${event.name}" loading="lazy" width="400" height="500" onerror="handleImageError(this)" />
                    
                    <div class="poster-badge ${isTonight ? 'badge-tonight' : ''}">
                        ${isTonight ? '<span class="pulse-dot"></span>' : ''}
                        <span>${event.badge}</span>
                    </div>

                    <div class="poster-hover-overlay">
                        <span class="view-poster-btn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            View Full Poster
                        </span>
                    </div>
                </div>

                <div class="event-details">
                    <div class="event-meta-bar">
                        <span class="event-category-tag">${event.category}</span>
                        <span class="event-tag">${event.tag}</span>
                    </div>

                    <h2 class="event-name">${event.name}</h2>
                    
                    <p class="event-date-row">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span>${event.dateString}</span>
                    </p>

                    <p class="event-desc">${event.description}</p>

                    <div class="event-action-group">
                        <button class="action-btn btn-view" onclick="openLightbox(${globalIndex})" aria-label="Expand poster for ${event.name}">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            View Poster
                        </button>
                        <button class="action-btn btn-share" onclick="shareEvent(${globalIndex})" aria-label="Share ${event.name}">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                            Share
                        </button>
                        <a href="https://www.instagram.com/saints_n_sinners_zw?igsh=MW9jYWIwOXR0YjVmZg==" target="_blank" rel="noopener noreferrer" class="action-btn btn-rsvp" aria-label="Join the night on Instagram">
                            Join Night →
                        </a>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

/**
 * Filter Tabs Control
 */
function initFilters() {
    const buttons = document.querySelectorAll('.filter-pill');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter || 'all';
            renderEvents();
        });
    });
}

/**
 * Lightbox Modal Controls
 */
function openLightbox(index) {
    if (index < 0 || index >= EVENTS_DATA.length) return;
    currentLightboxIndex = index;
    updateLightboxContent();

    const modal = document.getElementById('poster-lightbox');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const modal = document.getElementById('poster-lightbox');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % EVENTS_DATA.length;
    updateLightboxContent();
}

function prevLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + EVENTS_DATA.length) % EVENTS_DATA.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const event = EVENTS_DATA[currentLightboxIndex];
    if (!event) return;

    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const date = document.getElementById('lightbox-date');
    const counter = document.getElementById('lightbox-counter');
    const tag = document.getElementById('lightbox-tag');
    const shareBtn = document.getElementById('lightbox-share-btn');

    if (img) {
        img.src = event.posterUrl;
        img.alt = `Official event poster for ${event.name}`;
    }
    if (title) title.innerText = event.name;
    if (date) date.innerText = event.dateString;
    if (tag) tag.innerText = `${event.category} • ${event.tag}`;
    if (counter) counter.innerText = `${currentLightboxIndex + 1} of ${EVENTS_DATA.length}`;
    if (shareBtn) {
        shareBtn.onclick = () => shareEvent(currentLightboxIndex);
    }
}

function initLightboxEvents() {
    const modal = document.getElementById('poster-lightbox');
    if (!modal) return;

    // Close when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-backdrop')) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
    });

    // Touch swipe support for mobile
    const content = document.querySelector('.lightbox-content');
    if (content) {
        content.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        content.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
}

function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
        if (diff < 0) {
            nextLightbox(); // swipe left -> next
        } else {
            prevLightbox(); // swipe right -> prev
        }
    }
}

/**
 * Native Web Share API with Clipboard Fallback
 */
async function shareEvent(index) {
    const event = EVENTS_DATA[index];
    if (!event) return;

    const shareData = {
        title: `Saints n' Sinners | ${event.name}`,
        text: `Join us at Saints n' Sinners for ${event.name} on ${event.dateString}!`,
        url: window.location.href.split('#')[0] + `#event-card-${event.id}`
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return;
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.log('Share dismissed or unavailable, falling back to copy');
            } else {
                return;
            }
        }
    }

    // Fallback: Copy link to clipboard
    try {
        await navigator.clipboard.writeText(shareData.url);
        showToast(`Link for ${event.name} copied to clipboard!`);
    } catch {
        showToast(`Event: ${event.name} • ${event.dateString}`);
    }
}

/**
 * Toast Notification
 */
function showToast(message) {
    let toast = document.getElementById('events-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'events-toast';
        toast.className = 'events-toast';
        document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.add('visible');
    setTimeout(() => {
        toast.classList.remove('visible');
    }, 3200);
}

/**
 * Image Error Fallback
 */
function handleImageError(img) {
    img.onerror = null;
    img.style.background = '#151515';
    img.alt = 'Poster currently loading';
}

/**
 * Live Countdown Engine for Tonight's Event
 */
function initCountdown() {
    const timerElement = document.getElementById('tonight-timer');
    if (!timerElement) return;

    function update() {
        const now = new Date();
        // Target: Wednesday 16 September 2026, 8:00 PM (20:00)
        const target = new Date(2026, 8, 16, 20, 0, 0); // Note: month is 0-indexed (8 = Sept)
        
        let diff = target.getTime() - now.getTime();
        if (diff <= 0) {
            timerElement.innerText = "DOORS OPEN • TONIGHT";
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);

        timerElement.innerText = `${hours.toString().padStart(2, '0')}H ${mins.toString().padStart(2, '0')}M ${secs.toString().padStart(2, '0')}S`;
    }

    update();
    setInterval(update, 1000);
}

// Global functions for inline HTML event handlers
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.nextLightbox = nextLightbox;
window.prevLightbox = prevLightbox;
window.shareEvent = shareEvent;
window.handleImageError = handleImageError;
