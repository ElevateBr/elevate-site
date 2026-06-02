// Main JavaScript for Elevate Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initLocalizedMobileHeaderOffset();
    initSmoothScrolling();
    initScrollEffects();

    initFormValidation();
    initAutoSave();
});

function initLocalizedMobileHeaderOffset() {
    const header = document.querySelector('.header');
    const main = document.querySelector('main');
    if (!header || !main) return;

    const applyOffset = () => {
        if (window.innerWidth <= 768) {
            main.style.paddingTop = `${header.offsetHeight + 8}px`;
        } else {
            main.style.paddingTop = '';
        }
    };

    applyOffset();
    window.addEventListener('load', applyOffset);
    window.addEventListener('resize', applyOffset);

    // Recalculate when mobile panels open/close
    document.addEventListener('click', (event) => {
        if (event.target.closest('.navbar-toggle') || event.target.closest('.lang-toggle')) {
            requestAnimationFrame(applyOffset);
        }
    });

    // Recalculate whenever header size changes (language labels, wrapping, etc.)
    if (typeof ResizeObserver !== 'undefined') {
        const headerObserver = new ResizeObserver(() => applyOffset());
        headerObserver.observe(header);
    }
}

// Navigation functionality
function initNavigation() {
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');

    if (header) {
        const hero = document.querySelector('#home.hero, main > section.hero');

        if (hero) {
            header.classList.add('header--has-hero');
        }

        const HEADER_FADE_PX = 100;

        const updateHeaderScroll = () => {
            if (hero) {
                const scrollY = window.scrollY;
                const progress = scrollY <= 0 ? 0 : Math.min(1, scrollY / HEADER_FADE_PX);
                header.style.setProperty('--header-progress', String(progress));
            } else {
                header.style.setProperty('--header-progress', '1');
            }
        };

        updateHeaderScroll();
        window.addEventListener('scroll', updateHeaderScroll, { passive: true });
        window.addEventListener('resize', updateHeaderScroll);
        window.addEventListener('load', updateHeaderScroll);
    }
    const navMenu = document.querySelector('.navbar-nav');
    const navToggle = document.querySelector('.navbar-toggle');
    const langToggle = document.querySelector('.lang-toggle');

    if (navToggle && navbar && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('mobile-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));

            // Keep one panel open at a time on mobile
            if (isOpen) {
                navbar.classList.remove('lang-open');
                if (langToggle) {
                    langToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        if (langToggle) {
            langToggle.addEventListener('click', () => {
                const isLangOpen = navbar.classList.toggle('lang-open');
                langToggle.setAttribute('aria-expanded', String(isLangOpen));

                // Keep one panel open at a time on mobile
                if (isLangOpen) {
                    navbar.classList.remove('mobile-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navbar.classList.remove('mobile-open');
                    navbar.classList.remove('lang-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    if (langToggle) {
                        langToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (
                window.innerWidth <= 768 &&
                navbar.classList.contains('mobile-open') &&
                !navbar.contains(event.target)
            ) {
                navbar.classList.remove('mobile-open');
                navbar.classList.remove('lang-open');
                navToggle.setAttribute('aria-expanded', 'false');
                if (langToggle) {
                    langToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && (navbar.classList.contains('mobile-open') || navbar.classList.contains('lang-open'))) {
                navbar.classList.remove('mobile-open');
                navbar.classList.remove('lang-open');
                navToggle.setAttribute('aria-expanded', 'false');
                if (langToggle) {
                    langToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && (navbar.classList.contains('mobile-open') || navbar.classList.contains('lang-open'))) {
                navbar.classList.remove('mobile-open');
                navbar.classList.remove('lang-open');
                navToggle.setAttribute('aria-expanded', 'false');
                if (langToggle) {
                    langToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects — conteúdo carregado via fetch deve chamar observeAnimatedElements depois
let scrollAnimationObserver = null;

function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    observeAnimatedElements(document.querySelectorAll(
        '.servico-card, .parceiro-card, .vaga-card, .topic-card, .product-card, .product-section'
    ));
}

function observeAnimatedElements(elements) {
    if (!scrollAnimationObserver || !elements) return;
    const list = elements.length !== undefined ? elements : [elements];
    list.forEach((el) => {
        if (el instanceof Element) {
            scrollAnimationObserver.observe(el);
        }
    });
}

window.observeAnimatedElements = observeAnimatedElements;



// Form validation
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            if (!nome || !email || !mensagem) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Auto-save functionality
function initAutoSave() {
    const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    formFields.forEach(field => {
        field.addEventListener('input', () => {
            saveFormData();
        });
    });
    
    // Load saved data on page load
    loadFormData();
}

// Save form data to localStorage
function saveFormData() {
    const formData = {};
    const formFields = document.querySelectorAll('#contact-form input, #contact-form textarea');
    
    formFields.forEach(field => {
        if (field.value.trim()) {
            formData[field.name] = field.value;
        }
    });
    
    localStorage.setItem('elevateContactForm', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('elevateContactForm');
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        Object.keys(formData).forEach(fieldName => {
            const field = document.querySelector(`[name="${fieldName}"]`);
            if (field) {
                field.value = formData[fieldName];
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Add to page
    document.body.appendChild(notification);
}

// Add CSS for notifications
const notificationStyles = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Add CSS for animations
const animationStyles = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .servico-card,
    .parceiro-card,
    .vaga-card,
    .topic-card,
    .product-card {
        opacity: 0;
        transform: translateY(30px);
    }

    /* product-section: visível por padrão (carrega após fetch) */
    .product-section:not(.animate-in) {
        opacity: 1;
        transform: none;
    }
    
    .servico-card.animate-in,
    .parceiro-card.animate-in,
    .vaga-card.animate-in,
    .topic-card.animate-in,
    .product-card.animate-in,
    .product-section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject animation styles
const animationStyleSheet = document.createElement('style');
animationStyleSheet.textContent = animationStyles;
document.head.appendChild(animationStyleSheet); 