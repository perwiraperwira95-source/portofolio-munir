// ===========================
// NAVBAR FUNCTIONALITY
// ===========================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===========================
// SMOOTH SCROLLING
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe skill items
document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    observer.observe(item);
});

// ===========================
// SKILL BAR ANIMATION
// ===========================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const skillProgress = skillItem.querySelector('.skill-progress');
            const skillPercent = skillItem.getAttribute('data-skill');
            
            // Animate skill bar
            setTimeout(() => {
                skillProgress.style.width = `${skillPercent}%`;
            }, 200);
            
            // Unobserve after animation
            skillObserver.unobserve(skillItem);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// ===========================
// TYPING EFFECT (OPTIONAL)
// ===========================
const heroRole = document.querySelector('.hero-role');
const roles = [
    'Creative Web Developer',
    'UI/UX Designer',
    'Frontend Specialist',
    'Digital Creator'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        heroRole.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        heroRole.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 150;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500; // Pause before next word
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 1000);
});

// ===========================
// FORM SUBMISSION
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && subject && message) {
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
    } else {
        alert('Please fill in all fields.');
    }
});

// ===========================
// PARALLAX EFFECT ON HERO
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===========================
// CURSOR EFFECT (OPTIONAL)
// ===========================
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.classList.add('cursor-follower');
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Add cursor styles
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .custom-cursor,
    .cursor-follower {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        border-radius: 50%;
        transition: transform 0.15s ease;
    }
    
    .custom-cursor {
        width: 10px;
        height: 10px;
        background-color: var(--color-primary);
        margin-left: -5px;
        margin-top: -5px;
    }
    
    .cursor-follower {
        width: 40px;
        height: 40px;
        border: 2px solid var(--color-primary);
        margin-left: -20px;
        margin-top: -20px;
        opacity: 0.5;
    }
    
    @media (max-width: 768px) {
        .custom-cursor,
        .cursor-follower {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyle);

// Cursor hover effects
document.querySelectorAll('a, button, .portfolio-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursorFollower.style.transform += ' scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    });
});

// ===========================
// PORTFOLIO FILTER (OPTIONAL)
// ===========================
// If you want to add filtering functionality to portfolio items
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===========================
// SCROLL TO TOP BUTTON
// ===========================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.classList.add('scroll-top-btn');
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add scroll to top button styles
const scrollBtnStyle = document.createElement('style');
scrollBtnStyle.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
        color: var(--color-dark);
        border: none;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        z-index: 999;
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-top-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
    }
    
    @media (max-width: 768px) {
        .scroll-top-btn {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(scrollBtnStyle);

// ===========================
// LOADING ANIMATION
// ===========================
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.classList.add('page-loader');
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Excellence...</p>
        </div>
    `;
    
    // Add loader styles
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--color-dark);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        .page-loader.fade-out {
            opacity: 0;
            pointer-events: none;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid var(--color-secondary-light);
            border-top-color: var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1.5rem;
        }
        
        .loader-content p {
            color: var(--color-primary);
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-size: 0.9rem;
        }
        
        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }
    `;
    
    document.head.appendChild(loaderStyle);
    document.body.insertBefore(loader, document.body.firstChild);
    
    // Hide loader after page loads
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// ===========================
// DYNAMIC YEAR IN FOOTER
// ===========================
const yearElement = document.querySelector('.footer-copyright');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = `&copy; ${currentYear} YourName. All rights reserved. Crafted with passion.`;
}

// ===========================
// ADD ANIMATION DELAY TO PORTFOLIO ITEMS
// ===========================
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c💎 Premium Portfolio', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cLooking at the code? I like your curiosity! 🚀', 'font-size: 14px; color: #9ca3af;');
console.log('%cLet\'s work together: yourmail@example.com', 'font-size: 12px; color: #D4AF37;');