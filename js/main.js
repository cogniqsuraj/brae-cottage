// ========================================
// MAIN DOM & EVENT HANDLING
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // DOM Elements
    // ========================================
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const sections = document.querySelectorAll('section[id]');
    const scrollTopBtn = document.getElementById('scrollTop');
    
    // ========================================
    // Navbar Scroll Effect
    // ========================================
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Close chatbot when opening menu
        const chatbotWidget = document.getElementById('chatbotWidget');
        const chatbotToggle = document.getElementById('chatbotToggle');
        if (chatbotWidget.classList.contains('active')) {
            chatbotWidget.classList.remove('active');
            chatbotToggle.classList.remove('hidden');
        }
    });

    // ========================================
    // Smooth Scrolling
    // ========================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Active Nav Link on Scroll
    // ========================================
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // ========================================
    // Contact Form Handling
    // ========================================
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            checkin: document.getElementById('checkin').value,
            checkout: document.getElementById('checkout').value,
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value
        };
        
        const checkinDate = new Date(formData.checkin);
        const checkoutDate = new Date(formData.checkout);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkinDate < today) {
            alert('Check-in date cannot be in the past.');
            return;
        }
        
        if (checkoutDate <= checkinDate) {
            alert('Check-out date must be after check-in date.');
            return;
        }
        
        console.log('Form submitted with data:', formData);
        
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        setTimeout(function() {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
    });

    // ========================================
    // Date Validation
    // ========================================
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    checkinInput.setAttribute('min', formatDate(today));
    checkoutInput.setAttribute('min', formatDate(tomorrow));
    
    checkinInput.addEventListener('change', function() {
        const selectedCheckin = new Date(this.value);
        const nextDay = new Date(selectedCheckin);
        nextDay.setDate(nextDay.getDate() + 1);
        checkoutInput.setAttribute('min', formatDate(nextDay));
        
        if (checkoutInput.value && new Date(checkoutInput.value) <= selectedCheckin) {
            checkoutInput.value = '';
        }
    });

    // ========================================
    // Gallery Interactions
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.feature-item, .review-card, .gallery-item, .room-card, .section-header');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(element);
    });

    // ========================================
    // Scroll to Top Button
    // ========================================
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    });

    // ========================================
    // Click Outside Handling
    // ========================================
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        const chatbotWidget = document.getElementById('chatbotWidget');
        const chatbotToggle = document.getElementById('chatbotToggle');
        if (chatbotWidget.classList.contains('active') && 
            !chatbotWidget.contains(e.target) && 
            !chatbotToggle.contains(e.target)) {
            chatbotWidget.classList.remove('active');
            chatbotToggle.classList.remove('hidden');
        }
    });

    // ========================================
    // Lazy Loading Background Images
    // ========================================
    function initLazyBackgrounds() {
        const lazyBgElements = document.querySelectorAll('.lazy-bg');
        if (!lazyBgElements.length) return;
        
        const isMobile = window.innerWidth <= 768;
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const bgUrl = isMobile ? element.dataset.bgMobile : element.dataset.bgDesktop;
                    
                    const img = new Image();
                    img.onload = () => {
                        element.style.backgroundImage = `url('${bgUrl}')`;
                        element.style.backgroundSize = 'cover';
                        element.style.backgroundPosition = 'center';
                        element.classList.add('loaded');
                    };
                    img.src = bgUrl;
                    observer.unobserve(element);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyBgElements.forEach(element => {
            imageObserver.observe(element);
        });
    }
    
    initLazyBackgrounds();

    // ========================================
    // Initialize Chatbot
    // ========================================
    ChatbotUI.init();

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c Welcome to Brae Cottage Website ', 'background: #2c5f4f; color: white; font-size: 16px; padding: 10px;');
    console.log('%c Demo website built with HTML, CSS, and JavaScript ', 'color: #2c5f4f; font-size: 12px;');
    console.log('%c Powered by Cogniq & Gemini AI ', 'color: #d4a574; font-size: 12px; font-weight: bold;');
});

// ========================================
// Export Data
// ========================================
window.BraeCottage = {
    version: '1.0.0',
    initialized: true,
    contact: {
        email: 'stay@braecottageskye.co.uk',
        phone1: '01470 521245',
        phone2: '07932 329603',
        address: {
            street: 'East Bank',
            village: 'Winster',
            region: 'Peak District National Park',
            postcode: 'DE4 2DT',
            country: 'England'
        }
    }
};
