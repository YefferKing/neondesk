/* ========================================
   NeonDesk Landing Page - JavaScript
   Animations and Interactions
======================================== */

// Smooth reveal animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initScrollAnimations();
    initNavbarScroll();
    initParallaxEffects();
    initTypewriter();
});

// ========== Scroll Reveal Animations ==========
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.stagger-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('revealed');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToReveal = document.querySelectorAll(
        '.feature-card, .step, .section-header, .download-card, .hero-content, .hero-visual'
    );
    
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-element');
        observer.observe(el);
    });
}

// ========== Navbar Background on Scroll ==========
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
    });
}

// ========== Parallax Effects ==========
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.glow-orb');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
    
    // Parallax on scroll for preview window
    const previewWindow = document.querySelector('.preview-window');
    if (previewWindow) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const rotation = Math.min(scrollY * 0.02, 5);
            previewWindow.style.transform = `rotateY(${-5 + rotation}deg) rotateX(${5 - rotation}deg)`;
        });
    }
}

// ========== Typewriter Effect for ID ==========
function initTypewriter() {
    const mockId = document.querySelector('.mock-id');
    if (!mockId) return;
    
    const originalText = mockId.textContent;
    mockId.textContent = '';
    
    let charIndex = 0;
    
    function typeChar() {
        if (charIndex < originalText.length) {
            mockId.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 100);
        } else {
            // Add blinking cursor effect
            mockId.classList.add('typed');
        }
    }
    
    // Start after a delay
    setTimeout(typeChar, 1000);
}

// ========== Smooth Scroll for Anchor Links ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Add CSS for reveal animations ==========
const style = document.createElement('style');
style.textContent = `
    .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .reveal-element.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stagger-child {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.4s ease, transform 0.4s ease;
    }
    
    .stagger-child.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .navbar {
        transition: all 0.3s ease;
    }
    
    .navbar.scrolled {
        padding: 15px 40px;
        background: rgba(10, 10, 15, 0.95);
    }
    
    .navbar.hidden {
        transform: translateY(-100%);
    }
    
    .mock-id.typed::after {
        content: '|';
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========== Console Easter Egg ==========
console.log('%c🖥️ NeonDesk', 'font-size: 24px; font-weight: bold; color: #00f3ff;');
console.log('%cControl remoto ultra rápido', 'font-size: 14px; color: #b829ff;');
console.log('%cGitHub: https://github.com/YefferKing/neondesk-app', 'font-size: 12px; color: #888;');
