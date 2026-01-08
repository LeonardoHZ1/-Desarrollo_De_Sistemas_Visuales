# Dashboard de Estado del Proyecto MERN

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "       DASHBOARD DEL PROYECTO MERN    " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Verificar contenedores Docker
Write-Host "Estado de Contenedores Docker:" -ForegroundColor Yellow
try {
    $containers = docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | Out-String
    Write-Host $containers
} catch {
    Write-Host "Error al obtener estado de contenedores: $_" -ForegroundColor Red
}

Write-Host ""

# Verificar URLs
$urls = @(
    @{Name="Backend API"; Url="http://localhost:5000"; Expected="Hello from MERN Backend"},
    @{Name="Frontend"; Url="http://localhost:3000"; Expected="<!doctype html>"}
)

foreach ($url in $urls) {
    Write-Host "Verificando $($url.Name): $($url.Url)" -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri $url.Url -TimeoutSec 10 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            if ($response.Content -match $url.Expected) {
                Write-Host "  ✓ $($url.Name) está funcionando correctamente" -ForegroundColor Green
            } else {
                Write-Host "  ⚠ $($url.Name) responde, pero contenido inesperado" -ForegroundColor Yellow
            }
        } else {
            Write-Host "  ✗ $($url.Name) devolvió código $($response.StatusCode)" -ForegroundColor Red
        }
    } catch {
        Write-Host "  ✗ $($url.Name) no está accesible: $($_.Exception.Message)" -ForegroundColor Red
    }
    Write-Host ""
}

# Verificar MongoDB
Write-Host "Verificando MongoDB:" -ForegroundColor Yellow
try {
    $mongoStatus = docker exec mern-mongo mongosh --eval "db.runCommand('ping')" --quiet 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ MongoDB está funcionando" -ForegroundColor Green
    } else {
        Write-Host "  ✗ MongoDB no responde" -ForegroundColor Red
    }
} catch {
    Write-Host "  ✗ Error al verificar MongoDB: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Fin del Dashboard" -ForegroundColor Cyan