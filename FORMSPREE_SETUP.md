# Configuração do Formspree para Envio de E-mails

## Configuração Rápida (Recomendado)

### 1. Criar Conta no Formspree
1. Acesse [https://formspree.io/](https://formspree.io/)
2. Clique em "Sign Up" e crie uma conta gratuita
3. Faça login no dashboard

### 2. Criar Novo Formulário
1. No dashboard, clique em "New Form"
2. Dê um nome ao formulário (ex: "Elevate Contact")
3. Copie o **endpoint** fornecido (algo como `xaybzwkd`)

### 3. Configurar no Código
1. Abra o arquivo `js/contact.js`
2. Encontre a linha com `YOUR_FORMSPREE_ENDPOINT`
3. Substitua pelo seu endpoint real:

```javascript
// Linha 15: Substitua pelo seu endpoint do Formspree
const response = await fetch('https://formspree.io/f/SEU_ENDPOINT_AQUI', {
```

### 4. Testar
1. Preencha o formulário de contato
2. Envie uma mensagem de teste
3. Verifique se o e-mail foi recebido

## Exemplo de Configuração Completa

```javascript
// js/contact.js - Linha de configuração
const response = await fetch('https://formspree.io/f/xaybzwkd', {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
});
```

## Vantagens do Formspree

- ✅ **Configuração simples**: Apenas 3 passos
- ✅ **Gratuito**: 50 envios/mês gratuitamente
- ✅ **Sem backend**: Funciona direto do frontend
- ✅ **Spam protection**: Proteção automática contra spam
- ✅ **Notificações**: E-mails automáticos para novos envios
- ✅ **Dashboard**: Interface para gerenciar envios

## Configuração Alternativa: Netlify Forms

Se você hospedar o site no Netlify, pode usar Netlify Forms:

1. Adicione `netlify` ao formulário no HTML:
```html
<form id="contact-form" netlify>
```

2. Remova o JavaScript de envio e deixe o formulário funcionar nativamente

## Notas Importantes

- **Limite gratuito**: Formspree permite 50 envios/mês gratuitamente
- **Validação**: O código já inclui validação completa
- **Responsividade**: Funciona em todos os dispositivos
- **Internacionalização**: Suporta múltiplos idiomas
- **Segurança**: Formspree inclui proteção contra spam 