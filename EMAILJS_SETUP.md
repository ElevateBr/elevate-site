# Configuração do EmailJS para Envio de E-mails

## Passo a Passo para Configurar o EmailJS

### 1. Criar Conta no EmailJS
1. Acesse [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Faça login no dashboard

### 2. Configurar Serviço de E-mail
1. No dashboard, vá para "Email Services"
2. Clique em "Add New Service"
3. Escolha seu provedor de e-mail (Gmail, Outlook, etc.)
4. Configure a autenticação
5. Anote o **Service ID** gerado

### 3. Criar Template de E-mail
1. Vá para "Email Templates"
2. Clique em "Create New Template"
3. Use o seguinte template:

```html
<h2>Nova Mensagem do Site Elevate</h2>

<p><strong>Nome:</strong> {{from_name}}</p>
<p><strong>E-mail:</strong> {{from_email}}</p>
<p><strong>Telefone:</strong> {{from_phone}}</p>
<p><strong>Empresa:</strong> {{from_company}}</p>

<h3>Mensagem:</h3>
<p>{{message}}</p>

<hr>
<p><em>Enviado através do formulário de contato do site Elevate</em></p>
```

4. Anote o **Template ID** gerado

### 4. Obter Chave Pública
1. Vá para "Account" > "API Keys"
2. Copie sua **Public Key**

### 5. Configurar no Código
1. Abra o arquivo `js/contact.js`
2. Substitua os valores:

```javascript
// Linha 1: Substitua YOUR_PUBLIC_KEY pela sua chave pública
emailjs.init("SUA_CHAVE_PUBLICA_AQUI");

// Linha 2: Substitua YOUR_SERVICE_ID pelo ID do serviço
'SEU_SERVICE_ID_AQUI'

// Linha 3: Substitua YOUR_TEMPLATE_ID pelo ID do template
'SEU_TEMPLATE_ID_AQUI'
```

### 6. Testar
1. Preencha o formulário de contato
2. Envie uma mensagem de teste
3. Verifique se o e-mail foi recebido

## Configuração Alternativa (Sem EmailJS)

Se preferir não usar EmailJS, você pode:

### Opção 1: Formspree
1. Acesse [https://formspree.io/](https://formspree.io/)
2. Crie uma conta gratuita
3. Crie um novo formulário
4. Use o endpoint fornecido

### Opção 2: Netlify Forms
1. Se hospedar no Netlify, adicione `netlify` ao formulário
2. Os e-mails serão enviados automaticamente

### Opção 3: Backend Próprio
1. Crie um servidor backend (Node.js, PHP, etc.)
2. Configure SMTP para envio de e-mails
3. Crie um endpoint `/api/contact`

## Exemplo de Configuração Completa

```javascript
// js/contact.js - Linha de configuração
emailjs.init("user_abc123def456"); // Sua chave pública

// Envio do e-mail
const response = await emailjs.send(
    'service_xyz789', // Seu Service ID
    'template_abc123', // Seu Template ID
    templateParams
);
```

## Notas Importantes

- **Limite gratuito**: EmailJS permite 200 e-mails/mês gratuitamente
- **Segurança**: Nunca exponha chaves privadas no frontend
- **Validação**: O código já inclui validação completa dos campos
- **Responsividade**: Funciona em todos os dispositivos
- **Internacionalização**: Suporta múltiplos idiomas 