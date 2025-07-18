# Deploy do Site Elevate no Google Cloud Run

Este documento explica como fazer deploy do site Elevate no Google Cloud Run.

## 📋 Pré-requisitos

1. **Conta Google Cloud Platform** com billing habilitado
2. **Google Cloud CLI** instalado e configurado
3. **Docker** instalado (para build local)
4. **Projeto GCP** criado

## 🚀 Deploy Manual

### 1. Configurar o projeto

```bash
# Configurar o projeto GCP
gcloud config set project SEU_PROJECT_ID

# Verificar configuração
gcloud config list
```

### 2. Executar o script de deploy

```bash
# Dar permissão de execução ao script
chmod +x deploy-cloud-run.sh

# Executar o deploy
./deploy-cloud-run.sh
```

### 3. Deploy manual (alternativo)

Se preferir fazer o deploy manualmente:

```bash
# Habilitar APIs necessárias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Construir e fazer push da imagem
docker build -t gcr.io/SEU_PROJECT_ID/elevate-site .
docker push gcr.io/SEU_PROJECT_ID/elevate-site

# Deploy no Cloud Run
gcloud run deploy elevate-site \
    --image gcr.io/SEU_PROJECT_ID/elevate-site \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 80 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --min-instances 0
```

## 🔄 Deploy Automatizado com Cloud Build

### 1. Configurar Cloud Build

```bash
# Dar permissão ao Cloud Build
gcloud projects add-iam-policy-binding SEU_PROJECT_ID \
    --member="serviceAccount:SEU_PROJECT_ID@cloudbuild.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding SEU_PROJECT_ID \
    --member="serviceAccount:SEU_PROJECT_ID@cloudbuild.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"
```

### 2. Conectar repositório (opcional)

Para deploy automático a cada push:

1. Vá para [Cloud Build](https://console.cloud.google.com/cloud-build)
2. Clique em "Connect repository"
3. Conecte seu repositório GitHub/GitLab
4. Configure o trigger para usar o arquivo `cloudbuild.yaml`

### 3. Deploy manual via Cloud Build

```bash
# Fazer deploy via Cloud Build
gcloud builds submit --config cloudbuild.yaml .
```

## 🔧 Configurações

### Recursos do Cloud Run

- **CPU**: 1 vCPU
- **Memória**: 512 MiB
- **Máximo de instâncias**: 10
- **Mínimo de instâncias**: 0 (scale to zero)
- **Timeout**: 300 segundos
- **Porta**: 80

### Variáveis de Ambiente

- `NODE_ENV=production`

## 📊 Monitoramento

### Verificar status do serviço

```bash
gcloud run services describe elevate-site --region=us-central1
```

### Ver logs

```bash
gcloud logs read --filter resource.type=cloud_run_revision --limit=50
```

### Métricas no Console

1. Acesse [Cloud Run Console](https://console.cloud.google.com/run)
2. Selecione o serviço `elevate-site`
3. Veja métricas de requisições, latência, etc.

## 🔒 Segurança

O serviço está configurado com:

- **Headers de segurança** (X-Frame-Options, XSS-Protection, etc.)
- **Compressão gzip** para melhor performance
- **Cache headers** para arquivos estáticos
- **HTTPS** automático (fornecido pelo Cloud Run)

## 💰 Custos

O Cloud Run cobra apenas pelo que você usa:

- **CPU**: $0.00002400 por vCPU-segundo
- **Memória**: $0.00000250 por GiB-segundo
- **Requisições**: $0.40 por milhão de requisições

Com configuração atual (0-10 instâncias), custos típicos:
- **Baixo tráfego**: ~$5-10/mês
- **Médio tráfego**: ~$20-50/mês

## 🛠️ Troubleshooting

### Erro: "Permission denied"

```bash
# Verificar permissões
gcloud auth list
gcloud config get-value project
```

### Erro: "API not enabled"

```bash
# Habilitar APIs necessárias
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### Erro: "Image not found"

```bash
# Verificar se a imagem foi construída
docker images | grep elevate-site
```

### Erro: "Port already in use"

O Cloud Run gerencia as portas automaticamente. Verifique se o Dockerfile está correto:

```dockerfile
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔄 Atualizações

Para atualizar o site:

1. Faça as alterações no código
2. Execute novamente o script de deploy:
   ```bash
   ./deploy-cloud-run.sh
   ```

Ou se estiver usando Cloud Build, simplesmente faça push para o repositório.

## 📞 Suporte

Para problemas específicos do Cloud Run:
- [Documentação oficial](https://cloud.google.com/run/docs)
- [Cloud Run Troubleshooting](https://cloud.google.com/run/docs/troubleshooting)
- [Cloud Build Documentation](https://cloud.google.com/build/docs) 