// Contact Form Management
// Handles form validation, submission, and user interactions

class ContactManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = null;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        if (this.form) {
            this.submitButton = this.form.querySelector('button[type="submit"]');
            this.setupFormValidation();
            this.setupFormSubmission();
            this.setupAutoSave();
            this.setupPhoneMask();
        }
    }

    // Setup form validation
    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            // Real-time validation on input
            input.addEventListener('input', () => {
                this.validateField(input);
            });

            // Validation on blur
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            // Clear validation on focus
            input.addEventListener('focus', () => {
                this.clearFieldError(input);
            });
        });
    }

    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous validation states
        this.clearFieldError(field);
        field.classList.remove('error', 'success');

        // Skip validation if field is empty (except required fields)
        if (!value && !field.hasAttribute('required')) {
            return;
        }

        // Validation rules
        switch (fieldName) {
            case 'nome':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Nome é obrigatório';
                } else if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Nome deve conter apenas letras';
                }
                break;

            case 'email':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Email é obrigatório';
                } else {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Email inválido';
                    }
                }
                break;

            case 'telefone':
                if (value) {
                    const phoneRegex = /^[\d\s\(\)\-\+]+$/;
                    if (!phoneRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Telefone deve conter apenas números, espaços, parênteses, hífens e +';
                    } else if (value.replace(/\D/g, '').length < 10) {
                        isValid = false;
                        errorMessage = 'Telefone deve ter pelo menos 10 dígitos';
                    }
                }
                break;

            case 'empresa':
                if (value && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Nome da empresa deve ter pelo menos 2 caracteres';
                }
                break;

            case 'mensagem':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Mensagem é obrigatória';
                } else if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
                } else if (value.length > 1000) {
                    isValid = false;
                    errorMessage = 'Mensagem deve ter no máximo 1000 caracteres';
                }
                break;
        }

        // Apply validation result
        if (isValid && value) {
            field.classList.add('success');
        } else if (!isValid) {
            field.classList.add('error');
            this.showFieldError(field, errorMessage);
        }
    }

    // Show field error message
    showFieldError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
        `;
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;

        field.parentNode.appendChild(errorDiv);
    }

    // Clear field error
    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // Setup form submission
    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });
    }

    // Handle form submission
    async handleFormSubmission() {
        if (this.isSubmitting) return;

        // Validate all fields
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            this.validateField(input);
            if (input.classList.contains('error')) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        // Show loading state
        this.isSubmitting = true;
        this.submitButton.classList.add('loading');
        this.submitButton.textContent = 'Enviando...';
        this.submitButton.disabled = true;

        try {
            // Collect form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());

            // Simulate API call (replace with actual endpoint)
            await this.submitToAPI(data);

            // Success
            this.showNotification(window.i18n.getText('form.email_opened'), 'success');
            this.resetForm();
            this.saveFormData({}); // Clear saved data

        } catch (error) {
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            // Reset button state
            this.isSubmitting = false;
            this.submitButton.classList.remove('loading');
            this.submitButton.textContent = 'Enviar Mensagem';
            this.submitButton.disabled = false;
        }
    }

    // Open default email client with formatted message
    async submitToAPI(data) {
        try {
            // Format email content
            const subject = encodeURIComponent('Contato - Site Elevate');
            const body = encodeURIComponent(this.formatEmailBody(data));
            
            // Create mailto link
            const mailtoLink = `mailto:contato@elevatebr.org?subject=${subject}&body=${body}`;
            
            // Open default email client
            window.open(mailtoLink, '_blank');
            
            console.log('Email client opened successfully');
            return { success: true };

        } catch (error) {
            console.error('Error opening email client:', error);
            throw new Error(window.i18n.getText('form.email_error'));
        }
    }

    // Format email body
    formatEmailBody(data) {
        const currentDate = new Date().toLocaleDateString('pt-BR');
        const currentTime = new Date().toLocaleTimeString('pt-BR');
        
        return `
Nova mensagem do site Elevate

Data: ${currentDate} às ${currentTime}

Dados do contato:
Nome: ${data.nome}
E-mail: ${data.email}
Telefone: ${data.telefone || 'Não informado'}
Empresa: ${data.empresa || 'Não informado'}

