/**
 * Shitamachi Detective Agency (下町探偵団) - Main JS logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initFAQAccordions();
    initContactForm();
    initMobileNav();
});

/**
 * Scroll Reveal Animation Effect on scroll
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-10');
        observer.observe(el);
    });
}

/**
 * FAQ Accordion Panel toggles
 */
function initFAQAccordions() {
    const faqButtons = document.querySelectorAll('.faq-toggle');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            const icon = button.querySelector('.faq-icon');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Toggle expansion state
            button.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                panel.style.maxHeight = panel.scrollHeight + 'px';
                panel.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
            } else {
                panel.style.maxHeight = '0px';
                panel.style.opacity = '0';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

/**
 * Contact Form validation and processing
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form field data retrieval
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        console.log('Contact form submitted:', data);

        // Simple validation checks
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('border-brand-red');
            } else {
                field.classList.remove('border-brand-red');
            }
        });

        if (!isValid) {
            alert('必須項目をすべて入力してください。');
            return;
        }

        // Mock success submission feedback
        alert('お問い合わせが送信されました。担当者よりご連絡いたします。');
        contactForm.reset();
    });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('mobile-nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isOpen);
        
        if (!isOpen) {
            navMenu.classList.remove('hidden');
        } else {
            navMenu.classList.add('hidden');
        }
    });
}
