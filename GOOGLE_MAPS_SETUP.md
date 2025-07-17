# Configuração do Google Maps API

## 🔧 Como Configurar

### 1. Obter API Key
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Maps JavaScript API**
4. Vá para "Credenciais" e crie uma nova chave de API
5. Configure as restrições de domínio para segurança

### 2. Atualizar o Código
Substitua `YOUR_GOOGLE_MAPS_API_KEY` no arquivo `js/map.js`:

```javascript
// Linha 155 em js/map.js
script.src = 'https://maps.googleapis.com/maps/api/js?key=SUA_API_KEY_AQUI&callback=initMap&loading=async&libraries=marker';
```

### 3. Restrições Recomendadas
- **Aplicações da Web**: Restrinja por domínio
- **Desenvolvimento local**: Adicione `localhost` e `127.0.0.1`
- **Produção**: Adicione seu domínio de produção

## ⚠️ Importante
- A API Key é gratuita para uso básico
- Configure restrições para evitar uso não autorizado
- Monitore o uso no Google Cloud Console

## 🚀 Alternativa para Desenvolvimento
Para desenvolvimento local, você pode usar um mapa estático ou desabilitar temporariamente:

```javascript
// Comentar a linha do Google Maps e usar um placeholder
// script.src = 'https://maps.googleapis.com/maps/api/js?key=...';
```

## 📍 Coordenadas Atuais
- **Elevate**: Rua Vinte Nove de Setembro, 53, 2º andar, Campos Elíseos, Resende - RJ
- **Latitude**: -22.4689
- **Longitude**: -44.4469 