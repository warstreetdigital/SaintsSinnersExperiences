document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const header = document.querySelector('header');
    const wrappers = document.querySelectorAll('.nav-card-wrapper');
    const cards = document.querySelectorAll('.nav-card');
    const footer = document.querySelector('.footer');
    const glow = document.querySelector('.glow-effect');
    
    // 1. Particle System for ambient air
    const particleContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 2 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        p.style.left = `${posX}%`;
        p.style.top = `${posY}%`;
        
        // Floating animation
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * -20;
        p.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;
        
        particleContainer.appendChild(p);
    }

    // Add float animation to head
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatParticle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.2; }
            90% { opacity: 0.2; }
            100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // 2. Preloader & Staggered Reveal
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loaded');
            
            // Start cinematic reveal
            setTimeout(() => {
                header.classList.add('active');
                
                wrappers.forEach((wrapper, index) => {
                    setTimeout(() => {
                        wrapper.classList.add('active');
                    }, 200 + (index * 150));
                });

                setTimeout(() => {
                    footer.classList.add('active');
                }, 1000);
            }, 600);
        }, 1500); // Minimum load time for premium feel
    });

    // 3. Smooth glow trailing
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('touchmove', (e) => {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
    }, { passive: true });

    function animateGlow() {
        // Smoother lerp for cinematic trailing
        glowX += (mouseX - glowX - 200) * 0.05;
        glowY += (mouseY - glowY - 200) * 0.05;
        
        if (glow) {
            glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
        }
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // 4. Card "Portal" Interaction (Magnetic Spotlight & Tilt)
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left);
            const y = (e.clientY - rect.top);
            
            // Set light position
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

            // Subtle Tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
            const rotateY = ((x - centerX) / centerX) * 5;  // Max 5deg
            
            card.style.transform = `translateY(-8px) translateZ(30px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.setProperty('--mouse-x', '50%');
            card.style.setProperty('--mouse-y', '50%');
        });

        card.addEventListener('click', () => {
            const title = card.querySelector('.card-title').innerText;
            console.log(`Entering: ${title}`);
            
            // Immersive click effect
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.transform = 'translateY(0) translateZ(-20px) rotateX(0)';
            card.style.background = '#1a1a1a';
            
            setTimeout(() => {
                card.style.transition = '';
                card.style.transform = '';
                card.style.background = '';
            }, 500);
        });
    });
});
