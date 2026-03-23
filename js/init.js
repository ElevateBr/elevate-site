// Splash / Tela de boas-vindas
function initSplash() {
    const splash = document.getElementById('splash');
    if (!splash) return;

    function hideSplash() {
        splash.classList.add('splash--hidden');
        splash.setAttribute('aria-hidden', 'true');
        setTimeout(() => splash.remove(), 600);
    }

    const duration = 2500;
    const timer = setTimeout(hideSplash, duration);

    splash.addEventListener('click', () => {
        clearTimeout(timer);
        hideSplash();
    }, { once: true });

    document.addEventListener('keydown', () => {
        clearTimeout(timer);
        hideSplash();
    }, { once: true });
}

// Initialization Script
class SiteInitializer {
    constructor() {
        this.initialized = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initSplash();
                this.initializeManagers();
            });
        } else {
            initSplash();
            this.initializeManagers();
        }
    }

    initializeManagers() {
        
        // Aguardar i18n estar pronto
        const checkI18n = setInterval(() => {
            if (window.i18n) {
                clearInterval(checkI18n);
                this.startManagers();
            }
        }, 100);
    }

    startManagers() {
        try {
            // Inicializar Products Manager
            if (!window.productsManager) {
                window.productsManager = new ProductsManager();
            }

            // Inicializar Services Manager
            if (!window.servicesManager) {
                window.servicesManager = new ServicesManager();
            }

            // Inicializar Vagas Manager
            if (!window.vagasManager) {
                window.vagasManager = new VagasManager();
            }

            // Inicializar Partners Manager
            if (!window.partnersManager) {
                window.partnersManager = new PartnersManager();
            }

            // Inicializar outros managers se necessário
            if (window.contactManager && !window.contactManager.initialized) {
                window.contactManager.init();
            }

            if (window.mapManager && !window.mapManager.initialized) {
                window.mapManager.init();
            }

            this.initialized = true;
            
        } catch (error) {
            console.error('SiteInitializer: Erro ao inicializar managers:', error);
        }
    }
}

// Inicializar quando o script for carregado
console.log('SiteInitializer: Script loaded');
window.siteInitializer = new SiteInitializer(); 