Mensagem:
${data.mensagem}

---
Enviado através do formulário de contato do site Elevate
        `.trim();
    }

    // Reset form
    resetForm() {
        this.form.reset();
        
        // Clear validation states
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('success', 'error');
            this.clearFieldError(input);
        });

        // Reset character counter
        const textarea = this.form.querySelector('textarea');
        if (textarea) {
            this.updateCharacterCounter(textarea);
        }
    }

    // Setup auto-save functionality
    setupAutoSave() {
        const inputs = this.form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.saveFormData();
            });
        });

        // Load saved data on page load
        this.loadSavedData();
    }

    // Save form data to localStorage
    saveFormData(overrideData = null) {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        const dataToSave = overrideData || data;
        localStorage.setItem('contactFormData', JSON.stringify(dataToSave));
    }

    // Load saved form data
    loadSavedData() {
        const savedData = localStorage.getItem('contactFormData');
        
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                
                Object.keys(data).forEach(key => {
                    const field = this.form.querySelector(`[name="${key}"]`);
                    if (field && data[key]) {
                        field.value = data[key];
                    }
                });
            } catch (error) {
                console.error('Error loading saved form data:', error);
            }
        }
    }

    // Setup phone number mask
    setupPhoneMask() {
        const phoneInput = this.form.querySelector('input[name="telefone"]');
        
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 0) {
                    // Brazilian phone number format
                    if (value.length <= 2) {
                        value = `(${value}`;
                    } else if (value.length <= 6) {
                        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
                    } else if (value.length <= 10) {
                        value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
                    } else {
                        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
                    }
                }
                
                e.target.value = value;
            });
        }
    }

    // Setup character counter for textarea
    setupCharacterCounter() {
        const textarea = this.form.querySelector('textarea[name="mensagem"]');
        
        if (textarea) {
            // Create counter element
            const counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.cssText = `
                font-size: 0.75rem;
                color: #9ca3af;
                text-align: right;
                margin-top: 0.25rem;
            `;
            
            textarea.parentNode.appendChild(counter);
            
            // Update counter on input
            textarea.addEventListener('input', () => {
                this.updateCharacterCounter(textarea, counter);
            });
            
            // Initial counter update
            this.updateCharacterCounter(textarea, counter);
        }
    }

    // Update character counter
    updateCharacterCounter(textarea, counter) {
        if (!counter) {
            counter = textarea.parentNode.querySelector('.char-counter');
        }
        
        if (counter) {
            const currentLength = textarea.value.length;
            const maxLength = 1000;
            const remaining = maxLength - currentLength;
            
            counter.textContent = `${currentLength}/${maxLength} caracteres`;
            
            if (remaining < 50) {
                counter.style.color = '#ef4444';
            } else if (remaining < 100) {
                counter.style.color = '#f59e0b';
            } else {
                counter.style.color = '#9ca3af';
            }
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        if (window.SiteElevate && window.SiteElevate.showNotification) {
            window.SiteElevate.showNotification(message, type);
        } else {
            // Fallback notification
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem;
                border-radius: 0.5rem;
                color: white;
                font-weight: 500;
                z-index: 3000;
                max-width: 300px;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            `;
            
            if (type === 'success') {
                notification.style.backgroundColor = '#10b981';
            } else if (type === 'error') {
                notification.style.backgroundColor = '#ef4444';
            } else {
                notification.style.backgroundColor = '#3b82f6';
            }
            
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.style.transform = 'translateX(0)';
            }, 100);
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 5000);
        }
    }

    // Validate entire form
    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            this.validateField(input);
            if (input.classList.contains('error')) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Get form data as object
    getFormData() {
        const formData = new FormData(this.form);
        return Object.fromEntries(formData.entries());
    }

    // Set form data
    setFormData(data) {
        Object.keys(data).forEach(key => {
            const field = this.form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key];
                this.validateField(field);
            }
        });
    }

    // Clear form data
    clearFormData() {
        this.form.reset();
        localStorage.removeItem('contactFormData');
        
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('success', 'error');
            this.clearFieldError(input);
        });
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
});

// Export for global access
window.ContactManager = ContactManager; 