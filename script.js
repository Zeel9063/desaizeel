// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    });
});

// Scroll Reveal Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Adding a slight delay for staggered effect if multiple elements are shown at once
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const words = ['Developer', 'Designer', 'Creator', 'Innovator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

// Append a cursor element dynamically if not present
if (!document.querySelector('.typing-cursor')) {
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    typingText.parentNode.insertBefore(cursor, typingText.nextSibling);
}

function type() {
    isEnd = false;
    typingText.innerHTML = words[wordIndex].substring(0, charIndex);

    if (!isDeleting && charIndex < words[wordIndex].length) {
        // Typing
        charIndex++;
        setTimeout(type, 100 + Math.random() * 50); // Random typing speed
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(type, 50 + Math.random() * 50);
    } else {
        // Switch modes
        isEnd = true;
        isDeleting = !isDeleting;
        
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        setTimeout(type, isEnd ? (isDeleting ? 1500 : 500) : 150);
    }
}

// Start typing effect with a delay
setTimeout(type, 1500);

// 3D Tilt Effect for Project Cards
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation based on cursor position
        const rotateX = ((y - centerY) / centerY) * -12; // Max 12deg rotation
        const rotateY = ((x - centerX) / centerX) * 12;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        card.style.transition = 'none'; // Remove transition for smooth tracking
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transition = 'all 0.5s ease'; // Restore transition
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)`;
        
        setTimeout(() => {
            if(!card.matches(':hover')) {
                card.style.transform = ''; // Clear inline styles to let hover CSS take over if needed
            }
        }, 500);
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.1s ease'; // Quick transition when entering
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});
