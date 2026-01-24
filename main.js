/**
 * Modern Preloader & Vanta Birds Background
 * Shows a branded loading experience before the birds animation loads
 */

// Track loading states
let pageLoaded = false;
let animationComplete = false;

// Minimum time for preloader (matches loading bar animation - 2s)
const MIN_PRELOADER_TIME = 2000;

// Start the minimum timer
setTimeout(function () {
    animationComplete = true;
    if (pageLoaded) {
        hidePreloader();
    }
}, MIN_PRELOADER_TIME);

// Wait for page to fully load
window.addEventListener("load", function () {
    pageLoaded = true;

    // Initialize Vanta Birds background effect
    const vantaEffect = VANTA.BIRDS({
        el: "#background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        backgroundColor: 0x302D2D,
        speedLimit: 4.00,
        quantity: 4.00,
        separation: 30.00,
        alignment: 60.00,
        cohesion: 70.00
    });

    // Hide preloader after animation completes
    if (animationComplete) {
        hidePreloader();
    }
});

/**
 * Smoothly hide the preloader with fade-out effect
 */
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Match CSS transition duration
    }
}

