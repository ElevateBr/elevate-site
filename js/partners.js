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

        // Sempre usar carrossel infinito quando houver mais de 1 parceiro
        const needsCarousel = partners.length > 1;
        
        if (needsCarousel) {
            // Duplica os parceiros suficientes vezes para criar loop infinito suave
            // Duplicar várias vezes para garantir transição suave sem espaços em branco
            // Mínimo de 4 cópias para garantir que sempre haja elementos visíveis dos dois lados
            const duplicatedPartners = [...partners, ...partners, ...partners, ...partners, ...partners];
            this.partnersContainer.innerHTML = duplicatedPartners.map(partner => this.createPartnerCard(partner)).join('');
            
            // Aguardar renderização antes de iniciar carrossel
            requestAnimationFrame(() => {
                this.startCarousel();
            });
        } else {
            // Parceiros fixos sem carrossel (apenas 1 parceiro)
            this.partnersContainer.innerHTML = partners.map(partner => this.createPartnerCard(partner)).join('');
            this.partnersContainer.style.transform = 'none';
        }
        
        // Adicionar event listeners para clique nos parceiros
        this.addPartnerClickListeners();
    }

    startCarousel() {
        if (!this.partnersContainer) return;
        
        // Limpar animação anterior se existir
        if (this.carouselAnimationId) {
            cancelAnimationFrame(this.carouselAnimationId);
        }
        
        // Aguardar um frame para garantir que os elementos estejam renderizados
        requestAnimationFrame(() => {
            // Calcular a largura real de um conjunto de parceiros
            const firstCard = this.partnersContainer.querySelector('.partner-card');
            if (!firstCard) return;
            
            // Obter a largura total de um conjunto de parceiros originais
            const originalPartnersCount = this.partners.length;
            
            // Calcular a largura de um card com margens usando getBoundingClientRect
            const cardRect = firstCard.getBoundingClientRect();
            const cardStyle = window.getComputedStyle(firstCard);
            const marginLeft = parseFloat(cardStyle.marginLeft) || 0;
            const marginRight = parseFloat(cardStyle.marginRight) || 0;
            const cardTotalWidth = cardRect.width + marginLeft + marginRight;
            
            // Largura de um conjunto completo de parceiros (uma cópia original)
            const singleSetWidth = originalPartnersCount * cardTotalWidth;
            
            // Posição inicial: começar na segunda cópia (posição -singleSetWidth)
            // Isso garante que quando o primeiro item sair pela esquerda, já haverá conteúdo visível à direita
            let currentPosition = -singleSetWidth;
            
            const speed = 0.5; // pixels por frame - velocidade suave
            let isPaused = false;
            
            const animate = () => {
                if (!isPaused) {
                    currentPosition -= speed;
                    
                    // Quando chegar ao final da segunda cópia (posição -singleSetWidth * 2),
                    // resetar para o início da segunda cópia novamente (-singleSetWidth)
                    // Isso cria um loop perfeito: quando a cópia 2 está saindo pela esquerda,
                    // a cópia 3 já está entrando pela direita, e ao resetar, a cópia 2 continua o fluxo
                    if (currentPosition <= -singleSetWidth * 2) {
                        currentPosition = currentPosition + singleSetWidth;
                    }
                    
                    this.partnersContainer.style.transform = `translateX(${currentPosition}px)`;
                }
                this.carouselAnimationId = requestAnimationFrame(animate);
            };
            
            // Remover event listeners antigos se existirem
            const oldMouseEnter = this.partnersContainer._mouseEnterHandler;
            const oldMouseLeave = this.partnersContainer._mouseLeaveHandler;
            
            if (oldMouseEnter) {
                this.partnersContainer.removeEventListener('mouseenter', oldMouseEnter);
            }
            if (oldMouseLeave) {
                this.partnersContainer.removeEventListener('mouseleave', oldMouseLeave);
            }
            
            // Criar novos handlers
            const mouseEnterHandler = () => {
                isPaused = true;
            };
            
            const mouseLeaveHandler = () => {
                isPaused = false;
            };
            
            // Armazenar referências para poder remover depois
            this.partnersContainer._mouseEnterHandler = mouseEnterHandler;
            this.partnersContainer._mouseLeaveHandler = mouseLeaveHandler;
            
            // Pausar quando o mouse passar sobre o carrossel
            this.partnersContainer.addEventListener('mouseenter', mouseEnterHandler);
            this.partnersContainer.addEventListener('mouseleave', mouseLeaveHandler);
            
            // Iniciar animação
            this.carouselAnimationId = requestAnimationFrame(animate);
        });
    }

    shouldUseCarousel(partners) {
        // Sempre usar carrossel se houver mais de 1 parceiro
        // Isso garante que todos os parceiros sejam exibidos em loop infinito
        return partners.length > 1;
    }

    createPartnerCard(partner) {
        // Garantir que sempre tenha um ícone válido
        const icon = partner.icon || 'fas fa-building';
        
        // Obter nome no idioma atual
        const partnerName = partner.name && partner.name[this.currentLanguage] 
            ? partner.name[this.currentLanguage] 
            : (partner.name && typeof partner.name === 'string' ? partner.name : partner.id);
        
        // Adicionar classe de clique se tiver website
        const clickableClass = partner.website ? 'clickable' : '';
        const cursorStyle = partner.website ? 'cursor: pointer;' : '';
        
        const hasImage = !!partner.image;
        const nameFallbackClass = hasImage ? '' : 'partner-card-no-logo';
        
        return `
            <div class="partner-card ${clickableClass} ${nameFallbackClass}" data-partner-id="${partner.id}" data-website="${partner.website || ''}" style="${cursorStyle}">
                <div class="partner-logo">
                    ${partner.image ? 
                        `<img src="${partner.image}" alt="${partner.id}">` : 
                        `<div class="partner-name-fallback">
                            <i class="${icon}"></i>
                            <span class="partner-name-text">${partnerName}</span>
                        </div>`
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