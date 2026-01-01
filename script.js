console.log("Alex AI Script Loaded v3");

document.addEventListener("DOMContentLoaded", () => {
    // Check if libraries are loaded
    if (typeof Lenis === 'undefined') {
        console.error("Lenis not loaded!");
        return;
    }
    if (typeof gsap === 'undefined') {
        console.error("GSAP not loaded!");
        return;
    }

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Register GSAP ScrollTrigger and TextPlugin
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // --- Custom Cursor with Trail ---
    const cursor = document.querySelector('.cursor-follower');
    const trailContainer = document.querySelector('.cursor-trail');
    const trailDots = [];
    const TRAIL_LENGTH = 20;

    // Create trail dots
    if (trailContainer) {
        for (let i = 0; i < TRAIL_LENGTH; i++) {
            const dot = document.createElement('div');
            dot.classList.add('trail-dot');
            trailContainer.appendChild(dot);
            trailDots.push({
                element: dot,
                x: 0,
                y: 0
            });
        }
    }

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
        const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());

        // Main cursor
        cursorX += (mouseX - cursorX) * dt;
        cursorY += (mouseY - cursorY) * dt;

        if (cursor) {
            gsap.set(cursor, { x: cursorX, y: cursorY });
        }

        // Trail
        let prevX = cursorX;
        let prevY = cursorY;

        trailDots.forEach((dot, index) => {
            const delay = 0.15 + (index * 0.02); // Staggered delay
            const dotDt = 1.0 - Math.pow(1.0 - delay, gsap.ticker.deltaRatio());

            dot.x += (prevX - dot.x) * dotDt;
            dot.y += (prevY - dot.y) * dotDt;

            gsap.set(dot.element, {
                x: dot.x,
                y: dot.y,
                scale: 1 - (index / TRAIL_LENGTH) // Shrink tail
            });
        });
    });

    // Hover states for cursor
    const hoverElements = document.querySelectorAll('a, button, .service-card, [data-magnetic]');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('active');
        });
    });

    // --- Magnetic Effect ---
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3, // Magnetic strength
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // --- Text Scramble Effect ---
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const scrambleElements = document.querySelectorAll('.nav-links a, .contact-btn');

    scrambleElements.forEach(el => {
        el.dataset.value = el.innerText;

        el.addEventListener('mouseenter', event => {
            let iteration = 0;
            const target = event.target;

            clearInterval(target.interval);

            target.interval = setInterval(() => {
                target.innerText = target.innerText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");

                if (iteration >= target.dataset.value.length) {
                    clearInterval(target.interval);
                }

                iteration += 1 / 3;
            }, 30);
        });
    });

    // --- Hero Animations ---
    const heroTimeline = gsap.timeline();

    heroTimeline
        .to('.hero-title span', {
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            stagger: 0.1,
            delay: 0.5
        })
        .to('.type-text', {
            text: "AI Adoption & Training for the Future",
            duration: 3,
            ease: "none"
        }, '-=0.5');

    // --- Section Animations ---
    const sections = document.querySelectorAll('section:not(.hero):not(.insights):not(.typography-portal)');

    sections.forEach(section => {
        gsap.fromTo(section,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // --- Visual Hook Parallax ---
    const visualHookVideo = document.querySelector('.visual-hook video');
    if (visualHookVideo) {
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 768px)": function () {
                gsap.to(visualHookVideo, {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.visual-hook',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            },
            // Mobile
            "(max-width: 767px)": function () {
                gsap.to(visualHookVideo, {
                    yPercent: 10, // Reduced movement to prevent clipping on shorter container
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.visual-hook',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        });
    }

    // --- Service Cards Hover Effect & Floating ---
    const cards = document.querySelectorAll('.service-card');

    cards.forEach((card, index) => {
        // Add floating animation with random delays
        card.style.animationDelay = `${index * 0.5}s`;
        card.classList.add('floating');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.to(card, {
                '--x': `${x}px`,
                '--y': `${y}px`,
                duration: 0.3
            });
        });
    });
    // --- Mobile Optimizations ---
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 1024;

    // Only disable custom cursor on mobile touch devices
    if (isTouch && isMobile) {
        if (cursor) cursor.style.display = 'none';
        if (trailContainer) trailContainer.style.display = 'none';
        document.body.style.cursor = 'auto';
    } else {
        // Ensure cursor is visible on desktop
        if (cursor) cursor.style.display = 'block';
        if (trailContainer) trailContainer.style.display = 'block';
    }

    // --- Hamburger Menu Logic ---
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburgerBtn && mobileNavOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');

            if (mobileNavOverlay.classList.contains('active')) {
                lenis.stop();
            } else {
                lenis.start();
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                lenis.start();
            });
        });
    }
    // --- Typography Portal ---
    const portal = document.querySelector('.typography-portal');
    const marquee = document.querySelector('.marquee-content');

    if (portal && marquee) {
        // Horizontale Parallax beweging
        gsap.to(marquee, {
            xPercent: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: portal,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });

        // Achtergrond Pulse trigger
        ScrollTrigger.create({
            trigger: portal,
            start: 'top 70%',
            end: 'bottom 30%',
            onEnter: () => portal.classList.add('pulse'),
            onLeave: () => portal.classList.remove('pulse'),
            onEnterBack: () => portal.classList.add('pulse'),
            onLeaveBack: () => portal.classList.remove('pulse')
        });
    }

    // Update de Insights animatie naar een 'staggered reveal'
    const insightCards = document.querySelectorAll('.insight-card');
    if (insightCards.length > 0) {
        gsap.from(insightCards, {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: 0.2, // Kaarten verschijnen één voor één
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.insights .container',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }
});
