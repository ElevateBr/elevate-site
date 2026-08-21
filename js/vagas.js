class VagasManager {
    constructor() {
        this.currentLanguage = window.i18n?.currentLang || 'pt';
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
    }
}
