/**
 * Saints n' Sinners - Executive Lounge Module
 * Management Experience - Drifting Portraits & Ambient Motion
 */

const managementModule = {
    init() {
        this.initPortraits();
        this.initParticles();
        this.initParallax();
    },

    initPortraits() {
        const cards = document.querySelectorAll('.mgmt-card');
        
        cards.forEach((card, index) => {
            const img = card.querySelector('.portrait-img');
            const sweep = card.querySelector('.light-sweep');
            let angle = index * 1.5; // Offset for variety

            function animate() {
                angle += 0.004;
                
                // Cinematic slow drift
                const x = Math.sin(angle) * 1.5;
                const y = Math.cos(angle * 0.8) * 1.0;
                const scale = 1.05 + Math.sin(angle * 0.5) * 0.02;
                
                if (img) {
                    img.style.transform = `translate(${x}%, ${y}%) scale(${scale})`;
                }

                // Light sweep motion
                if (sweep) {
                    const sweepPos = (Math.sin(angle * 0.5) + 1) * 50;
                    sweep.style.backgroundPosition = `${sweepPos}% ${sweepPos}%`;
                }

                requestAnimationFrame(animate);
            }
            animate();
        });
    },

    initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        const particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.init();
            }
            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 0.2 - 0.1;
                this.speedY = Math.random() * 0.3 - 0.15;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.init();
                }
            }
            draw() {
                ctx.fillStyle = `rgba(255, 204, 51, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 40; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    },

    initParallax() {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;

            const cards = document.querySelectorAll('.mgmt-card');
            cards.forEach((card, i) => {
                // Subtle tilt toward mouse
                card.style.transform = `perspective(1000px) rotateY(${x * 0.5}deg) rotateX(${-y * 0.5}deg)`;
            });
        });
    }
};

window.addEventListener('DOMContentLoaded', () => {
    managementModule.init();
});
