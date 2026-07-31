// Sistema de Internacionalização (i18n)
class I18n {
    constructor() {
        this.languagePages = window.LANGUAGE_PAGE_MAP || {
            pt: 'index.html',
            en: 'index-en.html',
            es: 'index-es.html',
            it: 'index-it.html'
        };
        this.currentLang = this.resolveInitialLanguage();
        this.translations = {
            pt: {
                // Navegação
                'nav.home': 'Home',
                'nav.about': 'Quem Somos',
                'nav.products': 'Produtos',
                'nav.services': 'Serviços',
                'nav.partners': 'Parceiros',
                'nav.blog': 'Blog',
                'nav.careers': 'Carreiras',
                'nav.contact': 'Contato',

                // Hero Section
                'hero.title.part1': 'Elevamos ideias.',
                'hero.title.part2': 'Impulsionamos resultados.',
                'hero.subtitle': '',
                'hero.btn.services': 'Nossos Serviços',
                'hero.btn.contact': 'Fale Conosco',
                'hero.card.innovation': 'Inovação',
                'hero.card.growth': 'Crescimento',
                'hero.card.technology': 'Tecnologia',
                'hero.card.partnership': 'Parceria',
                'hero.card.synergy': 'Sinergia',
                'hero.specializations.title': 'Especializações',
                'hero.specializations.subtitle': 'Tecnologias e stacks em que nossa equipe atua com excelência.',
                'hero.specializations.sap': 'SAP',
                'hero.specializations.open': 'Open Source',
                'hero.specializations.sap.btp': 'SAP BTP',
                'hero.specializations.sap.ui5': 'SAP UI5/Fiori',
                'hero.specializations.sap.cap': 'SAP CAP',
                'hero.specializations.sap.integration': 'SAP Integration Suite',
                'hero.specializations.open.react': 'React Web',
                'hero.specializations.open.react.mobile': 'React Mobile',
                'hero.specializations.open.nodejs': 'Node.js',
                'hero.specializations.open.java': 'Java',

                // Quem Somos
                'about.title': 'Quem Somos',
                'about.subtitle': 'Elevando negócios com tecnologia, parceria, SaaS e excelência técnica.',
                'about.text': 'Somos uma Software House com sede em Resende (RJ), focada em soluções empresariais e no desenvolvimento de produtos SaaS que combinam rigor técnico e visão de negócio. Do desenho da arquitetura à entrega em produção, sempre em parceria próxima com nossos clientes.',
                'about.mission.title': 'Missão',
                'about.mission.text': 'Entregar soluções tecnológicas que gerem impacto real, com qualidade, agilidade e proximidade.',
                'about.vision.title': 'Visão',
                'about.vision.text': 'Ser referência em projetos desafiadores que exigem profissionais visionários e parcerias de longo prazo.',
                'about.values.title': 'Como trabalhamos',
                'about.values.text': 'Transparência, colaboração e melhoria contínua em cada entrega — do discovery ao suporte.',

                // Produtos
                'products.title': 'Nossos Produtos',
                'products.subtitle': 'Soluções inovadoras desenvolvidas pela nossa equipe de especialistas',
                'products.visit': 'Visitar',
                'products.coming_soon': 'Em Breve',
                'products.view_all': 'Ver Todos',

                // Blog
                'blog.title': 'Blog / Artigos',
                'blog.subtitle': 'Conteúdos e reflexões sobre tecnologia, carreira e transformação digital.',
                'blog.featured.label': 'Vídeo em destaque',
                'blog.featured.title': 'A IA não vai te demitir, mas seu cargo vai desaparecer.',
                'blog.featured.read': 'Ler artigo',
                'blog.featured.watch': 'Assistir no YouTube',

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
                'partners.hero.subtitle': 'Juntos, construímos o futuro da tecnologia.\nNossas parcerias estratégicas nos permitem oferecer soluções ainda mais inovadoras e abrangentes para nossos clientes.',
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
                'contact.map.link': 'Ver no mapa',
                'contact.cta.whatsapp': 'Falar no WhatsApp',
                'contact.cta.email': 'Enviar e-mail',

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
                'nav.about': 'About Us',
                'nav.products': 'Products',
                'nav.services': 'Services',
                'nav.partners': 'Partners',
                'nav.blog': 'Blog',
                'nav.careers': 'Careers',
                'nav.contact': 'Contact',

                // Hero Section
                'hero.title.part1': 'We elevate ideas.',
                'hero.title.part2': 'We drive results.',
                'hero.subtitle': '',
                'hero.btn.services': 'Our Services',
                'hero.btn.contact': 'Contact Us',
                'hero.card.innovation': 'Innovation',
                'hero.card.growth': 'Growth',
                'hero.card.technology': 'Technology',
                'hero.card.partnership': 'Partnership',
                'hero.card.synergy': 'Synergy',
                'hero.specializations.title': 'Specializations',
                'hero.specializations.subtitle': 'Technologies and stacks our team excels in.',
                'hero.specializations.sap': 'SAP',
                'hero.specializations.open': 'Open Source',
                'hero.specializations.sap.btp': 'SAP BTP',
                'hero.specializations.sap.ui5': 'SAP UI5/Fiori',
                'hero.specializations.sap.cap': 'SAP CAP',
                'hero.specializations.sap.integration': 'SAP Integration Suite',
                'hero.specializations.open.react': 'React Web',
                'hero.specializations.open.react.mobile': 'React Mobile',
                'hero.specializations.open.nodejs': 'Node.js',
                'hero.specializations.open.java': 'Java',

                // About Us
                'about.title': 'About Us',
                'about.subtitle': 'Elevating businesses through technology, partnership, SaaS, and technical excellence.',
                'about.text': 'We are a Software House based in Resende, Brazil, focused on enterprise solutions and SaaS product development that combine technical rigor with business vision. From architecture design to production delivery, always in close partnership with our clients.',
                'about.mission.title': 'Mission',
                'about.mission.text': 'Deliver technology solutions that create real impact, with quality, agility, and proximity.',
                'about.vision.title': 'Vision',
                'about.vision.text': 'To be a reference in challenging projects that demand visionary professionals and long-term partnerships.',
                'about.values.title': 'How we work',
                'about.values.text': 'Transparency, collaboration, and continuous improvement in every delivery—from discovery to support.',

                // Products
                'products.title': 'Our Products',
                'products.subtitle': 'Innovative solutions developed by our team of experts',
                'products.visit': 'Visit',
                'products.coming_soon': 'Coming Soon',
                'products.view_all': 'View All',

                // Blog
                'blog.title': 'Blog / Articles',
                'blog.subtitle': 'Content and insights about technology, careers and digital transformation.',
                'blog.featured.label': 'Featured video',
                'blog.featured.title': 'AI will not fire you, but your role will disappear.',
                'blog.featured.read': 'Read article',
                'blog.featured.watch': 'Watch on YouTube',

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
                'partners.hero.subtitle': 'Together, we build the future of technology.\nOur strategic partnerships allow us to offer even more innovative and comprehensive solutions for our clients.',
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
                'contact.map.link': 'View on map',
                'contact.cta.whatsapp': 'Chat on WhatsApp',
                'contact.cta.email': 'Send email',

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
                'nav.about': 'Quiénes Somos',
                'nav.products': 'Productos',
                'nav.services': 'Servicios',
                'nav.partners': 'Socios',
                'nav.blog': 'Blog',
                'nav.careers': 'Carreras',
                'nav.contact': 'Contacto',

                // Sección Hero
                'hero.title.part1': 'Elevamos ideas.',
                'hero.title.part2': 'Impulsamos resultados.',
                'hero.subtitle': '',
                'hero.btn.services': 'Nuestros Servicios',
                'hero.btn.contact': 'Contáctanos',
                'hero.card.innovation': 'Innovación',
                'hero.card.growth': 'Crecimiento',
                'hero.card.technology': 'Tecnología',
                'hero.card.partnership': 'Alianza',
                'hero.card.synergy': 'Sinergia',
                'hero.specializations.title': 'Especializaciones',
                'hero.specializations.subtitle': 'Tecnologías y stacks en los que nuestro equipo destaca.',
                'hero.specializations.sap': 'SAP',
                'hero.specializations.open': 'Open Source',
                'hero.specializations.sap.btp': 'SAP BTP',
                'hero.specializations.sap.ui5': 'SAP UI5/Fiori',
                'hero.specializations.sap.cap': 'SAP CAP',
                'hero.specializations.sap.integration': 'SAP Integration Suite',
                'hero.specializations.open.react': 'React Web',
                'hero.specializations.open.react.mobile': 'React Mobile',
                'hero.specializations.open.nodejs': 'Node.js',
                'hero.specializations.open.java': 'Java',

                // Quiénes Somos
                'about.title': 'Quiénes Somos',
                'about.subtitle': 'Elevando negocios con tecnología, alianza, SaaS y excelencia técnica.',
                'about.text': 'Somos una Software House con sede en Resende (RJ), enfocada en soluciones empresariales y en el desarrollo de productos SaaS que combinan rigor técnico y visión de negocio. Del diseño de arquitectura a la entrega en producción, siempre en estrecha alianza con nuestros clientes.',
                'about.mission.title': 'Misión',
                'about.mission.text': 'Entregar soluciones tecnológicas con impacto real, con calidad, agilidad y cercanía.',
                'about.vision.title': 'Visión',
                'about.vision.text': 'Ser referencia en proyectos desafiantes que exigen profesionales visionarios y alianzas de largo plazo.',
                'about.values.title': 'Cómo trabajamos',
                'about.values.text': 'Transparencia, colaboración y mejora continua en cada entrega — del discovery al soporte.',

                'topics.loading': 'Cargando novedades...',

                // Productos
                'products.title': 'Nuestros Productos',
                'products.subtitle': 'Soluciones innovadoras desarrolladas por nuestro equipo de expertos',
                'products.visit': 'Visitar',
                'products.coming_soon': 'Próximamente',
                'products.view_all': 'Ver Todos',

                // Blog
                'blog.title': 'Blog / Artículos',
                'blog.subtitle': 'Contenido y reflexiones sobre tecnología, carrera y transformación digital.',
                'blog.featured.label': 'Vídeo destacado',
                'blog.featured.title': 'La IA no te va a despedir, pero tu cargo va a desaparecer.',
                'blog.featured.read': 'Leer artículo',
                'blog.featured.watch': 'Ver en YouTube',

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
                'partners.hero.subtitle': 'Juntos, construimos el futuro de la tecnología.\nNuestras alianzas estratégicas nos permiten ofrecer soluciones aún más innovadoras y integrales para nuestros clientes.',
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
                'contact.map.link': 'Ver en el mapa',
                'contact.cta.whatsapp': 'Hablar por WhatsApp',
                'contact.cta.email': 'Enviar correo',

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
            },
            it: {
                // Navigazione
                'nav.home': 'Home',
                'nav.about': 'Chi Siamo',
                'nav.products': 'Prodotti',
                'nav.services': 'Servizi',
                'nav.partners': 'Partner',
                'nav.blog': 'Blog',
                'nav.careers': 'Carriere',
                'nav.contact': 'Contatto',

                // Sezione Hero
                'hero.title.part1': 'Eleviamo le idee.',
                'hero.title.part2': 'Impulsioniamo i risultati.',
                'hero.subtitle': '',
                'hero.btn.services': 'I Nostri Servizi',
                'hero.btn.contact': 'Contattaci',
                'hero.card.innovation': 'Innovazione',
                'hero.card.growth': 'Crescita',
                'hero.card.technology': 'Tecnologia',
                'hero.card.partnership': 'Partnership',
                'hero.card.synergy': 'Sinergia',
                'hero.specializations.title': 'Specializzazioni',
                'hero.specializations.subtitle': 'Tecnologie e stack in cui il nostro team eccelle.',
                'hero.specializations.sap': 'SAP',
                'hero.specializations.open': 'Open Source',
                'hero.specializations.sap.btp': 'SAP BTP',
                'hero.specializations.sap.ui5': 'SAP UI5/Fiori',
                'hero.specializations.sap.cap': 'SAP CAP',
                'hero.specializations.sap.integration': 'SAP Integration Suite',
                'hero.specializations.open.react': 'React Web',
                'hero.specializations.open.react.mobile': 'React Mobile',
                'hero.specializations.open.nodejs': 'Node.js',
                'hero.specializations.open.java': 'Java',

                // Chi Siamo
                'about.title': 'Chi Siamo',
                'about.subtitle': 'Elevare i business con tecnologia, partnership, SaaS ed eccellenza tecnica.',
                'about.text': 'Siamo una Software House con sede a Resende (RJ), focalizzata su soluzioni enterprise e sullo sviluppo di prodotti SaaS che uniscono rigore tecnico e visione di business. Dalla progettazione dell’architettura alla messa in produzione, sempre in stretta partnership con i nostri clienti.',
                'about.mission.title': 'Missione',
                'about.mission.text': 'Fornire soluzioni tecnologiche con impatto reale, con qualità, agilità e vicinanza.',
                'about.vision.title': 'Visione',
                'about.vision.text': 'Essere un riferimento in progetti impegnativi che richiedono professionisti visionari e partnership durature.',
                'about.values.title': 'Come lavoriamo',
                'about.values.text': 'Trasparenza, collaborazione e miglioramento continuo in ogni consegna — dal discovery al supporto.',

                // Prodotti
                'products.title': 'I Nostri Prodotti',
                'products.subtitle': 'Soluzioni innovative sviluppate dal nostro team di esperti',
                'products.visit': 'Visita',
                'products.coming_soon': 'Prossimamente',
                'products.view_all': 'Vedi Tutti',

                // Blog
                'blog.title': 'Blog / Articoli',
                'blog.subtitle': 'Contenuti e riflessioni su tecnologia, carriera e trasformazione digitale.',
                'blog.featured.label': 'Video in evidenza',
                'blog.featured.title': 'L\'IA non ti licenziera, ma il tuo ruolo scomparira.',
                'blog.featured.read': 'Leggi articolo',
                'blog.featured.watch': 'Guarda su YouTube',

                // Servizi
                'services.title': 'I Nostri Servizi',
                'services.subtitle': 'Servizi specializzati per far crescere la tua azienda',
                'services.team.title': 'Team Augmentation',
                'services.team.description': 'Rafforza il tuo team con professionisti specializzati in tecnologie moderne.',
                'services.team.feature1': 'Sviluppatori specializzati',
                'services.team.feature2': 'Flessibilità di assunzione',
                'services.team.feature3': 'Riduzione dei costi',
                'services.custom.title': 'Sviluppo Personalizzato',
                'services.custom.description': 'Sviluppo di soluzioni personalizzate con tecnologie moderne e metodologie agili.',
                'services.custom.feature1': 'Metodologie agili',
                'services.custom.feature2': 'Tecnologie moderne',
                'services.custom.feature3': 'Qualità garantita',
                'services.digital.title': 'Trasformazione Digitale',
                'services.digital.description': 'Trasformazione digitale completa per modernizzare i tuoi processi e sistemi.',
                'services.digital.feature1': 'Modernizzazione dei sistemi',
                'services.digital.feature2': 'Automazione dei processi',
                'services.digital.feature3': 'Ottimizzazione delle prestazioni',

                // Partner
                'partners.title': 'Partner',
                'partners.subtitle': 'Aziende che si affidano a Elevate per le loro soluzioni tecnologiche',
                'partners.loading': 'Caricamento partner...',
                'partners.startups': 'Startup',
                'partners.startups.desc': 'Aziende innovative in crescita',
                'partners.corporations': 'Corporazioni',
                'partners.corporations.desc': 'Grandi aziende in trasformazione digitale',
                'partners.ecommerce': 'E-commerce',
                'partners.ecommerce.desc': 'Piattaforme di vendita online',
                'partners.fintech': 'Fintech',
                'partners.fintech.desc': 'Aziende di tecnologia finanziaria',

                // Partners Hero
                'partners.hero.title.part1': 'Partnership',
                'partners.hero.title.part2': 'che elevano',
                'partners.hero.subtitle': 'Insieme costruiamo il futuro della tecnologia.\nLe nostre partnership strategiche ci permettono di offrire soluzioni ancora più innovative e complete ai nostri clienti.',
                'partners.hero.btn.partners': 'Scopri i Nostri Partner',
                'partners.hero.btn.contact': 'Diventa Nostro Partner',
                'partners.hero.card.collaboration': 'Collaborazione',
                'partners.hero.card.innovation': 'Innovazione',
                'partners.hero.card.global': 'Globale',

                // Carriere
                'careers.title': 'Unisciti ai Nostri Team di Soluzione',
                'careers.subtitle': 'Se vuoi far parte di un team di professionisti eccellenti per sviluppare progetti visionari e portare la tua carriera a un livello superiore, questa è la tua occasione!',
                'careers.loading': 'Caricamento opportunità...',

                // Offerte di lavoro
                'vagas.requirements': 'Requisiti',
                'vagas.benefits': 'Benefici',
                'vagas.apply': 'Candidati Ora',
                'vagas.apply_success': 'Candidatura inviata con successo!',

                // Contatto
                'contact.title': 'Contatto',
                'contact.subtitle': 'Contattaci per discutere il tuo progetto',
                'contact.address.title': 'Indirizzo',
                'contact.whatsapp.title': 'WhatsApp',
                'contact.email.title': 'Email',
                'contact.hours.title': 'Orari di Apertura',
                'contact.hours.text': 'Dal lunedì al venerdì: 9:00 - 18:00',
                'contact.map.link': 'Vedi sulla mappa',
                'contact.cta.whatsapp': 'Scrivi su WhatsApp',
                'contact.cta.email': 'Invia email',

                // Modulo
                'form.name': 'Nome',
                'form.email': 'Email',
                'form.phone': 'Telefono',
                'form.company': 'Azienda',
                'form.message': 'Messaggio',
                'form.submit': 'Invia Messaggio',
                'form.email_opened': 'Applicazione email aperta! Completa l’invio nel tuo client di posta.',
                'form.email_error': 'Impossibile aprire il client di posta. Riprova.',

                // Footer
                'footer.description': 'Progetti impegnativi richiedono professionisti visionari.',
                'footer.quick_links': 'Link Rapidi',
                'footer.services': 'Servizi',
                'footer.contact': 'Contatto',

                // Floating Button
                'floating.careers.title': 'Posizioni Aperte!',
                'floating.careers.subtitle': 'Unisciti al nostro team'
            }
        };

        this.init();
    }

