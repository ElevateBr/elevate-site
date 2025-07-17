# Sistema Dinâmico de Vagas

## Funcionalidades Implementadas

### ✅ Carregamento Dinâmico
- Vagas carregadas automaticamente de arquivos JSON
- Cada vaga em um arquivo separado em `data/vagas/`
- Lista de vagas controlada por `data/vagas/index.json`

### ✅ Controle de Visibilidade
- **Seção oculta automaticamente** quando não há vagas
- **Botão flutuante oculto** quando não há vagas
- **Exibição automática** quando há vagas disponíveis

### ✅ Botão Flutuante Atraente
- Design moderno com gradiente dourado
- Animação de pulso contínua
- Posicionamento fixo no canto inferior direito
- Responsivo para dispositivos móveis
- Clique direciona suavemente para a seção de vagas

## Como Usar

### 1. Adicionar Vagas
```bash
# Estrutura de arquivos
data/vagas/
├── index.json          # Lista de vagas disponíveis
├── frontend-developer.json
├── backend-developer.json
├── mobile-developer.json
└── devops-engineer.json
```

### 2. Formato do Arquivo index.json
```json
{
  "vagas": [
    "frontend-developer",
    "backend-developer",
    "mobile-developer",
    "devops-engineer"
  ]
}
```

### 3. Formato de Cada Vaga (exemplo: frontend-developer.json)
```json
{
  "id": "frontend-developer",
  "title": {
    "pt": "Frontend Developer",
    "en": "Frontend Developer",
    "es": "Desarrollador Frontend"
  },
  "type": "Full-time",
  "location": "Remoto",
  "description": {
    "pt": "Descrição em português...",
    "en": "Description in English...",
    "es": "Descripción en español..."
  },
  "requirements": {
    "pt": ["Requisito 1", "Requisito 2"],
    "en": ["Requirement 1", "Requirement 2"],
    "es": ["Requisito 1", "Requisito 2"]
  },
  "benefits": {
    "pt": ["Benefício 1", "Benefício 2"],
    "en": ["Benefit 1", "Benefit 2"],
    "es": ["Beneficio 1", "Beneficio 2"]
  },
  "date": "2024-01-15"
}
```

### 4. Ocultar Todas as Vagas
Para ocultar todas as vagas, use o arquivo `index-empty.json`:
```json
{
  "vagas": []
}
```

## Comportamento do Sistema

### Quando Há Vagas:
- ✅ Seção de recrutamento visível
- ✅ Botão flutuante visível
- ✅ Vagas carregadas dinamicamente
- ✅ Botão flutuante direciona para a seção

### Quando Não Há Vagas:
- ❌ Seção de recrutamento oculta
- ❌ Botão flutuante oculto
- ✅ Site funciona normalmente sem a seção

## Traduções

O botão flutuante suporta 3 idiomas:
- **Português**: "Vagas Abertas!" / "Junte-se à nossa equipe"
- **Inglês**: "Open Positions!" / "Join our team"
- **Espanhol**: "¡Posiciones Abiertas!" / "Únete a nuestro equipo"

## Responsividade

- **Desktop**: Botão grande com animação completa
- **Mobile**: Botão menor, posicionamento ajustado
- **Tablet**: Adaptação automática do tamanho

## Arquivos Modificados

- `js/vagas.js` - Lógica de carregamento dinâmico
- `index.html` - Botão flutuante adicionado
- `css/style.css` - Estilos do botão flutuante
- `js/i18n.js` - Traduções do botão flutuante

## Teste

1. **Com vagas**: Use `data/vagas/index.json` atual
2. **Sem vagas**: Renomeie para `data/vagas/index-empty.json`
3. **Recarregue a página** para ver as mudanças 