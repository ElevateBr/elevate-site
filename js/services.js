// Services Management System
class ServicesManager {
    constructor() {
        this.services = [];
        this.currentLanguage = 'pt'; // Default language
        
        this.init();
    }

    init() {
        // Aguardar i18n estar pronto se necessário
        if (window.i18n) {
            this.currentLanguage = window.i18n.currentLang;
            this.loadServices();
            this.setupEventListeners();
        } else {
            // Aguardar i18n estar pronto
            const checkI18n = setInterval(() => {
                if (window.i18n) {
                    clearInterval(checkI18n);
                    this.currentLanguage = window.i18n.currentLang;
                    this.loadServices();
                    this.setupEventListeners();
                }
            }, 100);
        }
    }

    async loadServices() {
        try {
            // Load services index
            const response = await fetch('data/services/index.json');
            const servicesIndex = await response.json();
            
            // Load individual service files
            const servicesPromises = servicesIndex.services.map(async (serviceId) => {
                const serviceResponse = await fetch(`data/services/${serviceId}.json`);
                const serviceData = await serviceResponse.json();
                return serviceData;
            });
            
            this.services = await Promise.all(servicesPromises);
            
            // Hide loading and render services
            this.hideLoading();
            this.renderServices();
        } catch (error) {
            console.error('Error loading services:', error);
            this.showError();
        }
    }

    renderServices() {
        const servicesContainer = document.getElementById('servicos-container');
        const footerServicesLinks = document.getElementById('footer-services-links');
        
        if (!servicesContainer || this.services.length === 0) {
            return;
        }

        const servicesHTML = `
            <div class="servicos-grid">
                ${this.services.map(service => this.createServiceCard(service)).join('')}
            </div>
        `;
        
        servicesContainer.innerHTML = servicesHTML;

        // Update footer services links
        if (footerServicesLinks) {
            footerServicesLinks.innerHTML = this.services.map(service => `
                <li><a href="#servicos">${service.name[this.currentLanguage]}</a></li>
            `).join('');
        }
    }

    createServiceCard(service) {
        const lang = this.currentLanguage;
        
        // Verificar se os dados estão corretos
        if (!service.name || !service.name[lang]) {
            console.error('ServicesManager: Missing name for service:', service.id, 'in language:', lang);
            return '';
        }
        
        if (!service.description || !service.description[lang]) {
            console.error('ServicesManager: Missing description for service:', service.id, 'in language:', lang);
            return '';
        }
        
        if (!service.features || !service.features[lang]) {
            console.error('ServicesManager: Missing features for service:', service.id, 'in language:', lang);
            return '';
        }
        
        const cardHTML = `
            <div class="servico-card" data-service-id="${service.id}">
                <div class="servico-header">
                    <div class="servico-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h3 class="servico-title">${service.name[lang]}</h3>
                </div>
                <p class="servico-description">${service.description[lang]}</p>
                <div class="servico-features">
                    ${service.features[lang].map(feature => `
                        <span class="feature-tag">${feature}</span>
                    `).join('')}
                </div>
            </div>
        `;
        
        return cardHTML;
    }

    setupEventListeners() {
        // Listen for language changes
        document.addEventListener('languageChanged', (event) => {
            this.currentLanguage = event.detail.language;
            this.renderServices();
        });
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        this.renderServices();
    }

    getText(key) {
        const translations = {
            'services.visit': {
                'pt': 'Visitar',
                'en': 'Visit',
                'es': 'Visitar'
            },
            'services.coming_soon': {
                'pt': 'Em Breve',
                'en': 'Coming Soon',
                'es': 'Próximamente'
            }
        };
        
        return translations[key]?.[this.currentLanguage] || key;
    }

    hideLoading() {
        const loadingElement = document.getElementById('servicos-loading');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
    }

    showError() {
        this.hideLoading();
        const servicesContainer = document.getElementById('servicos-container');
        if (servicesContainer) {
            servicesContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Erro ao carregar serviços. Tente novamente mais tarde.</p>
                </div>
            `;
        }
    }
}

// ServicesManager will be initialized by SiteInitializer 