    resolveInitialLanguage() {
        const fromWindow = window.DEFAULT_LANGUAGE;
        if (fromWindow && ['pt', 'en', 'es', 'it'].includes(fromWindow)) {
            return fromWindow;
        }

        const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase();
        if (htmlLang.startsWith('en')) return 'en';
        if (htmlLang.startsWith('es')) return 'es';
        if (htmlLang.startsWith('it')) return 'it';
        return 'pt';
    }

    init() {
        this.setupLanguageSelector();
        this.setLanguage(this.currentLang, { skipNavigation: true });
    }

    setupLanguageSelector() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                const currentHash = window.location.hash || '';
                const targetPage = this.languagePages[lang];

                if (targetPage) {
                    const targetUrl = `${targetPage}${currentHash}`;
                    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
                    const currentUrl = `${currentPath}${currentHash}`;

                    if (targetUrl !== currentUrl) {
                        window.location.href = targetUrl;
                        return;
                    }
                }

                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang, options = {}) {
        const { skipNavigation = false } = options;
        this.currentLang = lang;

        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeButton = document.querySelector(`[data-lang="${lang}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        if (!skipNavigation) {
            const targetPage = this.languagePages[lang];
            if (targetPage) {
                const currentHash = window.location.hash || '';
                const targetUrl = `${targetPage}${currentHash}`;
                const currentPath = window.location.pathname.split('/').pop() || 'index.html';
                const currentUrl = `${currentPath}${currentHash}`;
                if (targetUrl !== currentUrl) {
                    window.location.href = targetUrl;
                    return;
                }
            }
        }

        // Keep html lang aligned with active language for SEO/accessibility
        const langMap = { pt: 'pt-BR', en: 'en', es: 'es', it: 'it' };
        document.documentElement.setAttribute('lang', langMap[lang] || 'pt-BR');

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