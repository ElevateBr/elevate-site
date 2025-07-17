#!/bin/bash

# Script de Deploy para GCP Bucket
# SiteElevate - Deploy Automation

set -e

# Configurações
PROJECT_ID=""
BUCKET_NAME=""
REGION="us-central1"
WEBSITE_MAIN_PAGE="index.html"
WEBSITE_NOT_FOUND_PAGE="404.html"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  SiteElevate - Deploy Script${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Verificar se gcloud está instalado
check_gcloud() {
    if ! command -v gcloud &> /dev/null; then
        print_error "Google Cloud SDK não está instalado."
        echo "Instale em: https://cloud.google.com/sdk/docs/install"
        exit 1
    fi
}

# Verificar se gsutil está disponível
check_gsutil() {
    if ! command -v gsutil &> /dev/null; then
        print_error "gsutil não está disponível."
        exit 1
    fi
}

# Configurar projeto
setup_project() {
    if [ -z "$PROJECT_ID" ]; then
        echo -n "Digite o ID do projeto GCP: "
        read PROJECT_ID
    fi
    
    print_message "Configurando projeto: $PROJECT_ID"
    gcloud config set project $PROJECT_ID
    
    if [ $? -eq 0 ]; then
        print_message "Projeto configurado com sucesso!"
    else
        print_error "Erro ao configurar projeto."
        exit 1
    fi
}

# Criar bucket se não existir
create_bucket() {
    if [ -z "$BUCKET_NAME" ]; then
        echo -n "Digite o nome do bucket: "
        read BUCKET_NAME
    fi
    
    print_message "Verificando bucket: $BUCKET_NAME"
    
    if gsutil ls -b gs://$BUCKET_NAME &> /dev/null; then
        print_message "Bucket já existe!"
    else
        print_message "Criando bucket: $BUCKET_NAME"
        gsutil mb -p $PROJECT_ID -c STANDARD -l $REGION gs://$BUCKET_NAME
        
        if [ $? -eq 0 ]; then
            print_message "Bucket criado com sucesso!"
        else
            print_error "Erro ao criar bucket."
            exit 1
        fi
    fi
}

# Configurar website
setup_website() {
    print_message "Configurando website..."
    
    # Criar arquivo 404.html se não existir
    if [ ! -f "404.html" ]; then
        cat > 404.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página não encontrada - SiteElevate</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background: #1a1a1a;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
        }
        .container {
            max-width: 600px;
            padding: 2rem;
        }
        h1 { color: #ffd700; font-size: 3rem; margin-bottom: 1rem; }
        p { color: #e0e0e0; font-size: 1.2rem; margin-bottom: 2rem; }
        .btn {
            background: #ffd700;
            color: #1a1a1a;
            padding: 1rem 2rem;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            display: inline-block;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: #ffe44d;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>404</h1>
        <p>Página não encontrada</p>
        <p>A página que você está procurando não existe ou foi movida.</p>
        <a href="/" class="btn">Voltar ao Início</a>
    </div>
</body>
</html>
EOF
        print_message "Arquivo 404.html criado!"
    fi
    
    # Configurar website
    gsutil web set -m $WEBSITE_MAIN_PAGE -e $WEBSITE_NOT_FOUND_PAGE gs://$BUCKET_NAME
    
    if [ $? -eq 0 ]; then
        print_message "Website configurado com sucesso!"
    else
        print_error "Erro ao configurar website."
        exit 1
    fi
}

# Fazer upload dos arquivos
upload_files() {
    print_message "Fazendo upload dos arquivos..."
    
    # Lista de arquivos para upload
    FILES=(
        "index.html"
        "404.html"
        "css/"
        "js/"
        "data/"
        "README.md"
    )
    
    # Upload com progresso
    for file in "${FILES[@]}"; do
        if [ -e "$file" ]; then
            print_message "Uploading: $file"
            gsutil -m cp -r "$file" gs://$BUCKET_NAME/
        else
            print_warning "Arquivo não encontrado: $file"
        fi
    done
    
    print_message "Upload concluído!"
}

# Configurar permissões públicas
make_public() {
    print_message "Configurando permissões públicas..."
    
    gsutil iam ch allUsers:objectViewer gs://$BUCKET_NAME
    
    if [ $? -eq 0 ]; then
        print_message "Bucket tornado público!"
    else
        print_warning "Erro ao tornar bucket público. Verifique as permissões."
    fi
}

# Mostrar URL do website
show_website_url() {
    local website_url="https://storage.googleapis.com/$BUCKET_NAME/index.html"
    local custom_domain="https://$BUCKET_NAME.web.app"
    
    echo ""
    print_message "Deploy concluído com sucesso!"
    echo ""
    echo -e "${BLUE}URLs do Website:${NC}"
    echo -e "  ${GREEN}Storage URL:${NC} $website_url"
    echo -e "  ${GREEN}Custom Domain:${NC} $custom_domain"
    echo ""
    print_message "Para configurar um domínio customizado, consulte a documentação do GCP."
}

# Função principal
main() {
    print_header
    
    # Verificações
    check_gcloud
    check_gsutil
    
    # Setup
    setup_project
    create_bucket
    setup_website
    
    # Deploy
    upload_files
    make_public
    
    # Resultado
    show_website_url
}

# Verificar argumentos
case "${1:-}" in
    --help|-h)
        echo "Uso: $0 [opções]"
        echo ""
        echo "Opções:"
        echo "  --help, -h     Mostrar esta ajuda"
        echo "  --project ID   Definir ID do projeto"
        echo "  --bucket NAME  Definir nome do bucket"
        echo "  --region REG   Definir região (padrão: us-central1)"
        echo ""
        echo "Exemplo:"
        echo "  $0 --project my-project --bucket my-website"
        exit 0
        ;;
    --project)
        PROJECT_ID="$2"
        shift 2
        ;;
    --bucket)
        BUCKET_NAME="$2"
        shift 2
        ;;
    --region)
        REGION="$2"
        shift 2
        ;;
esac

# Executar script principal
main "$@" 