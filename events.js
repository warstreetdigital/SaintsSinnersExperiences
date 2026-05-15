// Saints n' Sinners | Events Module Business Logic

const billboardState = {
    currentIndex: 0,
    slides: document.querySelectorAll('.event-slide'),
    navDots: document.querySelectorAll('.nav-dot'),
    container: document.querySelector('.billboard-container'),
    interval: null,
    slideDuration: 10000 // 10 seconds for more cinematic drift
};

// Nightlife Energy Colors
const energyColors = [
    'rgba(200, 255, 100, 0.18)', // Wednesday - Green/Yellow
    'rgba(230, 50, 255, 0.18)',  // Thursday - Magenta/Purple
    'rgba(255, 120, 0, 0.15)'    // Saturday - Gold/Red
];

// Emotional Energy Profiles for each poster
const energyProfiles = [
    { // Wednesday: Smooth, Seductive, Slow
        driftSpeed: 0.12,
        pulseFreq: 0.8,
        parallaxMult: 0.8,
        glowBase: 0.96,
        hazeSpeed: 0.6
    },
    { // Thursday: Energetic, Sharp, Nightlife Rhythm
        driftSpeed: 0.35,
        pulseFreq: 3.0,
        parallaxMult: 1.4,
        glowBase: 0.88,
        hazeSpeed: 2.2
    },
    { // Saturday: Dominant, Heavy, Cinematic
        driftSpeed: 0.20,
        pulseFreq: 1.6,
        parallaxMult: 1.1,
        glowBase: 0.98,
        hazeSpeed: 1.2
    }
];

function updateAtmosphere(index) {
    if (billboardState.container) {
        billboardState.container.style.setProperty('--event-glow', energyColors[index]);
    }
}

/**
 * Weekly Recursive Countdown Engine
 * Calculates time remaining until the specific weekday and hour
 */
function getNextOccurrence(dayOfWeek, hour) {
    const now = new Date();
    let resultDate = new Date(now.getTime());
    
    // Set to the target day of current week
    resultDate.setDate(now.getDate() + (dayOfWeek + 7 - now.getDay()) % 7);
    resultDate.setHours(hour, 0, 0, 0);

    // If that occurrence has already passed today, jump to next week
    if (resultDate < now) {
        resultDate.setDate(resultDate.getDate() + 7);
    }
    
    return resultDate;
}

const eventSchedule = [
    { day: 3, hour: 20 }, // Wednesday 8PM
    { day: 4, hour: 21 }, // Thursday 9PM
    { day: 6, hour: 22 }  // Saturday 10PM
];

const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

function updateCountdown() {
    const currentEvent = eventSchedule[billboardState.currentIndex];
    const targetDate = getNextOccurrence(currentEvent.day, currentEvent.hour);
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const label = document.getElementById('countdown-label');
    const display = document.getElementById('timer-string');

    if (label && display) {
        label.innerText = `${dayNames[currentEvent.day]} IN`;
        display.innerText = `${days.toString().padStart(2, '0')}D ${hours.toString().padStart(2, '0')}H ${minutes.toString().padStart(2, '0')}M`;
    }
}

/**
 * Slide Transition Controller
 */
function switchSlide(index) {
    if (billboardState.currentIndex === index) return;

    // cinematic energy reaction
    if (billboardState.container) {
        billboardState.container.classList.add('trigger-flash');
        
        billboardState.container.style.transition = 'opacity 0.3s ease-in, filter 0.3s ease-in';
        billboardState.container.style.opacity = '1.3';
        billboardState.container.style.filter = 'brightness(1.6) saturate(1.8) contrast(1.1)';

        setTimeout(() => {
            billboardState.container.classList.remove('trigger-flash');
            billboardState.container.style.transition = 'opacity 2s ease-out, filter 2s ease-out';
            billboardState.container.style.opacity = '';
            billboardState.container.style.filter = '';
        }, 500); 
    }

    // 1. Fade out current content softly
    const currentSlide = document.querySelector('.event-slide.active');
    if (currentSlide) {
        currentSlide.style.opacity = '0';
        currentSlide.style.transition = 'opacity 0.8s ease-in';
    }

    // 2. Mid-transition: Update environmental energy to blend
    setTimeout(() => {
        updateAtmosphere(index);
    }, 300);

    // 3. Swap indices and refresh active states
    setTimeout(() => {
        billboardState.slides.forEach(s => {
            s.classList.remove('active');
            s.style.opacity = ''; 
            s.style.transition = '';
        });
        billboardState.navDots.forEach(d => d.classList.remove('active'));

        billboardState.currentIndex = index;
        const nextSlide = billboardState.slides[index];
        nextSlide.classList.add('active');
        billboardState.navDots[index].classList.add('active');
        
        // 4. Staggered reveal of new postercontent
        nextSlide.style.opacity = '0';
        
        // Force reflow
        nextSlide.offsetHeight;

        nextSlide.style.transition = 'opacity 1.8s ease-out';
        nextSlide.style.opacity = '1';
        
        updateCountdown();
    }, 450); 
}

