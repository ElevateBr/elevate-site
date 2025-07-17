// Initialization Script
class SiteInitializer {
    constructor() {
        this.initialized = false;
        this.init();
    }

    init() {
        
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeManagers();
            });
        } else {
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