console.log("Alex AI Script Loaded v4");

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
                x: x * 0.15, // Magnetic strength (reduced to prevent nearby buttons from tripping)
                y: y * 0.15,
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
            const target = event.currentTarget;

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
        .from('.hero-subtitle', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');

    // V114.1: Hero portrait-frame video reveal. The frame is hidden in CSS
    // (opacity: 0) and faded in here ~2s after the hero text begins, so the
    // typography reads first and the imagery resolves second. Matches the
    // intended pacing per Alex's edit: "video should appear about 2 seconds
    // after the hero text, not before that."
    const heroFrame = document.querySelector('.hero-frame');
    if (heroFrame) {
        gsap.to(heroFrame, {
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: 2.0
        });
    }

    // --- Hero subtitle rotating word (V95) ---
    const heroRotate = document.querySelector('.hero-rotate');
    if (heroRotate) {
        const heroWords = ['training', 'consulting', 'visuals'];
        let heroWordIndex = 0;

        const cycleHeroWord = () => {
            const nextIndex = (heroWordIndex + 1) % heroWords.length;
            gsap.to(heroRotate, {
                yPercent: -40,
                opacity: 0,
                duration: 0.35,
                ease: 'power2.in',
                onComplete: () => {
                    heroRotate.textContent = heroWords[nextIndex];
                    gsap.fromTo(heroRotate,
                        { yPercent: 40, opacity: 0 },
                        { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
                    );
                    heroWordIndex = nextIndex;
                }
            });
        };

        // Start rotating after the hero title + subtitle animations settle.
        setTimeout(() => {
            setInterval(cycleHeroWord, 1400);
        }, 1600);
    }

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

    // V114: .visual-hook ScrollTrigger removed alongside the markup. The new hero v2
    // portrait frame owns the imagery moment that .visual-hook previously delivered,
    // and the new homepage sections (.lens-ai-section, .podcast-section) inherit
    // the generic section opacity+y reveal above (the same scroll-rhythm pattern
    // used by .rd-row). No dedicated hook needed.

    // --- Service Cards Hover Effect & Floating ---
    const cards = document.querySelectorAll('.service-card');

    cards.forEach((card, index) => {
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
    // --- Typography Portal (V95: multi-instance, supports subpage marquees) ---
    const portals = document.querySelectorAll('.typography-portal');

    portals.forEach(portal => {
        const marquee = portal.querySelector('.marquee-content');
        if (!marquee) return;

        // Horizontale Parallax beweging
        gsap.to(marquee, {
            xPercent: -20,
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
    });

    // --- Theme-light scroll-driven color transition (V106) ---
    // Each themed section fades dark -> cyan as user scrolls in, cyan -> dark
    // as they scroll past. Uses CSS variables scoped to .theme-light so a
    // single tween per state cascades to all child text colors.
    //
    // V106 architecture change from V105:
    //   - Padding is no longer animated. Theme-light sections now have FIXED
    //     50vh top/bottom padding (in style.css) so they are always full-bleed
    //     sized regardless of scroll state.
    //   - This eliminates the layout shift that was invalidating cached
    //     ScrollTrigger positions for Origin and Method. No refresh() calls
    //     needed, which also removes the scroll "scatter" caused by mid-scroll
    //     trigger re-measurement.
    //   - EXIT color start moved to 'bottom 40%': at this scroll position the
    //     section's content has already scrolled off the top of the viewport,
    //     so the cyan fade begins only AFTER the user is past the content.
    //     This prevents the "fading while visible" bug where color started
    //     disappearing before the user could read the content.
    const themeLightSections = document.querySelectorAll('.theme-light');

    themeLightSections.forEach(section => {
        // ENTER: dark -> cyan as section rises from viewport bottom to upper
        // viewport. Content is in lower viewport by the time color completes,
        // so the first look at content is on full cyan background.
        gsap.fromTo(section,
            {
                '--theme-bg': '#121212',
                '--theme-fg': '#fafafa',
                '--theme-muted': 'rgba(255, 255, 255, 0.75)',
                '--theme-subtle': 'rgba(255, 255, 255, 0.12)',
                '--theme-border': 'rgba(255, 255, 255, 0.08)'
            },
            {
                '--theme-bg': '#BFE8F8',
                '--theme-fg': '#121212',
                '--theme-muted': 'rgba(18, 18, 18, 0.75)',
                '--theme-subtle': 'rgba(18, 18, 18, 0.12)',
                '--theme-border': 'rgba(18, 18, 18, 0.08)',
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'top 30%',
                    scrub: 1
                }
            }
        );

        // EXIT: cyan -> dark. Starts at 'bottom 40%' which corresponds to
        // roughly when the section's content has already exited the top of
        // viewport, so content stays cyan for its full visibility range.
        gsap.fromTo(section,
            {
                '--theme-bg': '#BFE8F8',
                '--theme-fg': '#121212',
                '--theme-muted': 'rgba(18, 18, 18, 0.75)',
                '--theme-subtle': 'rgba(18, 18, 18, 0.12)',
                '--theme-border': 'rgba(18, 18, 18, 0.08)'
            },
            {
                '--theme-bg': '#121212',
                '--theme-fg': '#fafafa',
                '--theme-muted': 'rgba(255, 255, 255, 0.75)',
                '--theme-subtle': 'rgba(255, 255, 255, 0.12)',
                '--theme-border': 'rgba(255, 255, 255, 0.08)',
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'bottom 40%',
                    end: 'bottom top',
                    scrub: 1
                }
            }
        );
    });

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

    // Parallax voor About Portrait
    const aboutImg = document.querySelector('.about-portrait img');
    if (aboutImg) {
        gsap.to(aboutImg, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: ".about-portrait",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // Smooth Scroll to Top
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo(0); // Gebruik Lenis voor smooth scroll
        });
    }
    // --- R&D Cinematic Scroll Animations ---

    // 1. De verspringende rijen (Slide up + Fade in)
    // V106: reverted to plain trigger. Since theme-light sections now have
    // fixed padding (no more layout shift on scroll), cached positions stay
    // valid and the V105 invalidateOnRefresh workaround is no longer needed.
    const rdRows = document.querySelectorAll('.rd-row');
    rdRows.forEach(row => {
        gsap.fromTo(row,
            {
                opacity: 0,
                y: 60
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 85%', // Begint als de bovenkant van de rij 85% in beeld is
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // 2. De Mic-Drop Outro (Subtiele Scale + Fade in)
    const outroText = document.querySelector('.service-outro p');
    if (outroText) {
        gsap.fromTo(outroText,
            {
                opacity: 0,
                scale: 0.95,
                y: 40
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: '.service-outro',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // --- Podcast Episode Expand/Collapse (GSAP-driven) ---
    const episodeRows = document.querySelectorAll('.episode-row');
    episodeRows.forEach(row => {
        const header = row.querySelector('.episode-header');
        const expandEl = row.querySelector('.episode-expand');
        const toggle = row.querySelector('.episode-toggle');

        if (header && expandEl) {
            // Set initial state
            gsap.set(expandEl, { height: 0, overflow: 'hidden' });

            header.addEventListener('click', () => {
                const isExpanded = row.classList.contains('expanded');

                // Close all other rows first (accordion behavior)
                episodeRows.forEach(otherRow => {
                    if (otherRow !== row && otherRow.classList.contains('expanded')) {
                        otherRow.classList.remove('expanded');
                        const otherExpand = otherRow.querySelector('.episode-expand');
                        const otherToggle = otherRow.querySelector('.episode-toggle');
                        if (otherExpand) {
                            gsap.to(otherExpand, {
                                height: 0,
                                duration: 0.4,
                                ease: 'power2.inOut'
                            });
                        }
                        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle this row
                if (isExpanded) {
                    // Collapse
                    row.classList.remove('expanded');
                    gsap.to(expandEl, {
                        height: 0,
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                } else {
                    // Expand
                    row.classList.add('expanded');
                    gsap.set(expandEl, { height: 'auto' });
                    const fullHeight = expandEl.offsetHeight;
                    gsap.fromTo(expandEl,
                        { height: 0 },
                        { height: fullHeight, duration: 0.5, ease: 'power2.out' }
                    );
                }

                if (toggle) {
                    toggle.setAttribute('aria-expanded', !isExpanded);
                }
            });
        }
    });

    // --- Episode Row Stagger Reveal ---
    const episodeRowsForAnim = document.querySelectorAll('.episode-row');
    if (episodeRowsForAnim.length > 0) {
        gsap.fromTo(episodeRowsForAnim,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.episode-list',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // --- Text Block Stagger Reveal (Subpages) ---
    const textBlocks = document.querySelectorAll('.text-block');
    if (textBlocks.length > 0) {
        textBlocks.forEach(block => {
            gsap.fromTo(block,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: block,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    // --- V120: Featured work case reveal ---
    // Each .featured-case fades in on scroll. Matches the existing .rd-row
    // reveal pattern (opacity 0→1, y 60→0, power3.out, top 85% trigger).
    const featuredCases = document.querySelectorAll('.featured-case');
    featuredCases.forEach(caseEl => {
        gsap.fromTo(caseEl,
            { opacity: 0, y: 60 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: caseEl,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // --- V119: Things I Build pill swipe-in ---
    // Each pill animates in horizontally from the side as it enters view.
    // Mockup-specified direction: pill 1 from left, pill 2 from right, pill 3
    // from left. ~150ms stagger via per-pill delay. The .rd-row.overflow:hidden
    // clips the off-screen start position so the pill is invisible until it
    // slides in. ToggleActions 'play none none none' means once played, no
    // reverse on scroll-up (the pill stays in place).
    const tibPills = document.querySelectorAll('.tib-pill');
    tibPills.forEach((pill, i) => {
        const fromX = (i === 1) ? '100vw' : '-100vw';
        gsap.fromTo(pill,
            { x: fromX, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.9,
                delay: i * 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: pill,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // --- Full-Bleed Break Parallax ---
    const fullBleedMedia = document.querySelectorAll('.full-bleed-break img, .full-bleed-break video');
    fullBleedMedia.forEach(media => {
        const isVideo = media.tagName === 'VIDEO';
        gsap.to(media, {
            yPercent: isVideo ? 0 : 15, // Reduced travel for video to avoid showing edges
            ease: 'none',
            scrollTrigger: {
                trigger: media.closest('.full-bleed-break'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // --- Cinematic Showcase Parallax ---
    const cinematicVideo = document.querySelector('.cinematic-showcase video');
    if (cinematicVideo) {
        gsap.to(cinematicVideo, {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
                trigger: '.cinematic-showcase',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    // --- Podcast Closing CTA Reveal ---
    const podcastClosing = document.querySelector('.podcast-closing');
    if (podcastClosing) {
        gsap.fromTo(podcastClosing,
            { opacity: 0, scale: 0.95, y: 40 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: podcastClosing,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }

    // --- Monument Text Horizontal Parallax ---
    const monumentTexts = document.querySelectorAll('.monument-text');
    monumentTexts.forEach(text => {
        gsap.to(text, {
            xPercent: -10,
            ease: 'none',
            scrollTrigger: {
                trigger: text.closest('.typo-monument') || text.closest('.podcast-closing-monument'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
});
