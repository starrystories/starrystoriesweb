/**
 * StarryStories Web App - Animations
 * Intersection Observer for scroll reveals and particle generation
 */

/**
 * Initialize scroll reveal animations
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .fade-up, .fade-down, .fade-left, .fade-right, .scale-in'
    );

    animatedElements.forEach(el => observer.observe(el));

    return observer;
}

/**
 * Generate floating particles/stars
 * @param {HTMLElement} container - Container element
 * @param {number} count - Number of particles
 */
function generateParticles(container, count = 50) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random size
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.animationDuration = `${Math.random() * 2 + 2}s`;

        container.appendChild(particle);
    }
}

/**
 * Generate floating gradient orbs
 * @param {HTMLElement} container - Container element
 */
function generateOrbs(container) {
    const orbs = [
        { class: 'orb-1' },
        { class: 'orb-2' },
        { class: 'orb-3' }
    ];

    orbs.forEach(orbConfig => {
        const orb = document.createElement('div');
        orb.className = `orb ${orbConfig.class}`;
        container.appendChild(orb);
    });
}

/**
 * Create parallax effect on scroll
 * @param {HTMLElement} element - Element to apply parallax
 * @param {number} speed - Parallax speed (0-1)
 */
function initParallax(element, speed = 0.5) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

/**
 * Initialize background effects
 */
function initBackgroundEffects() {
    // Create particles container if not exists
    let container = document.querySelector('.particles-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'particles-container';
        document.body.prepend(container);
    }

    generateParticles(container, 40);
    generateOrbs(container);
}

/**
 * Add ripple effect to element
 * @param {HTMLElement} element 
 */
function addRippleEffect(element) {
    element.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';

        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
}

/**
 * Initialize global click loading effects
 */
function initClickEffects() {
    // Add loading overlay to page if not exists
    if (!document.querySelector('.page-loading-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'page-loading-overlay';
        overlay.innerHTML = '<div class="page-loading-spinner"></div>';
        document.body.appendChild(overlay);
    }

    // Add ripple effect to all clickable elements
    const clickables = document.querySelectorAll(
        '.btn, .language-card, .category-card, .story-card, .english-card, .collapsible-header, .voice-option, [onclick]'
    );

    clickables.forEach(el => {
        // Skip if already has ripple
        if (el.dataset.ripple) return;
        el.dataset.ripple = 'true';
        addRippleEffect(el);
    });
}

/**
 * Show page loading overlay
 */
function showLoading() {
    const overlay = document.querySelector('.page-loading-overlay');
    if (overlay) overlay.classList.add('active');
}

/**
 * Hide page loading overlay
 */
function hideLoading() {
    const overlay = document.querySelector('.page-loading-overlay');
    if (overlay) overlay.classList.remove('active');
}

/**
 * Navigate with loading animation
 */
function navigateWithLoading(url) {
    showLoading();
    setTimeout(() => {
        window.location.href = url;
    }, 150);
}

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initClickEffects();

    // Intercept link clicks for loading animation
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.endsWith('.html') && !href.startsWith('http')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateWithLoading(href);
            });
        }
    });
});

// Hide loading on page show (handles back button)
window.addEventListener('pageshow', () => {
    hideLoading();
});

// Export for use
window.Animations = {
    initScrollAnimations,
    generateParticles,
    generateOrbs,
    initBackgroundEffects,
    initParallax,
    addRippleEffect,
    initClickEffects,
    showLoading,
    hideLoading,
    navigateWithLoading
};
