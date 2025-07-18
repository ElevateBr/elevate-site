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
        
        // Setup mobile expansion functionality
        this.setupMobileExpansion();
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
        
        // O botão de expandir só aparece no mobile
        const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
        // O botão sempre aparece, mas a posição depende do estado do card
        const expandBtn = `<span class="servico-expand-btn" tabindex="0" aria-label="${this.getText('services.see_more')}">${this.getText('services.see_more')}</span>`;
        return `
            <div class="servico-card compact" data-service-id="${service.id}">
                <div class="servico-header">
                    <div class="servico-icon">
                        <i class="${service.icon}"></i>
                    </div>
                    <h3 class="servico-title">${service.name[lang]}</h3>
                </div>
                <p class="servico-description">${service.description[lang]}</p>
                ${isMobile ? expandBtn : ''}
                <div class="servico-features">
                    ${service.features[lang].map(feature => `
                        <span class="feature-tag">${feature}</span>
                    `).join('')}
                </div>
            </div>
        `;
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
            },
            'services.see_more': {
                'pt': 'Ver mais',
                'en': 'See more',
                'es': 'Ver más'
            },
            'services.see_less': {
                'pt': 'Ver menos',
                'en': 'See less',
                'es': 'Ver menos'
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

    setupMobileExpansion() {
        const serviceCards = document.querySelectorAll('.servico-card');
        serviceCards.forEach(card => {
            // Remover listeners antigos
            card.replaceWith(card.cloneNode(true));
        });
        // Re-selecionar após clone
        const newCards = document.querySelectorAll('.servico-card');
        newCards.forEach(card => {
            // Clique no card (mobile): expande/contrai
            card.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    // Só expande se não clicar no botão
                    if (!e.target.classList.contains('servico-expand-btn')) {
                        this.toggleServiceExpansion(card);
                    }
                }
            });
            // Clique no botão de expandir/contrair
            const expandBtn = card.querySelector('.servico-expand-btn');
            if (expandBtn) {
                expandBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggleServiceExpansion(card);
                });
                expandBtn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        this.toggleServiceExpansion(card);
                    }
                });
            }
        });
    }
    
    toggleServiceExpansion(clickedCard) {
        const allCards = document.querySelectorAll('.servico-card');
        
        allCards.forEach(card => {
            if (card === clickedCard) {
                // Toggle the clicked card
                if (card.classList.contains('expanded')) {
                    card.classList.remove('expanded');
                    card.classList.add('compact');
                    // Atualizar botão para "Ver mais"
                    const btn = card.querySelector('.servico-expand-btn');
                    if (btn) btn.textContent = this.getText('services.see_more');
                } else {
                    card.classList.remove('compact');
                    card.classList.add('expanded');
                    // Atualizar botão para "Ver menos" e mover para depois das features
                    let btn = card.querySelector('.servico-expand-btn');
                    if (btn) btn.textContent = this.getText('services.see_less');
                    // Mover botão para depois das features
                    const features = card.querySelector('.servico-features');
                    if (btn && features) features.after(btn);
                }
            } else {
                // Collapse all other cards
                card.classList.remove('expanded');
                card.classList.add('compact');
                // Atualizar botão para "Ver mais"
                const btn = card.querySelector('.servico-expand-btn');
                if (btn) btn.textContent = this.getText('services.see_more');
            }
        });
        
        // Scroll to the expanded card if it's not fully visible
        if (clickedCard.classList.contains('expanded')) {
            setTimeout(() => {
                clickedCard.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }, 300);
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