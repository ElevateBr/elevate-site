#!/bin/bash

# Script para fazer deploy do site Elevate no Google Cloud Run
# Pré-requisitos: gcloud CLI instalado e configurado

set -e

# Configurações
PROJECT_ID=$(gcloud config get-value project)
REGION="us-central1"
SERVICE_NAME="elevate-site"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🚀 Iniciando deploy do site Elevate no Cloud Run..."
echo "📋 Projeto: $PROJECT_ID"
echo "🌍 Região: $REGION"
echo "🏷️  Serviço: $SERVICE_NAME"

# Verificar se o projeto está configurado
if [ -z "$PROJECT_ID" ]; then
    echo "❌ Erro: Nenhum projeto configurado. Execute 'gcloud config set project SEU_PROJECT_ID'"
    exit 1
fi

# Habilitar APIs necessárias
echo "🔧 Habilitando APIs necessárias..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com

# Construir e fazer push da imagem
echo "🏗️  Construindo imagem Docker..."
docker build -t $IMAGE_NAME .

echo "📤 Fazendo push da imagem para Container Registry..."
docker push $IMAGE_NAME

# Deploy no Cloud Run
echo "🚀 Fazendo deploy no Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --port 80 \
    --memory 512Mi \
    --cpu 1 \
    --max-instances 10 \
    --min-instances 0 \
    --timeout 300 \
    --set-env-vars "NODE_ENV=production"

# Obter URL do serviço
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo "✅ Deploy concluído com sucesso!"
echo "🌐 URL do site: $SERVICE_URL"
echo ""
echo "📝 Para verificar o status do serviço:"
echo "   gcloud run services describe $SERVICE_NAME --region=$REGION"
echo ""
echo "📊 Para ver os logs:"
echo "   gcloud logs read --filter resource.type=cloud_run_revision --limit=50" 