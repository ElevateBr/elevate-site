# Elevate - Website Corporativo

Site institucional da Elevate, uma software house especializada em soluções empresariais inovadoras.

## 🚀 Características

### ✨ Funcionalidades Principais
- **Design Responsivo**: Adaptável a todos os dispositivos
- **Multi-idioma**: Suporte para Português, Inglês e Espanhol
- **Sistema de Produtos Dinâmico**: Banner rotativo e grid de produtos carregados via JSON
- **HOT Topics**: Seção de notícias e oportunidades carregadas dinamicamente
- **Recrutamento**: Sistema de vagas dinâmico com carregamento via JSON
- **Formulário de Contato**: Com validação e auto-save
- **Mapa Interativo**: Integração com Google Maps
- **Animações Suaves**: Transições e efeitos visuais modernos

### 🎨 Design
- **Identidade Visual**: Preto e amarelo (#FFD700)
- **Fundo Limpo**: Design moderno com fundo claro
- **Tipografia**: Inter (Google Fonts)
- **Ícones**: Font Awesome 6

## 📁 Estrutura do Projeto

```
SiteElevate/
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos principais
├── js/
│   ├── main.js            # Funcionalidades gerais
│   ├── i18n.js            # Sistema de internacionalização
│   ├── products.js        # Sistema de produtos dinâmico
│   ├── topics.js          # Sistema de tópicos
│   ├── contact.js         # Formulário de contato
│   └── map.js             # Integração com Google Maps
├── data/
│   ├── products/          # Dados dos produtos
│   │   ├── index.json     # Índice dos produtos
│   │   ├── seathub.json   # Dados do Seathub
│   │   ├── tapinout.json  # Dados do TapInOut
│   │   ├── notification-api.json # Dados da NotificationApi
│   │   └── coming-soon.json # Produtos em desenvolvimento
│   ├── topics/            # Dados dos tópicos
│   │   ├── index.json     # Índice dos tópicos
│   │   └── *.json         # Arquivos individuais de tópicos
│   └── vagas/             # Dados das vagas
│       ├── index.json     # Índice das vagas
│       └── *.json         # Arquivos individuais de vagas
├── images/
│   └── products/          # Imagens dos produtos
│       ├── README.md      # Instruções para imagens
│       └── *.png          # Logos dos produtos
├── README.md              # Este arquivo
└── QUICK_START.md         # Guia de início rápido
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Google Fonts**: Tipografia Inter
- **Font Awesome**: Ícones
- **Google Maps API**: Mapa interativo

## 📦 Sistema de Produtos Dinâmico

### Estrutura dos Arquivos JSON

#### `data/products/index.json`
```json
{
  "products": [
    "seathub",
    "tapinout", 
    "notification-api",
    "coming-soon"
  ]
}
```

#### `data/products/seathub.json`
```json
{
  "id": "seathub",
  "name": {
    "pt": "Seathub",
    "en": "Seathub", 
    "es": "Seathub"
  },
  "description": {
    "pt": "Descrição em português...",
    "en": "Description in English...",
    "es": "Descripción en español..."
  },
  "shortDescription": {
    "pt": "Descrição curta...",
    "en": "Short description...",
    "es": "Descripción corta..."
  },
  "url": "https://seathub.net",
  "image": "images/products/seathub-logo.png",
  "icon": "fas fa-search",
  "category": "workspace",
  "status": "active",
  "features": {
    "pt": ["Feature 1", "Feature 2"],
    "en": ["Feature 1", "Feature 2"],
    "es": ["Feature 1", "Feature 2"]
  }
}
```

### Funcionalidades do Banner
- **Rotação Automática**: Troca de slides a cada 5 segundos
- **Controles Manuais**: Botões de navegação e dots
- **Pausa no Hover**: Para melhor experiência do usuário
- **Responsivo**: Adaptável a diferentes tamanhos de tela

### Funcionalidades do Grid
- **Visualização Compacta**: Lista todos os produtos
- **Botão "Ver Todos"**: Alterna entre banner e grid
- **Cards Interativos**: Hover effects e animações

## 🖼️ Sistema de Imagens

### Diretório `images/products/`
- **Formato**: PNG, JPG, JPEG
- **Tamanho**: 300x200px (recomendado)
- **Fundo**: Transparente (PNG) ou branco
- **Nomenclatura**: `{produto-id}-logo.{extensão}`

### Exemplos de Arquivos
- `seathub-logo.png`
- `tapinout-logo.png`
- `notification-api-logo.png`
- `coming-soon-logo.png`
- `default-logo.png` (fallback)

## 🌐 Sistema Multi-idioma

### Idiomas Suportados
- **Português (PT)**: Idioma padrão
- **Inglês (EN)**: Tradução completa
- **Espanhol (ES)**: Tradução completa

### Como Adicionar Traduções
1. Edite o arquivo `js/i18n.js`
2. Adicione as chaves de tradução em cada idioma
3. Use `data-i18n="chave"` nos elementos HTML

## 🚀 Como Executar

### Opção 1: Servidor Local
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Opção 2: Live Server (VS Code)
1. Instale a extensão "Live Server"
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

### Opção 3: Servidor HTTP Simples
```bash
# Usando qualquer servidor HTTP
# Aponte para a pasta raiz do projeto
```

## 📝 Como Adicionar Novos Produtos

1. **Crie o arquivo JSON** em `data/products/`
```json
{
  "id": "novo-produto",
  "name": {
    "pt": "Nome do Produto",
    "en": "Product Name",
    "es": "Nombre del Producto"
  },
  "description": {
    "pt": "Descrição completa...",
    "en": "Complete description...",
    "es": "Descripción completa..."
  },
  "shortDescription": {
    "pt": "Descrição curta",
    "en": "Short description",
    "es": "Descripción corta"
  },
  "url": "https://produto.com",
  "image": "images/products/novo-produto-logo.png",
  "icon": "fas fa-icon",
  "category": "categoria",
  "status": "active",
  "features": {
    "pt": ["Feature 1", "Feature 2"],
    "en": ["Feature 1", "Feature 2"],
    "es": ["Feature 1", "Feature 2"]
  }
}
```

2. **Adicione ao índice** em `data/products/index.json`
```json
{
  "products": [
    "produto-existente",
    "novo-produto"
  ]
}
```

3. **Adicione a imagem** em `images/products/`
- Nome: `novo-produto-logo.png`
- Tamanho: 300x200px
- Formato: PNG (transparente) ou JPG

## 📝 Como Adicionar Novos Tópicos

1. **Crie o arquivo JSON** em `data/topics/`
```json
{
  "id": "novo-topico",
  "title": {
    "pt": "Título do Tópico",
    "en": "Topic Title",
    "es": "Título del Tópico"
  },
  "description": {
    "pt": "Descrição do tópico...",
    "en": "Topic description...",
    "es": "Descripción del tópico..."
  },
  "icon": "fas fa-icon",
  "date": "2024-01-01",
  "category": "categoria"
}
```

2. **Adicione ao índice** em `data/topics/index.json`

## 📝 Como Adicionar Novas Vagas

1. **Crie o arquivo JSON** em `data/vagas/`
```json
{
  "id": "nova-vaga",
  "title": {
    "pt": "Título da Vaga",
    "en": "Job Title",
    "es": "Título del Trabajo"
  },
  "description": {
    "pt": "Descrição da vaga...",
    "en": "Job description...",
    "es": "Descripción del trabajo..."
  },
  "requirements": {
    "pt": ["Requisito 1", "Requisito 2"],
    "en": ["Requirement 1", "Requirement 2"],
    "es": ["Requisito 1", "Requisito 2"]
  },
  "type": "full-time",
  "location": "Remoto",
  "date": "2024-01-01"
}
```

2. **Adicione ao índice** em `data/vagas/index.json`

## 🎯 Funcionalidades Especiais

### Sistema de Notificações
- Feedback visual para ações do usuário
- Auto-remoção após 5 segundos
- Tipos: success, error, info

### Auto-save do Formulário
- Salva dados automaticamente no localStorage
- Restaura dados ao recarregar a página
- Funciona offline

### Animações de Scroll
- Elementos aparecem conforme o scroll
- Efeitos suaves e profissionais
- Performance otimizada

### Menu Mobile
- Hamburger menu responsivo
- Animações suaves
- Fecha automaticamente ao clicar em links

## 🔧 Configuração do Google Maps

1. **Obtenha uma API Key** no Google Cloud Console
2. **Edite o arquivo** `js/map.js`
3. **Substitua** `YOUR_API_KEY` pela sua chave
4. **Configure as coordenadas** da empresa

## 📱 Responsividade

### Breakpoints
- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

### Adaptações
- Menu hamburger em mobile
- Grid responsivo para produtos
- Texto adaptativo
- Imagens otimizadas

## 🚀 Deploy

### Google Cloud Storage (Recomendado)
```bash
# Instale o gcloud CLI
# Configure o projeto
gcloud config set project SEU_PROJETO

# Crie um bucket
gsutil mb gs://elevate-website

# Faça upload dos arquivos
gsutil -m cp -r . gs://elevate-website/

# Configure como website
gsutil web set -m index.html -e 404.html gs://elevate-website

# Configure CORS se necessário
gsutil cors set cors.json gs://elevate-website
```

### Outras Opções
- **Netlify**: Drag & drop
- **Vercel**: Integração com Git
- **GitHub Pages**: Gratuito para projetos públicos
- **AWS S3**: Similar ao GCS

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para detalhes.

## 📞 Contato

- **Email**: contato@elevatebr.org
- **WhatsApp**: +55 (24) 99940-2412
- **Endereço**: Rua Vinte Nove de Setembro, 53, 2º andar, Campos Elíseos, Resende - RJ, Brasil

---

**Elevate** - Challenging projects demand visionary professionals. #   e l e v a t e - s i t e  
 