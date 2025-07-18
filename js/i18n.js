// Sistema de Internacionalização (i18n)
class I18n {
    constructor() {
        this.currentLang = 'pt';
        this.translations = {
            pt: {
                // Navegação
                'nav.home': 'Home',
                'nav.products': 'Produtos',
                'nav.services': 'Serviços',
                'nav.partners': 'Parceiros',
                'nav.careers': 'Carreiras',
                'nav.contact': 'Contato',

                // Hero Section
                'hero.title.part1': 'Projetos desafiadores exigem',
                'hero.title.part2': 'profissionais visionários',
                'hero.subtitle': 'Software House especializada em soluções empresariais inovadoras. Transformamos ideias em realidade através da tecnologia de ponta.',
                'hero.btn.services': 'Nossos Serviços',
                'hero.btn.contact': 'Fale Conosco',
                'hero.card.innovation': 'Inovação',
                'hero.card.growth': 'Crescimento',
                'hero.card.technology': 'Tecnologia',
                'hero.card.partnership': 'Parceria',
                'hero.card.synergy': 'Sinergia',



                // Produtos
                'products.title': 'Nossos Produtos',
                'products.subtitle': 'Soluções inovadoras desenvolvidas pela nossa equipe de especialistas',
                'products.visit': 'Visitar',
                'products.coming_soon': 'Em Breve',
                'products.view_all': 'Ver Todos',

                // Serviços
                'services.title': 'Nossos Serviços',
                'services.subtitle': 'Serviços especializados para impulsionar seu negócio',
                'services.team.title': 'Team Augmentation',
                'services.team.description': 'Fortaleça sua equipe com profissionais especializados em tecnologias modernas.',
                'services.team.feature1': 'Desenvolvedores especializados',
                'services.team.feature2': 'Flexibilidade de contratação',
                'services.team.feature3': 'Redução de custos',
                'services.custom.title': 'Custom Development',
                'services.custom.description': 'Desenvolvimento de soluções personalizadas com tecnologias modernas e metodologias ágeis.',
                'services.custom.feature1': 'Metodologias ágeis',
                'services.custom.feature2': 'Tecnologias modernas',
                'services.custom.feature3': 'Qualidade garantida',
                'services.digital.title': 'Digital Transformation',
                'services.digital.description': 'Transformação digital completa para modernizar seus processos e sistemas.',
                'services.digital.feature1': 'Modernização de sistemas',
                'services.digital.feature2': 'Automação de processos',
                'services.digital.feature3': 'Otimização de performance',

                // Parceiros
                'partners.title': 'Parceiros',
                'partners.subtitle': 'Empresas que confiam na Elevate para suas soluções tecnológicas',
                'partners.loading': 'Carregando parceiros...',
                'partners.startups': 'Startups',
                'partners.startups.desc': 'Empresas inovadoras em crescimento',
                'partners.corporations': 'Corporações',
                'partners.corporations.desc': 'Grandes empresas em transformação digital',
                'partners.ecommerce': 'E-commerce',
                'partners.ecommerce.desc': 'Plataformas de vendas online',
                'partners.fintech': 'Fintech',
                'partners.fintech.desc': 'Empresas de tecnologia financeira',

                // Partners Hero
                'partners.hero.title.part1': 'Parcerias',
                'partners.hero.title.part2': 'que elevam',
                'partners.hero.subtitle': 'Juntos, construímos o futuro da tecnologia. Nossas parcerias estratégicas nos permitem oferecer soluções ainda mais inovadoras e abrangentes para nossos clientes.',
                'partners.hero.btn.partners': 'Conheça Nossos Parceiros',
                'partners.hero.btn.contact': 'Seja Nosso Parceiro',
                'partners.hero.card.collaboration': 'Colaboração',
                'partners.hero.card.innovation': 'Inovação',
                'partners.hero.card.global': 'Global',

                // Carreiras
                'careers.title': 'Trabalhe Conosco',
                'careers.subtitle': 'Se você quer fazer parte de uma equipe de excelentes profissionais para desenvolver projetos visionários e elevar sua carreira a um nível superior, esta é sua chance!',
                'careers.loading': 'Carregando oportunidades...',
                
                // Vagas
                'vagas.requirements': 'Requisitos',
                'vagas.benefits': 'Benefícios',
                'vagas.apply': 'Candidatar-se',
                'vagas.apply_success': 'Candidatura enviada com sucesso!',

                // Contato
                'contact.title': 'Contato',
                'contact.subtitle': 'Entre em contato conosco para discutir seu projeto',
                'contact.address.title': 'Endereço',
                'contact.whatsapp.title': 'WhatsApp',
                'contact.email.title': 'Email',
                'contact.hours.title': 'Horário de Atendimento',
                'contact.hours.text': 'Segunda a Sexta: 9h às 18h',

                // Formulário
                'form.name': 'Nome',
                'form.email': 'Email',
                'form.phone': 'Telefone',
                'form.company': 'Empresa',
                'form.message': 'Mensagem',
                'form.submit': 'Enviar Mensagem',
                'form.email_opened': 'Aplicativo de e-mail aberto! Complete o envio no seu cliente de e-mail.',
                'form.email_error': 'Falha ao abrir o aplicativo de e-mail. Tente novamente.',

                // Footer
                'footer.description': 'Challenging projects demand visionary professionals.',
                'footer.quick_links': 'Links Rápidos',
                'footer.services': 'Serviços',
                'footer.contact': 'Contato',

                // Floating Button
                'floating.careers.title': 'Vagas Abertas!',
                'floating.careers.subtitle': 'Junte-se à nossa equipe'
            },
            en: {
                // Navigation
                'nav.home': 'Home',
                'nav.products': 'Products',
                'nav.services': 'Services',
                'nav.partners': 'Partners',
                'nav.careers': 'Careers',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.title.part1': 'Challenging projects demand',
                'hero.title.part2': 'visionary professionals',
                'hero.subtitle': 'Software House specialized in innovative business solutions. We transform ideas into reality through cutting-edge technology.',
                'hero.btn.services': 'Our Services',
                'hero.btn.contact': 'Contact Us',
                'hero.card.innovation': 'Innovation',
                'hero.card.growth': 'Growth',
                'hero.card.technology': 'Technology',
                'hero.card.partnership': 'Partnership',
                'hero.card.synergy': 'Synergy',



                // Products
                'products.title': 'Our Products',
                'products.subtitle': 'Innovative solutions developed by our team of experts',
                'products.visit': 'Visit',
                'products.coming_soon': 'Coming Soon',
                'products.view_all': 'View All',

                // Services
                'services.title': 'Our Services',
                'services.subtitle': 'Specialized services to boost your business',
                'services.team.title': 'Team Augmentation',
                'services.team.description': 'Strengthen your team with professionals specialized in modern technologies.',
                'services.team.feature1': 'Specialized developers',
                'services.team.feature2': 'Hiring flexibility',
                'services.team.feature3': 'Cost reduction',
                'services.custom.title': 'Custom Development',
                'services.custom.description': 'Development of customized solutions with modern technologies and agile methodologies.',
                'services.custom.feature1': 'Agile methodologies',
                'services.custom.feature2': 'Modern technologies',
                'services.custom.feature3': 'Guaranteed quality',
                'services.digital.title': 'Digital Transformation',
                'services.digital.description': 'Complete digital transformation to modernize your processes and systems.',
                'services.digital.feature1': 'System modernization',
                'services.digital.feature2': 'Process automation',
                'services.digital.feature3': 'Performance optimization',

                // Partners
                'partners.title': 'Partners',
                'partners.subtitle': 'Companies that trust Elevate for their technological solutions',
                'partners.loading': 'Loading partners...',
                'partners.startups': 'Startups',
                'partners.startups.desc': 'Growing innovative companies',
                'partners.corporations': 'Corporations',
                'partners.corporations.desc': 'Large companies in digital transformation',
                'partners.ecommerce': 'E-commerce',
                'partners.ecommerce.desc': 'Online sales platforms',
                'partners.fintech': 'Fintech',
                'partners.fintech.desc': 'Financial technology companies',

                // Partners Hero
                'partners.hero.title.part1': 'Partnerships',
                'partners.hero.title.part2': 'that elevate',
                'partners.hero.subtitle': 'Together, we build the future of technology. Our strategic partnerships allow us to offer even more innovative and comprehensive solutions for our clients.',
                'partners.hero.btn.partners': 'Meet Our Partners',
                'partners.hero.btn.contact': 'Be Our Partner',
                'partners.hero.card.collaboration': 'Collaboration',
                'partners.hero.card.innovation': 'Innovation',
                'partners.hero.card.global': 'Global',

                // Careers
                'careers.title': 'Join Our Solution Teams',
                'careers.subtitle': 'If you want to be part of a team of excellent professionals to develop visionary projects and elevate your career to a higher level, this is your chance!',
                'careers.loading': 'Loading opportunities...',
                
                // Jobs
                'vagas.requirements': 'Requirements',
                'vagas.benefits': 'Benefits',
                'vagas.apply': 'Apply Now',
                'vagas.apply_success': 'Application sent successfully!',

                // Contact
                'contact.title': 'Contact',
                'contact.subtitle': 'Get in touch with us to discuss your project',
                'contact.address.title': 'Address',
                'contact.whatsapp.title': 'WhatsApp',
                'contact.email.title': 'Email',
                'contact.hours.title': 'Business Hours',
                'contact.hours.text': 'Monday to Friday: 9am to 6pm',

                // Form
                'form.name': 'Name',
                'form.email': 'Email',
                'form.phone': 'Phone',
                'form.company': 'Company',
                'form.message': 'Message',
                'form.submit': 'Send Message',
                'form.email_opened': 'Email client opened! Complete the sending in your email client.',
                'form.email_error': 'Failed to open email client. Please try again.',

                // Footer
                'footer.description': 'Challenging projects demand visionary professionals.',
                'footer.quick_links': 'Quick Links',
                'footer.services': 'Services',
                'footer.contact': 'Contact',

                // Floating Button
                'floating.careers.title': 'Open Positions!',
                'floating.careers.subtitle': 'Join our team'
            },
            es: {
                // Navegación
                'nav.home': 'Inicio',
                'nav.products': 'Productos',
                'nav.services': 'Servicios',
                'nav.partners': 'Socios',
                'nav.careers': 'Carreras',
                'nav.contact': 'Contacto',

                // Sección Hero
                'hero.title.part1': 'Los proyectos desafiantes exigen',
                'hero.title.part2': 'profesionales visionarios',
                'hero.subtitle': 'Software House especializada en soluciones empresariales innovadoras. Transformamos ideas en realidad a través de tecnología de vanguardia.',
                'hero.btn.services': 'Nuestros Servicios',
                'hero.btn.contact': 'Contáctanos',
                'hero.card.innovation': 'Innovación',
                'hero.card.growth': 'Crecimiento',
                'hero.card.technology': 'Tecnología',
                'hero.card.partnership': 'Alianza',


                'topics.loading': 'Cargando novedades...',

                // Productos
                'products.title': 'Nuestros Productos',
                'products.subtitle': 'Soluciones innovadoras desarrolladas por nuestro equipo de expertos',
                'products.visit': 'Visitar',
                'products.coming_soon': 'Próximamente',
                'products.view_all': 'Ver Todos',

                // Servicios
                'services.title': 'Nuestros Servicios',
                'services.subtitle': 'Servicios especializados para impulsar tu negocio',
                'services.team.title': 'Team Augmentation',
                'services.team.description': 'Fortalece tu equipo con profesionales especializados en tecnologías modernas.',
                'services.team.feature1': 'Desarrolladores especializados',
                'services.team.feature2': 'Flexibilidad de contratación',
                'services.team.feature3': 'Reducción de costos',
                'services.custom.title': 'Custom Development',
                'services.custom.description': 'Desarrollo de soluciones personalizadas con tecnologías modernas y metodologías ágiles.',
                'services.custom.feature1': 'Metodologías ágiles',
                'services.custom.feature2': 'Tecnologías modernas',
                'services.custom.feature3': 'Calidad garantizada',
                'services.digital.title': 'Digital Transformation',
                'services.digital.description': 'Transformación digital completa para modernizar tus procesos y sistemas.',
                'services.digital.feature1': 'Modernización de sistemas',
                'services.digital.feature2': 'Automatización de procesos',
                'services.digital.feature3': 'Optimización de rendimiento',

                // Socios
                'partners.title': 'Socios',
                'partners.subtitle': 'Empresas que confían en Elevate para sus soluciones tecnológicas',
                'partners.loading': 'Cargando socios...',
                'partners.startups': 'Startups',
                'partners.startups.desc': 'Empresas innovadoras en crecimiento',
                'partners.corporations': 'Corporaciones',
                'partners.corporations.desc': 'Grandes empresas en transformación digital',
                'partners.ecommerce': 'E-commerce',
                'partners.ecommerce.desc': 'Plataformas de ventas online',
                'partners.fintech': 'Fintech',
                'partners.fintech.desc': 'Empresas de tecnología financiera',

                // Partners Hero
                'partners.hero.title.part1': 'Alianzas',
                'partners.hero.title.part2': 'que elevan',
                'partners.hero.subtitle': 'Juntos, construimos el futuro de la tecnología. Nuestras alianzas estratégicas nos permiten ofrecer soluciones aún más innovadoras y integrales para nuestros clientes.',
                'partners.hero.btn.partners': 'Conoce Nuestros Socios',
                'partners.hero.btn.contact': 'Sé Nuestro Socio',
                'partners.hero.card.collaboration': 'Colaboración',
                'partners.hero.card.innovation': 'Innovación',
                'partners.hero.card.global': 'Global',

                // Carreras
                'careers.title': 'Únete a Nuestro Equipo',
                'careers.subtitle': 'Si quieres ser parte de un equipo de excelentes profesionales para desarrollar proyectos visionarios y elevar tu carrera a un nivel superior, ¡esta es tu oportunidad!',
                'careers.loading': 'Cargando oportunidades...',
                
                // Empleos
                'vagas.requirements': 'Requisitos',
                'vagas.benefits': 'Beneficios',
                'vagas.apply': 'Postularse',
                'vagas.apply_success': '¡Postulación enviada con éxito!',

                // Contacto
                'contact.title': 'Contacto',
                'contact.subtitle': 'Ponte en contacto con nosotros para discutir tu proyecto',
                'contact.address.title': 'Dirección',
                'contact.whatsapp.title': 'WhatsApp',
                'contact.email.title': 'Email',
                'contact.hours.title': 'Horario de Atención',
                'contact.hours.text': 'Lunes a Viernes: 9h a 18h',

                // Formulario
                'form.name': 'Nombre',
                'form.email': 'Email',
                'form.phone': 'Teléfono',
                'form.company': 'Empresa',
                'form.message': 'Mensaje',
                'form.submit': 'Enviar Mensaje',
                'form.email_opened': '¡Cliente de correo abierto! Complete el envío en su cliente de correo.',
                'form.email_error': 'Error al abrir el cliente de correo. Inténtelo de nuevo.',

                // Footer
                'footer.description': 'Challenging projects demand visionary professionals.',
                'footer.quick_links': 'Enlaces Rápidos',
                'footer.services': 'Servicios',
                'footer.contact': 'Contacto',

                // Floating Button
                'floating.careers.title': '¡Posiciones Abiertas!',
                'floating.careers.subtitle': 'Únete a nuestro equipo'
            }
        };

        this.init();
    }

    init() {
        this.setupLanguageSelector();
        this.updateContent();
    }

    setupLanguageSelector() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
        
        this.updateContent();
        
        // Update products manager language
        if (window.productsManager) {
            window.productsManager.updateLanguage(lang);
        }
        

        
        // Update vagas manager language
        if (window.vagasManager) {
            window.vagasManager.updateLanguage(lang);
        }
        
        // Update services manager language
        if (window.servicesManager) {
            window.servicesManager.updateLanguage(lang);
        }
        
        // Update partners manager language
        if (window.partnersManager) {
            window.partnersManager.updateLanguage(lang);
        }
        
        // Dispatch language change event
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translations[this.currentLang][key];
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    getText(key) {
        const translation = this.translations[this.currentLang][key] || key;
        return translation;
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
}); 