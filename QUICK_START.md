# 🚀 Guia de Início Rápido - Elevate Website

## ⚡ Execução Rápida

### 1. Clone ou Baixe o Projeto
```bash
# Se você tem Git
git clone <repository-url>
cd SiteElevate

# Ou baixe o ZIP e extraia
```

### 2. Inicie um Servidor Local
```bash
# Python 3 (Recomendado)
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000

# Ou Node.js
npx serve .

# Ou PHP
php -S localhost:8000
```

### 3. Acesse o Site
```
http://localhost:8000
```

## 🎯 Funcionalidades Principais

### ✅ Sistema de Produtos Dinâmico
- **Banner Rotativo**: Produtos em slides automáticos
- **Grid Compacto**: Visualização em lista
- **Multi-idioma**: Textos em PT, EN, ES
- **Imagens**: Suporte a logos dos produtos

### ✅ HOT Topics
- **Carregamento Dinâmico**: Via arquivos JSON
- **Categorização**: Por tipo de conteúdo
- **Responsivo**: Adaptável a todos os dispositivos

### ✅ Sistema de Vagas
- **JSON Dinâmico**: Vagas carregadas de arquivos
- **Filtros**: Por tipo, localização, etc.
- **Candidatura**: Integração com formulário de contato

### ✅ Multi-idioma
- **3 Idiomas**: Português, Inglês, Espanhol
- **Seletor**: Botões no canto superior direito
- **Tradução Completa**: Todos os textos traduzidos

## 📁 Estrutura de Arquivos

### Arquivos Principais
```
index.html          # Página principal
css/style.css      # Estilos
js/main.js         # Funcionalidades gerais
js/products.js     # Sistema de produtos
js/i18n.js         # Internacionalização
```

### Dados Dinâmicos
```
data/products/     # Produtos da empresa
data/topics/       # HOT Topics
data/vagas/        # Vagas de emprego
```

### Imagens
```
images/products/   # Logos dos produtos
```

## 🔧 Configurações Rápidas

### 1. Adicionar Novo Produto
```bash
# 1. Crie o arquivo JSON
echo '{
  "id": "meu-produto",
  "name": {
    "pt": "Meu Produto",
    "en": "My Product",
    "es": "Mi Producto"
  },
  "description": {
    "pt": "Descrição...",
    "en": "Description...",
    "es": "Descripción..."
  },
  "url": "https://meuproduto.com",
  "image": "images/products/meu-produto-logo.png"
}' > data/products/meu-produto.json

# 2. Adicione ao índice
# Edite data/products/index.json e adicione "meu-produto"

# 3. Adicione a imagem
# Coloque meu-produto-logo.png em images/products/
```

### 2. Adicionar Novo Tópico
```bash
# 1. Crie o arquivo JSON
echo '{
  "id": "novo-topico",
  "title": {
    "pt": "Novo Tópico",
    "en": "New Topic",
    "es": "Nuevo Tópico"
  },
  "description": {
    "pt": "Descrição...",
    "en": "Description...",
    "es": "Descripción..."
  },
  "icon": "fas fa-star",
  "date": "2024-01-01"
}' > data/topics/novo-topico.json

# 2. Adicione ao índice
# Edite data/topics/index.json
```

### 3. Adicionar Nova Vaga
```bash
# 1. Crie o arquivo JSON
echo '{
  "id": "nova-vaga",
  "title": {
    "pt": "Nova Vaga",
    "en": "New Job",
    "es": "Nuevo Trabajo"
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
  "location": "Remoto"
}' > data/vagas/nova-vaga.json

# 2. Adicione ao índice
# Edite data/vagas/index.json
```

## 🎨 Personalização Rápida

### Cores Principais
```css
/* Amarelo da Elevate */
--primary-color: #FFD700;

/* Preto */
--text-color: #333;

/* Fundo claro */
--bg-color: #fafafa;
```

### Logos dos Produtos
- **Formato**: PNG (preferido) ou JPG
- **Tamanho**: 300x200px
- **Fundo**: Transparente (PNG) ou branco
- **Localização**: `images/products/`

### Textos Multi-idioma
```html
<!-- Use data-i18n para tradução automática -->
<h1 data-i18n="hero.title">Título</h1>
<p data-i18n="hero.subtitle">Subtítulo</p>
```

## 🚀 Deploy Rápido

### Google Cloud Storage
```bash
# 1. Instale gcloud CLI
# 2. Configure o projeto
gcloud config set project SEU_PROJETO

# 3. Crie bucket e faça upload
gsutil mb gs://elevate-website
gsutil -m cp -r . gs://elevate-website/

# 4. Configure como website
gsutil web set -m index.html gs://elevate-website
```

### Netlify (Mais Fácil)
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto
3. Pronto! Site online

### GitHub Pages
1. Faça push para GitHub
2. Vá em Settings > Pages
3. Selecione a branch main
4. Pronto! Site em `username.github.io/repo`

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Produtos não carregam
```bash
# Verifique se os arquivos JSON existem
ls data/products/

# Verifique a sintaxe JSON
cat data/products/index.json | python -m json.tool
```

#### 2. Imagens não aparecem
```bash
# Verifique se as imagens existem
ls images/products/

# Verifique o caminho no JSON
cat data/products/seathub.json | grep image
```

#### 3. Traduções não funcionam
```bash
# Verifique se as chaves existem
grep "data-i18n" index.html

# Verifique o arquivo i18n.js
cat js/i18n.js | grep "chave"
```

#### 4. Servidor não inicia
```bash
# Verifique se a porta está livre
lsof -i :8000

# Use outra porta
python -m http.server 8080
```

## 📞 Suporte

### Informações de Contato
- **Email**: contato@elevatebr.org
- **WhatsApp**: +55 (24) 99940-2412
- **Endereço**: Rua Vinte Nove de Setembro, 53, 2º andar, Campos Elíseos, Resende - RJ

### Recursos Úteis
- **README.md**: Documentação completa
- **js/i18n.js**: Sistema de traduções
- **data/**: Estrutura de dados
- **images/**: Imagens e logos

## 🎯 Próximos Passos

1. **Personalize os Produtos**: Adicione seus produtos reais
2. **Configure as Imagens**: Adicione os logos dos produtos
3. **Atualize as Vagas**: Adicione vagas reais da empresa
4. **Configure o Google Maps**: Adicione sua API key
5. **Deploy**: Coloque o site online

---

**Elevate** - Challenging projects demand visionary professionals. 