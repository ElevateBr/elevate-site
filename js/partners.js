// Partners Manager
class PartnersManager {
    constructor() {
        this.partnersContainer = document.getElementById('partners-container');
        this.partnersLoading = document.getElementById('partners-loading');
        this.partners = [];
        this.currentLanguage = 'pt';
        
        this.init();
    }

    init() {
        // Aguardar o i18n estar pronto
        if (window.i18n) {
            this.loadPartners();
        } else {
            // Aguardar o i18n ser inicializado
            const checkI18n = setInterval(() => {
                if (window.i18n) {
                    clearInterval(checkI18n);
                    this.loadPartners();
                }
            }, 100);
        }
        
        // Listener para redimensionamento da janela
        window.addEventListener('resize', () => {
            if (this.partners && this.partners.length > 0) {
                this.renderPartners(this.partners);
            }
        });
    }

    async loadPartners() {
        try {
            // Show loading
            this.showLoading();

            // Load partners from JSON files
            const partners = await this.fetchPartners();
            
            // Store partners for carousel
            this.partners = partners;
            
            // Hide loading
            this.hideLoading();
            
            // Check if there are any partners
            if (partners.length === 0) {
                this.hidePartnersSection();
            } else {
                this.showPartnersSection();
                this.renderPartners(partners);
            }
            
        } catch (error) {
            console.error('Error loading partners:', error);
            this.hideLoading();
            
            // Fallback: mostrar seção mesmo com erro, usando dados de exemplo
            const samplePartners = this.getSamplePartners();
            this.partners = samplePartners;
            this.showPartnersSection();
            this.renderPartners(samplePartners);
        }
    }

    async fetchPartners() {
        try {
            // Load partners index
            const response = await fetch('data/parceiros/index.json');
            const partnersIndex = await response.json();
            
            // Load individual partner files
            const partnersPromises = partnersIndex.partners.map(async (partnerId) => {
                const partnerResponse = await fetch(`data/parceiros/${partnerId}.json`);
                return await partnerResponse.json();
            });
            
            const partners = await Promise.all(partnersPromises);
            
            return partners;
            
        } catch (error) {
            console.error('Error fetching partners:', error);
            // Return sample data if files don't exist
            return this.getSamplePartners();
        }
    }

    getSamplePartners() {
        return [
            {
                id: 'startups',
                name: {
                    'pt': 'Startups',
                    'en': 'Startups',
                    'es': 'Startups'
                },
                description: {
                    'pt': 'Empresas inovadoras em crescimento',
                    'en': 'Innovative growing companies',
                    'es': 'Empresas innovadoras en crecimiento'
                },
                icon: 'fas fa-building',
                image: ''
            },
            {
                id: 'corporations',
                name: {
                    'pt': 'Corporações',
                    'en': 'Corporations',
                    'es': 'Corporaciones'
                },
                description: {
                    'pt': 'Grandes empresas em transformação digital',
                    'en': 'Large companies in digital transformation',
                    'es': 'Grandes empresas en transformación digital'
                },
                icon: 'fas fa-industry',
                image: ''
            },
            {
                id: 'ecommerce',
                name: {
                    'pt': 'E-commerce',
                    'en': 'E-commerce',
                    'es': 'E-commerce'
                },
                description: {
                    'pt': 'Plataformas de vendas online',
                    'en': 'Online sales platforms',
                    'es': 'Plataformas de ventas online'
                },
                icon: 'fas fa-shopping-cart',
                image: ''
            },
            {
                id: 'fintech',
                name: {
                    'pt': 'Fintech',
                    'en': 'Fintech',
                    'es': 'Fintech'
                },
                description: {
                    'pt': 'Empresas de tecnologia financeira',
                    'en': 'Financial technology companies',
                    'es': 'Empresas de tecnología financiera'
                },
                icon: 'fas fa-hospital',
                image: ''
            }
        ];
    }

