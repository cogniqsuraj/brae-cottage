// ========================================
// NAVIGATION & SCROLL EFFECTS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Chatbot Elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotSuggestions = document.getElementById('chatbotSuggestions');
    const chatbotBadge = document.querySelector('.chatbot-badge');

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
    });

    // ========================================
    // Smooth Scrolling & Active Link
    // ========================================
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
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
    
    const sections = document.querySelectorAll('section[id]');
    
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
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            checkin: document.getElementById('checkin').value,
            checkout: document.getElementById('checkout').value,
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value
        };
        
        // Validate dates
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
        
        // Simulate form submission
        console.log('Form submitted with data:', formData);
        
        // In a real application, you would send this data to a server
        // For demo purposes, we'll just show the success message
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Reset form after 5 seconds and show it again
        setTimeout(function() {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.classList.remove('show');
        }, 5000);
    });

    // ========================================
    // Set Minimum Date for Check-in
    // ========================================
    
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format date as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    checkinInput.setAttribute('min', formatDate(today));
    checkoutInput.setAttribute('min', formatDate(tomorrow));
    
    // Update checkout minimum when check-in changes
    checkinInput.addEventListener('change', function() {
        const selectedCheckin = new Date(this.value);
        const nextDay = new Date(selectedCheckin);
        nextDay.setDate(nextDay.getDate() + 1);
        checkoutInput.setAttribute('min', formatDate(nextDay));
        
        // Reset checkout if it's before the new minimum
        if (checkoutInput.value && new Date(checkoutInput.value) <= selectedCheckin) {
            checkoutInput.value = '';
        }
    });

    // ========================================
    // Gallery Lightbox Effect (Simple)
    // ========================================
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, you would open a lightbox/modal here
            // For this demo, we'll just add a visual feedback
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    // ========================================
    // Intersection Observer for Scroll Animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-item, .review-card, .gallery-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(element);
    });

    // ========================================
    // Room Card Animation
    // ========================================
    
    const roomCard = document.querySelector('.room-card');
    if (roomCard) {
        roomCard.style.opacity = '0';
        roomCard.style.transform = 'translateY(30px)';
        roomCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(roomCard);
    }

    // ========================================
    // Smooth Reveal for Section Headers
    // ========================================
    
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
        header.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(header);
    });

    // ========================================
    // Email & Phone Link Click Analytics
    // ========================================
    
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkType = this.getAttribute('href').startsWith('mailto:') ? 'Email' : 'Phone';
            const linkValue = this.getAttribute('href').replace('mailto:', '').replace('tel:', '');
            console.log(`${linkType} clicked: ${linkValue}`);
            // In a real application, you would send this to analytics
        });
    });

    // ========================================
    // FAQ Accordion (if needed in future)
    // ========================================
    
    function createAccordion(selector) {
        const accordionItems = document.querySelectorAll(selector);
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            if (header) {
                header.addEventListener('click', function() {
                    const activeItem = document.querySelector(`${selector}.active`);
                    
                    if (activeItem && activeItem !== item) {
                        activeItem.classList.remove('active');
                    }
                    
                    item.classList.toggle('active');
                });
            }
        });
    }

    // ========================================
    // Availability Calendar Helper (Placeholder)
    // ========================================
    
    function checkAvailability(checkin, checkout) {
        // This would connect to a backend API in a real implementation
        // For now, it's a placeholder function
        console.log('Checking availability from', checkin, 'to', checkout);
        return true; // Always available in demo
    }

    // ========================================
    // Utility Functions
    // ========================================
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ========================================
    // Performance Optimization
    // ========================================
    
    // Use throttled scroll handler for better performance
    const throttledScroll = throttle(function() {
        // Scroll-dependent operations here
    }, 100);
    
    window.addEventListener('scroll', throttledScroll);

    // ========================================
    // Console Welcome Message
    // ========================================
    
    console.log('%c Welcome to Brae Cottage Website ', 'background: #2c5f4f; color: white; font-size: 16px; padding: 10px;');
    console.log('%c Demo website built with HTML, CSS, and JavaScript ', 'color: #2c5f4f; font-size: 12px;');
    console.log('%c Powered by Cogniq & Gemini AI ', 'color: #d4a574; font-size: 12px; font-weight: bold;');

});

