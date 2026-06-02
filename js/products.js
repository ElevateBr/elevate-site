// Products Management System
class ProductsManager {
    constructor() {
        this.products = [];
        this.currentLanguage = 'pt';
        this.init();
    }

    init() {
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const response = await fetch('data/products/index.json');
            const productsIndex = await response.json();

            const productsPromises = productsIndex.products.map(async (productId) => {
                const productResponse = await fetch(`data/products/${productId}.json`);
                return await productResponse.json();
            });

            this.products = await Promise.all(productsPromises);
            this.renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
            this.showError();
        }
    }

    renderProducts() {
        const container = document.getElementById('products-banner');
        if (!container || this.products.length === 0) return;

        container.className = 'products-strip';
        container.setAttribute('role', 'list');
        container.innerHTML = `
            <div class="products-strip-inner">
                ${this.products.map((product) => this.createProductSection(product)).join('')}
            </div>
        `;

        const sections = container.querySelectorAll('.product-section');
        if (window.observeAnimatedElements) {
            window.observeAnimatedElements(sections);
        } else {
            sections.forEach((el) => el.classList.add('animate-in'));
        }
    }

    createProductSection(product) {
        const lang = this.currentLanguage;
        const name = product.name?.[lang] || product.name?.pt || product.id;
        const shortDesc = product.shortDescription?.[lang] || product.shortDescription?.pt || '';
        const imageUrl = product.image || `images/products/${product.id}-logo.png`;
        const features = (product.features?.[lang] || product.features?.pt || []).slice(0, 3);
        const isComingSoon = product.url === '#';

        return `
            <article class="product-section" role="listitem">
                <div class="product-section-media">
                    <img
                        src="${imageUrl}"
                        alt="${name}"
                        loading="lazy"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    >
                    <div class="product-section-media-fallback" aria-hidden="true">
                        <i class="${product.icon}"></i>
                    </div>
                </div>
                <div class="product-section-body">
                    <h3 class="product-section-title">${name}</h3>
                    <p class="product-section-desc">${shortDesc}</p>
                    ${features.length ? `
                        <ul class="product-section-features">
                            ${features.map((feature) => `
                                <li><i class="fas fa-check" aria-hidden="true"></i>${feature}</li>
                            `).join('')}
                        </ul>
                    ` : ''}
                    <div class="product-section-actions">
                        ${isComingSoon ? `
                            <span class="btn btn-outline disabled btn-sm">
                                ${this.getText('products.coming_soon')}
                            </span>
                        ` : `
                            <a href="${product.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                                <i class="fas fa-external-link-alt" aria-hidden="true"></i>
                                ${this.getText('products.visit')}
                            </a>
                        `}
                    </div>
                </div>
            </article>
        `;
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        this.renderProducts();
    }

    getText(key) {
        const translations = {
            'products.visit': {
                pt: 'Visitar',
                en: 'Visit',
                es: 'Visitar',
                it: 'Visita'
            },
            'products.coming_soon': {
                pt: 'Em Breve',
                en: 'Coming Soon',
                es: 'Próximamente',
                it: 'Prossimamente'
            }
        };

        return translations[key]?.[this.currentLanguage] || translations[key]?.pt || key;
    }

    showError() {
        const container = document.getElementById('products-banner');
        if (!container) return;

        container.className = 'products-strip';
        container.innerHTML = `
            <div class="products-strip-error">
                <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
                <h3>Erro ao carregar produtos</h3>
                <p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>
            </div>
        `;
    }
}

// ProductsManager will be initialized by SiteInitializer
