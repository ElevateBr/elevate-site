// Vagas de Recrutamento Manager
class VagasManager {
    constructor() {
        this.vagasContainer = document.getElementById('vagas-container');
        this.vagasLoading = document.getElementById('vagas-loading');
        this.vagas = [];
        this.currentLanguage = 'pt';
        
        this.init();
    }

    init() {
        // Aguardar o i18n estar pronto
        if (window.i18n) {
            this.loadVagas();
            this.setupFloatingButton();
        } else {
            // Aguardar o i18n ser inicializado
            const checkI18n = setInterval(() => {
                if (window.i18n) {
                    clearInterval(checkI18n);
                    this.loadVagas();
                    this.setupFloatingButton();
                }
            }, 100);
        }
    }

    async loadVagas() {
        try {
            // Show loading
            this.showLoading();

            // Load vagas from JSON files
            const vagas = await this.fetchVagas();
            
            // Hide loading
            this.hideLoading();
            
            // Check if there are any vagas
            if (vagas.length === 0) {
                this.hideRecruitmentSection();
                this.hideFloatingButton();
            } else {
                this.showRecruitmentSection();
                this.showFloatingButton();
                this.renderVagas(vagas);
            }
            
        } catch (error) {
            console.error('Error loading vagas:', error);
            this.hideLoading();
            
            // Fallback: mostrar seção mesmo com erro, usando dados de exemplo
            const sampleVagas = this.getSampleVagas();
            this.showRecruitmentSection();
            this.showFloatingButton();
            this.renderVagas(sampleVagas);
        }
    }

    async fetchVagas() {
        try {
            // Load vagas index
            const response = await fetch('data/vagas/index.json');
            const vagasIndex = await response.json();
            
            // Load individual vaga files
            const vagasPromises = vagasIndex.vagas.map(async (vagaId) => {
                const vagaResponse = await fetch(`data/vagas/${vagaId}.json`);
                return await vagaResponse.json();
            });
            
            const vagas = await Promise.all(vagasPromises);
            
            return vagas.sort((a, b) => new Date(b.date) - new Date(a.date));
            
        } catch (error) {
            console.error('Error fetching vagas:', error);
            // Return sample data if files don't exist
            return this.getSampleVagas();
        }
    }