function nextSlide() {
    let next = (billboardState.currentIndex + 1) % billboardState.slides.length;
    switchSlide(next);
}

/**
 * Billboard Atmosphere Controller
 */
function initAtmosphere() {
    const spotlight = document.querySelector('.spotlight');
    const spotlight2 = document.querySelector('.spotlight-secondary');
    const haze = document.getElementById('haze-layer');
    const flare = document.getElementById('flare-layer');
    const particles = document.getElementById('particles-layer');
    
    let angle = 0;
    let mouseX = 0;
    let mouseY = 0;
    let lastTime = performance.now();

    function update(currentTime) {
        const deltaTime = (currentTime - lastTime) / 1000;
        lastTime = currentTime;
        
        const profile = energyProfiles[billboardState.currentIndex];
        
        // Speed scaling based on time delta and profile drift speed
        angle += profile.driftSpeed * deltaTime; 
        
        // Cinematic Camera Breathing (Sway & Float)
        const driftSpeedMult = profile.driftSpeed * 1.5;
        const driftX = Math.sin(angle * 0.4) * 8;
        const driftY = Math.cos(angle * 0.35) * 5;
        const microSwayX = Math.sin(angle * 1.5) * 1.5;
        const microSwayY = Math.cos(angle * 1.2) * 1.0;
        
        const cameraSwayX = driftX + microSwayX;
        const cameraSwayY = driftY + microSwayY;
        const cameraTilt = Math.sin(angle * 0.3) * 0.8;
        
        // Breathing Depth (Slow Zoom)
        const breatheScale = 1.05 + Math.sin(angle * 0.2) * 0.025;
        
        // Combine Mouse Parallax with intensified Camera Sway
        const combinedX = (mouseX * 15) + cameraSwayX;
        const combinedY = (mouseY * 12) + cameraSwayY;

        // Primary Spotlight
        const x1 = 50 + Math.cos(angle) * 30;
        const y1 = 40 + Math.sin(angle * 0.8) * 20;
        const opacity1 = 0.06 + Math.sin(angle * 2) * 0.03;
        const size1 = 40 + Math.cos(angle * 0.5) * 10;
        
        if (spotlight) {
            const autoX = Math.cos(angle * 0.7) * 15;
            const autoY = Math.sin(angle * 0.5) * 10;
            spotlight.style.setProperty('--spot-x', `${50 + (mouseX * 30) + autoX}%`);
            spotlight.style.setProperty('--spot-y', `${40 + (mouseY * 20) + autoY}%`);
            spotlight.style.setProperty('--spot-opacity', opacity1);
            spotlight.style.setProperty('--spot-size', `${size1}%`);
        }

        // Secondary Spotlight (Phased)
        const x2 = 50 + Math.sin(angle * 0.6) * 40;
        const y2 = 60 + Math.cos(angle * 1.2) * 25;
        const opacity2 = 0.04 + Math.cos(angle * 1.5) * 0.02;
        
        if (spotlight2) {
            spotlight2.style.setProperty('--spot2-x', `${x2}%`);
            spotlight2.style.setProperty('--spot2-y', `${y2}%`);
            spotlight2.style.setProperty('--spot2-opacity', opacity2);
        }

        // Flare Drift
        if (flare) {
            const fx = 50 + Math.cos(angle * 0.3) * 40;
            const fy = 20 + Math.sin(angle * 0.4) * 15;
            flare.style.setProperty('--flare-x', `${fx}%`);
            flare.style.setProperty('--flare-y', `${fy}%`);
        }

        // Atmospheric Pulse (Dynamic Nightlife Heartbeat)
        if (billboardState.container) {
            const slowWave = Math.sin(angle * 0.8 * profile.pulseFreq) * 0.02;
            const fastWave = Math.sin(angle * 2.5 * profile.pulseFreq) * 0.03;
            const pulse = profile.glowBase + slowWave + fastWave;
            billboardState.container.style.opacity = pulse;
            
            const intensity = 0.8 + Math.sin(angle * 1.2) * 0.2;
            billboardState.container.style.filter = `contrast(${1 + intensity * 0.05})`;
        }

        // Cinematic Parallax Depth System
        const activeSlide = document.querySelector('.event-slide.active');
        const activeBg = activeSlide ? activeSlide.querySelector('.slide-bg') : null;
        const activeDepth = activeSlide ? activeSlide.querySelector('.slide-depth-overlay') : null;
        const activeHaze = activeSlide ? activeSlide.querySelector('.slide-haze-overlay') : null;

        const pm = profile.parallaxMult;

        if (activeBg) {
            // Apply scale + translation + tilt for that "filmed" perspective
            activeBg.style.transform = `scale(${breatheScale}) translate(${combinedX * 0.8 * pm}px, ${combinedY * 0.8 * pm}px) rotate(${cameraTilt}deg)`;
        }

        if (activeDepth) {
            const dx = Math.sin(angle * 0.5) * 2.5;
            const dy = Math.cos(angle * 0.4) * 2.5;
            // Opposite drift for depth perception
            activeDepth.style.transform = `translate(${combinedX * -1.5 * pm + dx}px, ${combinedY * -1.5 * pm + dy}px) scale(1.06)`;
        }

        if (activeHaze) {
            const hScale = 1.15 + Math.sin(angle * 0.3) * 0.06;
            // Drifting haze layer
            activeHaze.style.transform = `scale(${hScale}) translate(${combinedX * 2.5 * pm}px, ${combinedY * 2.5 * pm}px)`;
        }

        if (haze) {
            haze.style.transform = `translate(${mouseX * 25 * pm}px, ${mouseY * 25 * pm}px) rotate(${angle * 8 * profile.hazeSpeed}deg)`;
        }

        if (particles) {
            particles.style.transform = `translate(${mouseX * -35 * pm}px, ${mouseY * -35 * pm}px)`;
        }

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);

    // Initial atmosphere
    updateAtmosphere(0);

    // Track mouse for update loop
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
    });
}