    renderPartners(partners) {
        if (!this.partnersContainer) return;

        // Verificar se precisa de carrossel baseado na quantidade de parceiros
        const needsCarousel = this.shouldUseCarousel(partners);
        
        if (needsCarousel) {
            // Duplica os parceiros para carrossel
            const duplicatedPartners = [...partners, ...partners, ...partners];
            this.partnersContainer.innerHTML = duplicatedPartners.map(partner => this.createPartnerCard(partner)).join('');
            this.startCarousel();
        } else {
            // Parceiros fixos sem carrossel
            this.partnersContainer.innerHTML = partners.map(partner => this.createPartnerCard(partner)).join('');
            this.partnersContainer.style.transform = 'none';
        }
        
        // Adicionar event listeners para clique nos parceiros
        this.addPartnerClickListeners();
    }

    startCarousel() {
        if (!this.partnersContainer) return;
        
        let currentPosition = 0;
        const speed = 0.8; // pixels por frame - movimento mais rápido
        let isPaused = false;
        let animationId;
        
        const animate = () => {
            if (!isPaused) {
                currentPosition -= speed;
                
                // Calcular a largura de um conjunto completo de parceiros
                const totalWidth = this.partnersContainer.scrollWidth;
                const singleSetWidth = totalWidth / 3; // Dividido por 3 porque duplicamos 3 vezes
                
                // Reset mais rápido quando chegar ao final
                if (currentPosition <= -singleSetWidth) {
                    currentPosition = 0;
                }
                
                this.partnersContainer.style.transform = `translateX(${currentPosition}px)`;
            }
            animationId = requestAnimationFrame(animate);
        };
        
        // Pausar quando o mouse passar sobre o carrossel
        this.partnersContainer.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        
        this.partnersContainer.addEventListener('mouseleave', () => {
            isPaused = false;
        });
        
        requestAnimationFrame(animate);
    }

    shouldUseCarousel(partners) {
        // Se há menos de 4 parceiros, não precisa de carrossel
        if (partners.length < 4) {
            return false;
        }
        
        // Verificar se a largura total dos parceiros excede a largura da tela
        const estimatedPartnerWidth = 180; // 120px + 60px de margem
        const totalPartnersWidth = partners.length * estimatedPartnerWidth;
        const screenWidth = window.innerWidth;
        
        return totalPartnersWidth > screenWidth * 0.8; // 80% da largura da tela
    }

    createPartnerCard(partner) {
        // Garantir que sempre tenha um ícone válido
        const icon = partner.icon || 'fas fa-building';
        
        // Adicionar classe de clique se tiver website
        const clickableClass = partner.website ? 'clickable' : '';
        const cursorStyle = partner.website ? 'cursor: pointer;' : '';
        
        return `
            <div class="partner-card ${clickableClass}" data-partner-id="${partner.id}" data-website="${partner.website || ''}" style="${cursorStyle}">
                <div class="partner-logo">
                    ${partner.image ? 
                        `<img src="${partner.image}" alt="${partner.id}">` : 
                        `<i class="${icon}"></i>`
                    }
                </div>
            </div>
        `;
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        this.renderPartners(this.partners);
    }

    showLoading() {
        if (this.partnersLoading) {
            this.partnersLoading.style.display = 'block';
        }
        if (this.partnersContainer) {
            this.partnersContainer.style.display = 'none';
        }
    }

    hideLoading() {
        if (this.partnersLoading) {
            this.partnersLoading.style.display = 'none';
        }
        if (this.partnersContainer) {
            this.partnersContainer.style.display = 'flex';
        }
    }

    hidePartnersSection() {
        const partnersSection = document.getElementById('parceiros');
        if (partnersSection) {
            partnersSection.style.display = 'none';
        }
    }

    showPartnersSection() {
        const partnersSection = document.getElementById('parceiros');
        if (partnersSection) {
            partnersSection.style.display = 'block';
        }
    }

    addPartnerClickListeners() {
        if (!this.partnersContainer) return;
        
        const partnerCards = this.partnersContainer.querySelectorAll('.partner-card.clickable');
        
        partnerCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const website = card.getAttribute('data-website');
                if (website) {
                    // Abrir em nova aba
                    window.open(website, '_blank', 'noopener,noreferrer');
                }
            });
            
            // Adicionar efeito hover
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
                card.style.transition = 'transform 0.2s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });
    }

    showError() {
        this.hideLoading();
        if (this.partnersContainer) {
            this.partnersContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Erro ao carregar parceiros. Tente novamente mais tarde.</p>
                </div>
            `;
        }
    }
}

// PartnersManager will be initialized by SiteInitializer 