    getSampleVagas() {
        return [
            {
                id: 'frontend-developer',
                title: {
                    'pt': 'Frontend Developer',
                    'en': 'Frontend Developer',
                    'es': 'Desarrollador Frontend'
                },
                type: 'Full-time',
                location: 'Remoto',
                description: {
                    'pt': 'Estamos procurando um desenvolvedor Frontend experiente para se juntar à nossa equipe. Você será responsável por criar interfaces modernas e responsivas usando tecnologias como React, Vue.js ou Angular.',
                    'en': 'We are looking for an experienced Frontend developer to join our team. You will be responsible for creating modern and responsive interfaces using technologies such as React, Vue.js or Angular.',
                    'es': 'Estamos buscando un desarrollador Frontend experimentado para unirse a nuestro equipo. Serás responsable de crear interfaces modernas y responsivas usando tecnologías como React, Vue.js o Angular.'
                },
                requirements: {
                    'pt': [
                        'Experiência sólida com JavaScript/TypeScript',
                        'Conhecimento em React, Vue.js ou Angular',
                        'Familiaridade com CSS moderno (Flexbox, Grid)',
                        'Experiência com Git e controle de versão',
                        'Boa comunicação e trabalho em equipe'
                    ],
                    'en': [
                        'Solid experience with JavaScript/TypeScript',
                        'Knowledge in React, Vue.js or Angular',
                        'Familiarity with modern CSS (Flexbox, Grid)',
                        'Experience with Git and version control',
                        'Good communication and teamwork'
                    ],
                    'es': [
                        'Experiencia sólida con JavaScript/TypeScript',
                        'Conocimiento en React, Vue.js o Angular',
                        'Familiaridad con CSS moderno (Flexbox, Grid)',
                        'Experiencia con Git y control de versiones',
                        'Buena comunicación y trabajo en equipo'
                    ]
                },
                benefits: {
                    'pt': [
                        'Trabalho remoto',
                        'Horário flexível',
                        'Plano de saúde',
                        'Vale refeição',
                        'Plano de carreira'
                    ],
                    'en': [
                        'Remote work',
                        'Flexible hours',
                        'Health plan',
                        'Meal allowance',
                        'Career plan'
                    ],
                    'es': [
                        'Trabajo remoto',
                        'Horario flexible',
                        'Plan de salud',
                        'Vale de comida',
                        'Plan de carrera'
                    ]
                },
                date: '2024-01-15'
            },
            {
                id: 'backend-developer',
                title: {
                    'pt': 'Backend Developer',
                    'en': 'Backend Developer',
                    'es': 'Desarrollador Backend'
                },
                type: 'Full-time',
                location: 'Híbrido',
                description: {
                    'pt': 'Procuramos um desenvolvedor Backend para desenvolver APIs robustas e escaláveis. Você trabalhará com tecnologias modernas como Node.js, Python ou Java.',
                    'en': 'We are looking for a Backend developer to develop robust and scalable APIs. You will work with modern technologies such as Node.js, Python or Java.',
                    'es': 'Buscamos un desarrollador Backend para desarrollar APIs robustas y escalables. Trabajarás con tecnologías modernas como Node.js, Python o Java.'
                },
                requirements: {
                    'pt': [
                        'Experiência com desenvolvimento de APIs',
                        'Conhecimento em Node.js, Python ou Java',
                        'Experiência com bancos de dados SQL e NoSQL',
                        'Conhecimento em Docker e Kubernetes',
                        'Experiência com testes automatizados'
                    ],
                    'en': [
                        'Experience with API development',
                        'Knowledge in Node.js, Python or Java',
                        'Experience with SQL and NoSQL databases',
                        'Knowledge in Docker and Kubernetes',
                        'Experience with automated testing'
                    ],
                    'es': [
                        'Experiencia con desarrollo de APIs',
                        'Conocimiento en Node.js, Python o Java',
                        'Experiencia con bases de datos SQL y NoSQL',
                        'Conocimiento en Docker y Kubernetes',
                        'Experiencia con pruebas automatizadas'
                    ]
                },
                benefits: {
                    'pt': [
                        'Trabalho híbrido',
                        'Horário flexível',
                        'Plano de saúde',
                        'Vale refeição',
                        'Plano de carreira'
                    ],
                    'en': [
                        'Hybrid work',
                        'Flexible hours',
                        'Health plan',
                        'Meal allowance',
                        'Career plan'
                    ],
                    'es': [
                        'Trabajo híbrido',
                        'Horario flexible',
                        'Plan de salud',
                        'Vale de comida',
                        'Plan de carrera'
                    ]
                },
                date: '2024-01-10'
            }
        ];
    }

    renderVagas(vagas) {
        if (!this.vagasContainer) return;

        this.vagasContainer.innerHTML = vagas.map(vaga => this.createVagaCard(vaga)).join('');
        // Garante que todos os cards fiquem visíveis
        document.querySelectorAll('.vaga-card').forEach(card => card.classList.add('animate-in'));
        // Add event listeners to apply buttons
        this.addApplyEventListeners();
    }

