#!/bin/bash

# 🚀 SCRIPT DE INICIO - SessionForm Component
# Este script automatiza la instalación y ejecución del proyecto

# Colores para terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Directorio del proyecto
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║     SessionForm Component - Script de Inicio           ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js no está instalado${NC}"
    echo "  Descárgalo desde: https://nodejs.org/"
    exit 1
else
    echo -e "${GREEN}✓ Node.js detectado:${NC} $(node --version)"
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm no está instalado${NC}"
    exit 1
else
    echo -e "${GREEN}✓ npm detectado:${NC} $(npm --version)"
fi

echo ""
echo -e "${YELLOW}Opciones disponibles:${NC}"
echo "  1) Instalar dependencias"
echo "  2) Iniciar servidor de desarrollo"
echo "  3) Compilar para producción"
echo "  4) Vista previa de producción"
echo "  5) Ejecutar linter"
echo "  6) Instalar y ejecutar servidor"
echo "  0) Salir"
echo ""

read -p "Selecciona una opción (0-6): " option

case $option in
    1)
        echo -e "${YELLOW}Instalando dependencias...${NC}"
        cd "$PROJECT_DIR"
        npm install
        echo -e "${GREEN}✓ Dependencias instaladas${NC}"
        ;;
    2)
        echo -e "${YELLOW}Iniciando servidor de desarrollo...${NC}"
        cd "$PROJECT_DIR"
        
        # Verificar si node_modules existe
        if [ ! -d "node_modules" ]; then
            echo -e "${YELLOW}Instalando dependencias primero...${NC}"
            npm install
        fi
        
        npm run dev
        ;;
    3)
        echo -e "${YELLOW}Compilando para producción...${NC}"
        cd "$PROJECT_DIR"
        
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        
        npm run build
        echo -e "${GREEN}✓ Compilación completada${NC}"
        echo -e "${BLUE}Archivos generados en:${NC} $PROJECT_DIR/dist"
        ;;
    4)
        echo -e "${YELLOW}Iniciando vista previa de producción...${NC}"
        cd "$PROJECT_DIR"
        npm run preview
        ;;
    5)
        echo -e "${YELLOW}Ejecutando linter...${NC}"
        cd "$PROJECT_DIR"
        npm run lint
        ;;
    6)
        echo -e "${YELLOW}Instalando dependencias e iniciando servidor...${NC}"
        cd "$PROJECT_DIR"
        
        if [ ! -d "node_modules" ]; then
            echo -e "${YELLOW}Instalando dependencias...${NC}"
            npm install
        fi
        
        echo -e "${GREEN}✓ Iniciando servidor...${NC}"
        npm run dev
        ;;
    0)
        echo -e "${BLUE}¡Hasta luego!${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}Opción no válida${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}¡Completado!${NC}"
