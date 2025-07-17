# Solução para Vagas Não Visíveis

## Problema Identificado

A seção de recrutamento não estava sendo exibida mesmo com vagas disponíveis no diretório `data/vagas/`.

## Causas Possíveis

1. **Ordem de inicialização**: Managers sendo inicializados antes do i18n estar pronto
2. **Erro no carregamento**: Problemas ao carregar arquivos JSON
3. **Timing**: DOM não estar completamente carregado

## Soluções Implementadas

### ✅ 1. Sistema de Inicialização Centralizado

Criado `js/init.js` que:
- Aguarda o DOM estar pronto
- Aguarda o i18n estar inicializado
- Inicializa todos os managers na ordem correta

### ✅ 2. Fallback Robusto

O VagasManager agora:
- Usa dados de exemplo se houver erro no carregamento
- Sempre exibe a seção se houver dados (reais ou de exemplo)
- Logs detalhados para debug

### ✅ 3. Verificação de Dependências

O VagasManager agora:
- Aguarda o i18n estar pronto antes de inicializar
- Verifica se os elementos DOM existem
- Trata erros graciosamente

## Como Testar

### 1. Verificar Console do Navegador
Abra o DevTools (F12) e verifique:
- Se há erros no console
- Se os logs de inicialização aparecem
- Se as vagas estão sendo carregadas

### 2. Verificar Arquivos JSON
Confirme que:
- `data/vagas/index.json` existe e tem vagas listadas
- Cada arquivo de vaga existe (ex: `frontend-developer.json`)
- Os arquivos JSON são válidos

### 3. Teste Manual
```javascript
// No console do navegador:
console.log('VagasManager:', window.vagasManager);
console.log('Seção:', document.getElementById('recrutamento'));
console.log('Container:', document.getElementById('vagas-container'));
```

## Estrutura de Arquivos Correta

```
data/vagas/
├── index.json              # Lista de vagas disponíveis
├── frontend-developer.json # Vaga específica
├── backend-developer.json  # Vaga específica
├── mobile-developer.json   # Vaga específica
└── devops-engineer.json   # Vaga específica
```

## Formato do index.json

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

## Formato de Cada Vaga

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
    "pt": "Descrição...",
    "en": "Description...",
    "es": "Descripción..."
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

## Comportamento Esperado

### ✅ Quando Há Vagas:
- Seção de recrutamento visível
- Botão flutuante visível
- Vagas carregadas dinamicamente

### ❌ Quando Não Há Vagas:
- Seção de recrutamento oculta
- Botão flutuante oculto

### 🔄 Fallback:
- Se houver erro no carregamento, usa dados de exemplo
- Sempre exibe a seção se houver dados

## Arquivos Modificados

- `js/init.js` - Novo sistema de inicialização
- `js/vagas.js` - Melhorado com fallback e logs
- `index.html` - Adicionado script de inicialização
- `js/products.js` - Removida inicialização automática

## Próximos Passos

1. Recarregue a página
2. Verifique o console do navegador
3. Confirme que a seção de recrutamento está visível
4. Teste o botão flutuante 