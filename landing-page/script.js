// MoeChan Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initParallax();
    initCarouselPause();
    initSmoothScroll();
    initChatButton();
});

// Header scroll effect
function initHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }

        lastScrollY = currentScrollY;
    }, { passive: true });
}

// Parallax effect for floating images
function initParallax() {
    const floatingImages = document.querySelectorAll('.floating-image');

    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        floatingImages.forEach((image, index) => {
            const speed = (index + 1) * 0.02;
            const x = mouseX * 50 * speed;
            const y = mouseY * 30 * speed;

            image.style.transform = `translate(${x}px, ${y}px)`;
        });
    }, { passive: true });
}

// Pause carousel on hover
function initCarouselPause() {
    const carousel = document.querySelector('.partners-carousel');
    const track = document.querySelector('.partners-track');

    if (carousel && track) {
        carousel.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });

        carousel.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Chat button interaction
function initChatButton() {
    const chatButton = document.querySelector('.chat-button');

    if (chatButton) {
        chatButton.addEventListener('click', () => {
            // Add a pulse animation
            chatButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                chatButton.style.transform = 'scale(1)';
            }, 100);

            // Here you would typically open a chat widget
            console.log('Chat button clicked - integrate your chat widget here');
        });
    }
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Preload critical resources
function preloadResources() {
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&family=Inter:wght@300;400;500;600;700&display=swap'
    ];

    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
}

// Add entrance animation on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Staggered animation for hero elements
    const heroElements = [
        '.title-script',
        '.title-main',
        '.hero-description',
        '.hero-content .btn'
    ];

    heroElements.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';

            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 + (index * 150));
        }
    });
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.floating-image').forEach(img => {
        img.style.animation = 'none';
    });

    const track = document.querySelector('.partners-track');
    if (track) {
        track.style.animation = 'none';
    }
}