    createVagaCard(vaga) {
        const lang = this.currentLanguage;
        const requirementsList = (vaga.requirements?.[lang] || []).map(req => `<li>${req}</li>`).join('');
        const benefitsList = (vaga.benefits?.[lang] || []).map(benefit => `<li>${benefit}</li>`).join('');
        
        return `
            <div class="vaga-card" data-vaga-id="${vaga.id}">
                <div class="vaga-header">
                    <div class="vaga-icon">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <h3 class="vaga-title">${vaga.title?.[lang] || vaga.title?.pt || vaga.title?.en || vaga.id}</h3>
                </div>
                
                <div class="vaga-meta">
                    <span class="vaga-type">
                        <i class="fas fa-clock"></i>
                        ${vaga.type || ''}
                    </span>
                    <span class="vaga-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${vaga.location || ''}
                    </span>
                    <span class="vaga-date">
                        <i class="fas fa-calendar"></i>
                        ${this.formatDate(vaga.date)}
                    </span>
                </div>
                
                <p class="vaga-description">${vaga.description?.[lang] || ''}</p>
                
                <div class="vaga-requirements">
                    <h4>${this.getText('vagas.requirements')}:</h4>
                    <ul>${requirementsList}</ul>
                </div>
                
                <div class="vaga-benefits">
                    <h4>${this.getText('vagas.benefits')}:</h4>
                    <ul>${benefitsList}</ul>
                </div>
                
                <div class="vaga-actions">
                    <button class="btn btn-primary apply-btn" data-vaga-id="${vaga.id}">
                        ${this.getText('vagas.apply')}
                    </button>
                </div>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString(this.currentLanguage === 'pt' ? 'pt-BR' : this.currentLanguage === 'es' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    getText(key) {
        return window.i18n ? window.i18n.getText(key) : key;
    }

    addApplyEventListeners() {
        const applyButtons = document.querySelectorAll('.apply-btn');
        applyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const vagaId = e.target.getAttribute('data-vaga-id');
                this.handleApply(vagaId);
            });
        });
    }

    handleApply(vagaId) {
        // Scroll to contact form
        const contactSection = document.getElementById('contato');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // You can add more logic here, like pre-filling the form
        console.log(`Aplicando para vaga: ${vagaId}`);
        
        // Show success message
        this.showApplySuccess(vagaId);
    }

    showApplySuccess(vagaId) {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'apply-success';
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4CAF50;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                z-index: 1000;
                max-width: 300px;
            ">
                <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i>
                ${this.getText('vagas.apply_success')}
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 3000);
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        this.loadVagas(); // Reload with new language
    }

    showLoading() {
        if (this.vagasLoading) {
            this.vagasLoading.style.display = 'block';
        }
    }

    hideLoading() {
        if (this.vagasLoading) {
            this.vagasLoading.style.display = 'none';
        }
    }

    hideRecruitmentSection() {
        const recruitmentSection = document.getElementById('recrutamento');
        if (recruitmentSection) {
            recruitmentSection.style.display = 'none';
        }
    }

    showRecruitmentSection() {
        const recruitmentSection = document.getElementById('recrutamento');
        if (recruitmentSection) {
            recruitmentSection.style.display = 'block';
        }
    }

    hideFloatingButton() {
        const floatingButton = document.getElementById('floating-careers-btn');
        if (floatingButton) {
            floatingButton.style.display = 'none';
        }
    }

    showFloatingButton() {
        const floatingButton = document.getElementById('floating-careers-btn');
        if (floatingButton) {
            floatingButton.style.display = 'flex';
        }
    }

    setupFloatingButton() {
        const floatingButton = document.getElementById('floating-careers-btn');
        if (floatingButton) {
            floatingButton.addEventListener('click', () => {
                this.scrollToRecruitment();
            });
        }
    }

    scrollToRecruitment() {
        const recruitmentSection = document.getElementById('recrutamento');
        if (recruitmentSection) {
            recruitmentSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    showError() {
        if (this.vagasContainer) {
            this.vagasContainer.innerHTML = `
                <div style="
                    text-align: center;
                    padding: 3rem;
                    color: #666;
                ">
                    <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #FFD700; margin-bottom: 1rem;"></i>
                    <h3>Erro ao carregar vagas</h3>
                    <p>Não foi possível carregar as vagas disponíveis. Tente novamente mais tarde.</p>
                </div>
            `;
        }
    }
}

// VagasManager will be initialized by SiteInitializer 