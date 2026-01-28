# 🚀 SCRIPT DE INICIO - SessionForm Component
# Version: Windows PowerShell
# Este script automatiza la instalación y ejecución del proyecto

# Configuración de salida
$HOST.UI.RawUI.BackgroundColor = "Black"
Clear-Host

# Colores
function Write-Info { Write-Host $args -ForegroundColor Blue }
function Write-Success { Write-Host $args -ForegroundColor Green }
function Write-Warning { Write-Host $args -ForegroundColor Yellow }
function Write-Error { Write-Host $args -ForegroundColor Red }

# Obtener directorio del proyecto
$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

Write-Info "╔════════════════════════════════════════════════════════╗"
Write-Info "║     SessionForm Component - Script de Inicio           ║"
Write-Info "╚════════════════════════════════════════════════════════╝"
Write-Info ""

# Verificar Node.js
Write-Info "Verificando Node.js..."
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Success "✓ Node.js detectado: $nodeVersion"
} else {
    Write-Error "✗ Node.js no está instalado"
    Write-Info "  Descárgalo desde: https://nodejs.org/"
    exit 1
}

# Verificar npm
Write-Info "Verificando npm..."
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Success "✓ npm detectado: $npmVersion"
} else {
    Write-Error "✗ npm no está instalado"
    exit 1
}

Write-Info ""
Write-Warning "Opciones disponibles:"
Write-Host "  1) Instalar dependencias"
Write-Host "  2) Iniciar servidor de desarrollo"
Write-Host "  3) Compilar para producción"
Write-Host "  4) Vista previa de producción"
Write-Host "  5) Ejecutar linter"
Write-Host "  6) Instalar y ejecutar servidor"
Write-Host "  7) Limpiar (borrar node_modules y dist)"
Write-Host "  0) Salir"
Write-Host ""

$option = Read-Host "Selecciona una opción (0-7)"

switch($option) {
    "1" {
        Write-Warning "Instalando dependencias..."
        Set-Location $projectDir
        npm install
        Write-Success "✓ Dependencias instaladas"
    }
    
    "2" {
        Write-Warning "Iniciando servidor de desarrollo..."
        Set-Location $projectDir
        
        # Verificar si node_modules existe
        if (-not (Test-Path "node_modules")) {
            Write-Warning "Instalando dependencias primero..."
            npm install
        }
        
        npm run dev
    }
    
    "3" {
        Write-Warning "Compilando para producción..."
        Set-Location $projectDir
        
        if (-not (Test-Path "node_modules")) {
            npm install
        }
        
        npm run build
        Write-Success "✓ Compilación completada"
        Write-Info "Archivos generados en: $projectDir\dist"
    }
    
    "4" {
        Write-Warning "Iniciando vista previa de producción..."
        Set-Location $projectDir
        
        if (-not (Test-Path "node_modules")) {
            npm install
        }
        
        npm run preview
    }
    
    "5" {
        Write-Warning "Ejecutando linter..."
        Set-Location $projectDir
        npm run lint
    }
    
    "6" {
        Write-Warning "Instalando dependencias e iniciando servidor..."
        Set-Location $projectDir
        
        if (-not (Test-Path "node_modules")) {
            Write-Warning "Instalando dependencias..."
            npm install
        }
        
        Write-Success "✓ Iniciando servidor..."
        npm run dev
    }
    
    "7" {
        Write-Warning "Limpiando archivos generados..."
        Set-Location $projectDir
        
        if (Test-Path "node_modules") {
            Write-Host "Borrando node_modules..."
            Remove-Item -Recurse -Force "node_modules"
            Write-Success "✓ node_modules borrado"
        }
        
        if (Test-Path "dist") {
            Write-Host "Borrando dist..."
            Remove-Item -Recurse -Force "dist"
            Write-Success "✓ dist borrado"
        }
        
        Write-Success "✓ Limpieza completada"
    }
    
    "0" {
        Write-Info "¡Hasta luego!"
        exit 0
    }
    
    default {
        Write-Error "Opción no válida"
        exit 1
    }
}

Write-Info ""
Write-Success "¡Completado!"

# Información útil
Write-Info ""
Write-Info "═══════════════════════════════════════════════════════"
Write-Info "INFORMACIÓN ÚTIL:"
Write-Info "═══════════════════════════════════════════════════════"
Write-Info ""
Write-Warning "Documentación disponible:"
Write-Host "  • SESSIONFORM_README.md - Guía de uso"
Write-Host "  • GUIA_IMPLEMENTACION.md - Guía técnica"
Write-Host "  • EJEMPLOS_AVANZADOS.md - 10 ejemplos de código"
Write-Host "  • ARQUITECTURA_DIAGRAMA.md - Diagramas de arquitectura"
Write-Host "  • RESUMEN_IMPLEMENTACION.md - Resumen del proyecto"
Write-Info ""
Write-Warning "URLs:"
Write-Host "  • Desarrollo: http://localhost:5173/"
Write-Host "  • Documentación: Consulta los archivos .md"
Write-Info ""
Write-Warning "Próximos pasos:"
Write-Host "  1. Ejecuta: npm run dev"
Write-Host "  2. Abre: http://localhost:5173/"
Write-Host "  3. Prueba el formulario"
Write-Host "  4. Recarga la página para ver la sesión guardada"
Write-Info ""
Write-Info "═══════════════════════════════════════════════════════"