// ========================================
// AI CHATBOT FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotBadge = document.querySelector('.chatbot-badge');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');

    let messageCount = 0;
    let isTyping = false;

    // AI Knowledge Base - Brae Cottage Information
    // This context is sent to the AI model
    const hotelContext = `
    Brae Cottage Information:
    - Location: Winster, Peak District National Park (DE4 2DT). ~1hr from Manchester, 45min from Sheffield.
    - Accommodation: 2 rooms in separate annex (The Garden Suite, The Village View).
    - Amenities: En-suite, tea/coffee, garden views, private parking. NO WiFi/Mobile signal (Digital Detox).
    - Breakfast: Included. Homemade, local ingredients, full English/vegetarian options.
    - Contact: stay@braecottageskye.co.uk | 01470 521245 / 07932 329603.
    - Policies: Check-in/out times arranged on booking. No pets policy (contact to discuss).
    - Activities: Walking trails, Chatsworth House, Winster village, local pubs.
    `;

    // ========================================
    // Chatbot Toggle
    // ========================================

    chatbotToggle.addEventListener('click', function() {
        chatbotWidget.classList.toggle('active');
        if (chatbotWidget.classList.contains('active')) {
            chatbotInput.focus();
            // Hide toggle button and badge when opening chatbot
            chatbotToggle.classList.add('hidden');
            if (chatbotBadge) {
                chatbotBadge.style.display = 'none';
            }
        } else {
            // Show toggle button and badge when closing chatbot
            chatbotToggle.classList.remove('hidden');
            if (chatbotBadge) {
                chatbotBadge.style.display = 'flex';
            }
        }
    });

    chatbotClose.addEventListener('click', function() {
        chatbotWidget.classList.remove('active');
        // Show toggle button and badge when closing via X button
        chatbotToggle.classList.remove('hidden');
        if (chatbotBadge) {
            chatbotBadge.style.display = 'flex';
        }
    });

    // ========================================
    // AI Response Logic (Gemini Integration)
    // ========================================

    const API_KEY = "AIzaSyBtNlyVc4pKoa1-t3UJgfc3F2PYy-O7pg0";

