// Smooth Scroll Functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Add smooth scroll to all navigation links
document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.boxShadow = 'none';
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('scroll-animate');
    observer.observe(section);
});

// Set Service Type Function
function setServiceType(serviceType) {
    scrollToSection('contact');
    setTimeout(() => {
        const serviceTypeInput = document.getElementById('serviceType');
        if (serviceTypeInput) {
            serviceTypeInput.value = serviceType;
            serviceTypeInput.focus();
        }
    }, 500);
}

// Toast Notification Function
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
        <svg class=\"toast-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">
            <path d=\"M22 11.08V12a10 10 0 1 1-5.93-9.14\"></path>
            <polyline points=\"22 4 12 14.01 9 11.01\"></polyline>
        </svg>
        <span class=\"toast-message\">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// Service Inquiry Form Handler
const serviceForm = document.getElementById('serviceForm');
serviceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('serviceName').value,
        email: document.getElementById('serviceEmail').value,
        service: document.getElementById('serviceType').value,
        message: document.getElementById('serviceMessage').value
    };
    
    // Simulate form submission
    console.log('Service Inquiry Submitted:', formData);
    
    // Show loading state
    const submitBtn = serviceForm.querySelector('button[type=\"submit\"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success toast
    showToast("Your inquiry has been received. We'll contact you shortly!");
    
    // Reset form
    serviceForm.reset();
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
});

// General Contact Form Handler
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        message: document.getElementById('contactMessage').value
    };
    
    // Simulate form submission
    console.log('Contact Form Submitted:', formData);
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type=\"submit\"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success toast
    showToast("Thank you! We'll get back to you soon.");
    
    // Reset form
    contactForm.reset();
    
    // Reset button
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
});

// Card Hover Effects
document.querySelectorAll('.feature-card, .service-card, .portfolio-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Portfolio Card Image Zoom Effect
document.querySelectorAll('.portfolio-card').forEach(card => {
    const img = card.querySelector('.portfolio-image img');
    
    card.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Service Item Hover Effects
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const checkIcon = this.querySelector('.check-icon');
        if (checkIcon) {
            checkIcon.style.transform = 'scale(1.2)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const checkIcon = this.querySelector('.check-icon');
        if (checkIcon) {
            checkIcon.style.transform = 'scale(1)';
        }
    });
});

// Form Input Focus Effects
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.2s';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Scroll Progress Indicator (Optional)
function updateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    
    // You can add a progress bar element if needed
    // document.getElementById('scrollProgress').style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Parallax Effect for Hero Section (Optional)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && window.innerWidth > 768) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// Add animation delays to grid items
function addAnimationDelays() {
    const animatedGrids = [
        '.features-grid .feature-card',
        '.services-grid .service-card',
        '.portfolio-grid .portfolio-card',
        '.testimonials-grid .testimonial-card'
    ];

    animatedGrids.forEach(selector => {
        document.querySelectorAll(selector).forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
        });
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    addAnimationDelays();
    
    // Add visible class to hero section immediately
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
});

// Prevent form submission on Enter key except in textarea
document.querySelectorAll('.contact-form input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});

// Social Media Link Analytics (Optional)
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.getAttribute('title');
        console.log(`Social media click: ${platform}`);
        // You can add analytics tracking here
    });
});

// WhatsApp Button Click Analytics (Optional)
const whatsappButton = document.querySelector('.whatsapp-button');
if (whatsappButton) {
    whatsappButton.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
        // You can add analytics tracking here
    });
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset parallax on resize
        const heroContent = document.querySelector('.hero-content');
        const heroImage = document.querySelector('.hero-image');
        
        if (window.innerWidth <= 768) {
            if (heroContent) heroContent.style.transform = 'none';
            if (heroImage) heroImage.style.transform = 'none';
        }
    }, 250);
});

// Print message when page is fully loaded
window.addEventListener('load', () => {
    console.log('Phinnymos Software Solutions website loaded successfully!');
    console.log('For inquiries, contact: 0797504158 or wisanimathevula6@gmail.com');
});
