// Products Management System
class ProductsManager {
    constructor() {
        this.products = [];
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.currentLanguage = 'pt';
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupAutoPlay();
        this.setupEventListeners();
    }

    async loadProducts() {
        try {
            // Load products index
            const response = await fetch('data/products/index.json');
            const productsIndex = await response.json();
            
            // Load individual product files
            const productsPromises = productsIndex.products.map(async (productId) => {
                const productResponse = await fetch(`data/products/${productId}.json`);
                return await productResponse.json();
            });
            
            this.products = await Promise.all(productsPromises);
            
            // Render apenas o banner no início
            this.renderBanner();
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError();
        }
    }

    renderBanner() {
        const bannerContainer = document.getElementById('products-banner');
        const gridContainer = document.getElementById('products-grid');
        if (!bannerContainer || this.products.length === 0) return;
        // Mostra o banner e esconde o grid
        bannerContainer.style.display = 'block';
        if (gridContainer) gridContainer.style.display = 'none';
        bannerContainer.innerHTML = `
            <div class="banner-container">
                <div class="banner-slides">
                    ${this.products.map((product, index) => this.createBannerSlide(product, index)).join('')}
                </div>
                <div class="banner-controls">
                    <button class="banner-prev" onclick="productsManager.prevSlide()">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <div class="banner-dots">
                        ${this.products.map((_, index) => `
                            <span class="banner-dot ${index === 0 ? 'active' : ''}" onclick="productsManager.goToSlide(${index})"></span>
                        `).join('')}
                    </div>
                    <button class="banner-next" onclick="productsManager.nextSlide()">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
        this.showSlide(0);
    }

    createBannerSlide(product, index) {
        const lang = this.currentLanguage;
        // Usa placeholder se a imagem não existir ou for inválida
        const imageUrl = product.image || `images/products/${product.id}-logo.png`;
        const fallbackIcon = `<div class="banner-image-fallback"><i class="${product.icon}"></i></div>`;
        return `
            <div class="banner-slide" data-slide="${index}">
                <div class="banner-content">
                    <div class="banner-image">
                        <img src="${imageUrl}" alt="${product.name[lang]}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        ${fallbackIcon}
                    </div>
                    <div class="banner-text">
                        <h2 class="banner-title">${product.name[lang]}</h2>
                        <p class="banner-description">${product.shortDescription[lang]}</p>
                        <div class="banner-features">
                            ${product.features[lang].slice(0, 2).map(feature => `
                                <span class="banner-feature">
                                    <i class="fas fa-check"></i>
                                    ${feature}
                                </span>
                            `).join('')}
                        </div>
                        <div class="banner-actions">
                            ${product.url !== '#' ? `
                                <a href="${product.url}" target="_blank" class="btn btn-primary">
                                    <i class="fas fa-external-link-alt"></i>
                                    ${this.getText('products.visit')}
                                </a>
                            ` : `
                                <span class="btn btn-outline disabled">
                                    ${this.getText('products.coming_soon')}
                                </span>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    showSlide(index) {
        const slides = document.querySelectorAll('.banner-slide');
        const dots = document.querySelectorAll('.banner-dot');
        if (slides.length === 0) return;

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
                slide.style.opacity = '1';
            } else {
                slide.style.display = 'none';
                slide.style.opacity = '0';
            }
        });
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.products.length;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = this.currentSlide === 0 ? this.products.length - 1 : this.currentSlide - 1;
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    setupAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }

    setupEventListeners() {
        // Pause autoplay on hover
        const bannerContainer = document.getElementById('products-banner');
        if (bannerContainer) {
            bannerContainer.addEventListener('mouseenter', () => {
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                }
            });
            
            bannerContainer.addEventListener('mouseleave', () => {
                this.setupAutoPlay();
            });
        }
    }

    toggleGridView() {
        // Alterna entre banner e grid
        const banner = document.getElementById('products-banner');
        const grid = document.getElementById('products-grid');
        if (banner && grid) {
            if (grid.style.display === 'none' || !grid.style.display) {
                banner.style.display = 'none';
                grid.style.display = 'block';
            } else {
                grid.style.display = 'none';
                banner.style.display = 'block';
            }
        }
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        this.renderBanner();
    }

    getText(key) {
        const translations = {
            'products.visit': {
                'pt': 'Visitar',
                'en': 'Visit',
                'es': 'Visitar'
            },
            'products.coming_soon': {
                'pt': 'Em Breve',
                'en': 'Coming Soon',
                'es': 'Próximamente'
            },
            'products.view_all': {
                'pt': 'Ver Todos',
                'en': 'View All',
                'es': 'Ver Todos'
            }
        };
        
        return translations[key]?.[this.currentLanguage] || key;
    }

    showError() {
        const bannerContainer = document.getElementById('products-banner');
        const gridContainer = document.getElementById('products-grid');
        
        const errorMessage = `
            <div style="
                text-align: center;
                padding: 3rem;
                color: #666;
            ">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #FFD700; margin-bottom: 1rem;"></i>
                <h3>Erro ao carregar produtos</h3>
                <p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>
            </div>
        `;
        
        if (bannerContainer) bannerContainer.innerHTML = errorMessage;
        if (gridContainer) gridContainer.innerHTML = errorMessage;
    }
}

// ProductsManager will be initialized by SiteInitializer 