async function getAIResponse(userMessage) {
    const cottageInfo = `You are the friendly AI assistant for Brae Cottage, a cozy B&B in Winster, Peak District.
        
    Key Details:
    - Location: Winster, Peak District.
    - Vibe: Cozy, historic, digital detox (no Wi-Fi), nature-focused.
    - Amenities: Wood burner, garden, walks nearby.
    - Policies: No pets, no smoking.
    
    Your Goal: Answer visitor questions warmly and accurately based on this info. 
    ALWAYS be warm and welcoming. If the user says "hi" or "hello", respond with a special warm welcome to Brae Cottage.
    If you don't know something, suggest they contact the host directly. 
    Keep answers concise (under 3 sentences).`;

    try {
        // Using v1beta/gemini-2.5-flash (Latest model)
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${cottageInfo}\n\nUser: ${userMessage}\n\nAssistant:`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 200
                    }
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("❌ API Error:", JSON.stringify(data, null, 2));
            return `AI Error: ${data.error?.message || response.statusText}`;
        }

        console.log("✅ AI Response received successfully");
        return (
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "I'm having a little trouble thinking right now. Please try again."
        );
    } catch (err) {
        console.error("❌ Network Error:", err);
        return `Connection Error: ${err.message}`;
    }
}


    // ========================================
    // Add Message to Chat
    // ========================================

    function addMessage(message, isUser = false, showButtons = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isUser ? '👤' : '🏡';

        const content = document.createElement('div');
        content.className = 'message-content';

        const text = document.createElement('p');
        text.innerHTML = message.replace(/\n/g, '<br>');

        const time = document.createElement('span');
        time.className = 'message-time';
        const now = new Date();
        time.textContent = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

        content.appendChild(text);
        content.appendChild(time);
        
        // Add navigation buttons if requested
        if (showButtons) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'chatbot-action-buttons';
            buttonsContainer.style.cssText = 'display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;';
            
            const buttons = [
                { text: '🏠 Rooms', section: '#rooms' },
                { text: '📍 Location', section: '#location' },
                { text: '✨ Amenities', section: '#amenities' },
                { text: '📞 Contact', section: '#contact' }
            ];
            
            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.textContent = btn.text;
                button.style.cssText = `
                    padding: 8px 12px;
                    background: linear-gradient(135deg, #2c5f4f 0%, #1a3d31 100%);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 500;
                    transition: transform 0.2s, box-shadow 0.2s;
                `;
                
                button.addEventListener('mouseover', () => {
                    button.style.transform = 'translateY(-2px)';
                    button.style.boxShadow = '0 4px 12px rgba(44, 95, 79, 0.3)';
                });
                
                button.addEventListener('mouseout', () => {
                    button.style.transform = 'translateY(0)';
                    button.style.boxShadow = 'none';
                });
                
                button.addEventListener('click', () => {
                    const section = document.querySelector(btn.section);
                    if (section) {
                        chatbotWidget.classList.remove('active');
                        chatbotToggle.classList.remove('hidden');
                        const offsetTop = section.offsetTop - 70;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
                
                buttonsContainer.appendChild(button);
            });
            
            content.appendChild(buttonsContainer);
        }

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);

        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // ========================================
    // Show Typing Indicator
    // ========================================

    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-typing active';
        typingDiv.id = 'typingIndicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🏡';

        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            dot.className = 'typing-dot';
            indicator.appendChild(dot);
        }

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(indicator);
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // ========================================
    // Handle User Message
    // ========================================

    async function handleUserMessage() {
        const message = chatbotInput.value.trim();
        if (!message || isTyping) return;

        // Add user message
        addMessage(message, true, false);
        chatbotInput.value = '';

        // Show typing indicator
        isTyping = true;
        showTyping();

        try {
            // Call Gemini API
            const response = await getAIResponse(message);
            
            // Hide typing and show response with navigation buttons
            hideTyping();
            addMessage(response, false, true);
        } catch (error) {
            hideTyping();
            addMessage("I'm having a little trouble connecting right now. Please try again.", false, false);
        } finally {
            isTyping = false;
        }
    }

    // ========================================
    // Send Button Click
    // ========================================

    chatbotSend.addEventListener('click', handleUserMessage);

    // ========================================
    // Enter Key to Send
    // ========================================

    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // ========================================
    // Suggestion Chips
    // ========================================

    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            let messageText = '';

            switch(question) {
                case 'availability':
                    messageText = 'Can you check availability?';
                    break;
                case 'breakfast':
                    messageText = 'Tell me about breakfast';
                    break;
                case 'location':
                    messageText = 'Where are you located?';
                    break;
                case 'amenities':
                    messageText = 'What amenities do you offer?';
                    break;
            }

            chatbotInput.value = messageText;
            handleUserMessage();
        });
    });

    // ========================================
    // Show notification badge after 3 seconds
    // ========================================

    setTimeout(() => {
        if (chatbotBadge && !chatbotWidget.classList.contains('active')) {
            chatbotBadge.style.display = 'flex';
        }
    }, 3000);

    // ========================================
    // Scroll to Top Button
    // ========================================
    
    const scrollTopBtn = document.getElementById('scrollTop');
    
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
            behavior: 'smooth'
        });
    });

    // ========================================
    // Click Outside Handling
    // ========================================
    
    document.addEventListener('click', function(e) {
        // Close Mobile Menu if clicked outside
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close Chatbot if clicked outside
        if (chatbotWidget.classList.contains('active') && 
            !chatbotWidget.contains(e.target) && 
            !chatbotToggle.contains(e.target)) {
            chatbotWidget.classList.remove('active');
            chatbotToggle.classList.remove('hidden');
        }
    });

    // ========================================
    // UI Conflict Management
    // ========================================
    
    // When opening mobile menu, close chatbot
    hamburger.addEventListener('click', function() {
        if (chatbotWidget.classList.contains('active')) {
            chatbotWidget.classList.remove('active');
            chatbotToggle.classList.remove('hidden');
        }
    });
    
    // When opening chatbot, close mobile menu
    chatbotToggle.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

});

// ========================================
// Export functions for potential future use
// ========================================

// These could be used if the site expands to multiple pages
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