/**
 * Particle System Controller
 */
function initParticles() {
    const layer = document.getElementById('particles-layer');
    if (!layer) return;

    // Clear existing
    layer.innerHTML = '';

    for (let i = 0; i < 60; i++) {
        const p = document.createElement('div');
        const isEmber = Math.random() > 0.7;
        p.className = 'particle';
        
        const size = isEmber ? Math.random() * 4 + 2 : Math.random() * 2 + 1;
        const duration = isEmber ? 10 + Math.random() * 10 : 20 + Math.random() * 20;
        const tx = (Math.random() - 0.5) * 600;
        const ty = - (500 + Math.random() * 500);

        p.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${105 + Math.random() * 10}%;
            background: ${isEmber ? 'var(--event-glow, #fff)' : '#fff'};
            box-shadow: ${isEmber ? '0 0 10px var(--event-glow, rgba(255,255,255,0.5))' : 'none'};
            --p-duration: ${duration}s;
            --p-tx: ${tx}px;
            --p-ty: ${ty}px;
            animation-delay: ${Math.random() * 20}s;
            opacity: ${isEmber ? 0.8 : 0.4};
        `;
        layer.appendChild(p);
    }
}

// Initialization
function initBillboard() {
    initAtmosphere();
    initParticles();
    // Start automated rotation
    billboardState.interval = setInterval(nextSlide, billboardState.slideDuration);
    
    // Start countdown ticker
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Manual navigation
    billboardState.navDots.forEach((dot, i) => {
        dot.onclick = () => {
            clearInterval(billboardState.interval);
            switchSlide(i);
            billboardState.interval = setInterval(nextSlide, billboardState.slideDuration);
        };
    });
}

document.addEventListener('DOMContentLoaded', initBillboard);
