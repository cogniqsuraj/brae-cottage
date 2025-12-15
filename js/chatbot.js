// ========================================
// CHATBOT UI LOGIC
// ========================================

const ChatbotUI = {
    isTyping: false,
    
    init() {
        this.chatbotToggle = document.getElementById('chatbotToggle');
        this.chatbotWidget = document.getElementById('chatbotWidget');
        this.chatbotClose = document.getElementById('chatbotClose');
        this.chatbotClear = document.getElementById('chatbotClear');
        this.chatbotInput = document.getElementById('chatbotInput');
        this.chatbotSend = document.getElementById('chatbotSend');
        this.chatbotMessages = document.getElementById('chatbotMessages');
        this.chatbotBadge = document.querySelector('.chatbot-badge');
        this.suggestionChips = document.querySelectorAll('.suggestion-chip');
        
        this.setupEventListeners();
        this.showBadge();
    },
    
    setupEventListeners() {
        // Toggle chatbot
        this.chatbotToggle.addEventListener('click', () => this.toggleChatbot());
        this.chatbotClose.addEventListener('click', () => this.closeChatbot());
        
        // Clear chat
        this.chatbotClear.addEventListener('click', () => this.clearChat());
        
        // Send message
        this.chatbotSend.addEventListener('click', () => this.handleUserMessage());
        this.chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserMessage();
        });
        
        // Suggestion chips
        this.suggestionChips.forEach(chip => {
            chip.addEventListener('click', () => this.handleSuggestion(chip));
        });
    },
    
    toggleChatbot() {
        this.chatbotWidget.classList.toggle('active');
        if (this.chatbotWidget.classList.contains('active')) {
            this.chatbotInput.focus();
            this.chatbotToggle.classList.add('hidden');
            if (this.chatbotBadge) {
                this.chatbotBadge.style.display = 'none';
            }
        } else {
            this.chatbotToggle.classList.remove('hidden');
            if (this.chatbotBadge) {
                this.chatbotBadge.style.display = 'flex';
            }
        }
    },
    
    closeChatbot() {
        this.chatbotWidget.classList.remove('active');
        this.chatbotToggle.classList.remove('hidden');
        if (this.chatbotBadge) {
            this.chatbotBadge.style.display = 'flex';
        }
    },
    
    clearChat() {
        const messages = this.chatbotMessages.querySelectorAll('.chatbot-message');
        messages.forEach((msg, index) => {
            if (index > 0) msg.remove();
        });
        
        const notification = document.createElement('div');
        notification.textContent = 'Chat cleared';
        notification.style.cssText = `
            position: absolute;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            z-index: 10000;
            animation: fadeOut 2s forwards;
        `;
        this.chatbotWidget.appendChild(notification);
        setTimeout(() => notification.remove(), 2000);
    },
    
    async handleUserMessage() {
        const message = this.chatbotInput.value.trim();
        if (!message || this.isTyping) return;

        this.addMessage(message, true, false);
        this.chatbotInput.value = '';
        this.isTyping = true;
        this.showTyping();

        try {
            const response = await GeminiAPI.getAIResponse(message);
            this.hideTyping();
            this.addMessage(response, false, true);
        } catch (error) {
            this.hideTyping();
            this.addMessage("I'm having a little trouble connecting right now. Please try again.", false, false);
        } finally {
            this.isTyping = false;
        }
    },
    
    handleSuggestion(chip) {
        const question = chip.getAttribute('data-question');
        const questions = {
            'availability': 'Can you check availability?',
            'breakfast': 'Tell me about breakfast',
            'location': 'Where are you located?',
            'amenities': 'What amenities do you offer?'
        };
        
        this.chatbotInput.value = questions[question] || '';
        this.handleUserMessage();
    },
    
    addMessage(message, isUser = false, showButtons = false) {
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
        
        if (showButtons) {
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'chatbot-action-buttons';
            buttonsContainer.style.cssText = 'display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;';
            
            const buttons = [
                { text: '🏠 Rooms', section: '#accommodation' },
                { text: '📍 Location', section: '#location' },
                { text: '✨ Amenities', section: '#about' },
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
                
                button.addEventListener('click', () => {
                    const section = document.querySelector(btn.section);
                    if (section) {
                        this.chatbotWidget.classList.remove('active');
                        this.chatbotToggle.classList.remove('hidden');
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
        this.chatbotMessages.appendChild(messageDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    },
    
    showTyping() {
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
        this.chatbotMessages.appendChild(typingDiv);
        this.chatbotMessages.scrollTop = this.chatbotMessages.scrollHeight;
    },
    
    hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) typingIndicator.remove();
    },
    
    showBadge() {
        setTimeout(() => {
            if (this.chatbotBadge && !this.chatbotWidget.classList.contains('active')) {
                this.chatbotBadge.style.display = 'flex';
            }
        }, 3000);
    }
};
