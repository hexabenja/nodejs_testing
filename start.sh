#!/bin/bash

# 🚀 Script de inicio rápido para Test App
# Este script facilita el desarrollo y deploy local

set -e

echo "🧪 Test App - Script de Inicio Rápido"
echo "======================================"
echo ""

# Función para mostrar el menú
show_menu() {
    echo "Selecciona una opción:"
    echo ""
    echo "1) 🏃 Desarrollo Local (npm)"
    echo "2) 🐳 Docker Compose (desarrollo)"
    echo "3) 📦 Build para producción"
    echo "4) 🧹 Limpiar node_modules y builds"
    echo "5) ✅ Verificar salud del backend"
    echo "6) 🛑 Salir"
    echo ""
}

# Desarrollo local
dev_local() {
    echo "Iniciando desarrollo local..."
    echo ""
    
    # Backend
    echo "📡 Instalando dependencias del backend..."
    cd backend && npm install
    echo "✅ Backend listo"
    echo ""
    
    # Frontend
    echo "🎨 Instalando dependencias del frontend..."
    cd ../frontend && npm install
    echo "✅ Frontend listo"
    echo ""
    
    echo "🚀 Iniciando servicios..."
    echo "Backend: http://localhost:3001"
    echo "Frontend: http://localhost:3000"
    echo ""
    echo "Abre 2 terminales y ejecuta:"
    echo "  Terminal 1: cd backend && npm run dev"
    echo "  Terminal 2: cd frontend && npm run dev"
}

# Docker Compose
docker_dev() {
    echo "🐳 Iniciando con Docker Compose..."
    
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose no está instalado"
        echo "Instálalo desde: https://docs.docker.com/compose/install/"
        return
    fi
    
    docker-compose up --build
}

# Build para producción
build_prod() {
    echo "📦 Building para producción..."
    echo ""
    
    # Backend
    echo "📡 Building backend..."
    cd backend
    npm install
    npm run build
    echo "✅ Backend compilado en backend/dist"
    echo ""
    
    # Frontend
    echo "🎨 Building frontend..."
    cd ../frontend
    npm install
    npm run build
    echo "✅ Frontend compilado en frontend/dist"
    echo ""
    
    echo "🎉 Build completo!"
    echo "Para iniciar en producción:"
    echo "  Backend: cd backend && npm start"
    echo "  Frontend: sirve frontend/dist con nginx o cualquier servidor estático"
}

# Limpiar
clean() {
    echo "🧹 Limpiando archivos..."
    
    echo "Limpiando backend..."
    rm -rf backend/node_modules backend/dist
    
    echo "Limpiando frontend..."
    rm -rf frontend/node_modules frontend/dist frontend/.vite
    
    echo "✅ Limpieza completa"
}

# Verificar salud
health_check() {
    echo "✅ Verificando salud del backend..."
    
    response=$(curl -s http://localhost:3001/api/health 2>/dev/null || echo "error")
    
    if [ "$response" = "error" ]; then
        echo "❌ Backend no está corriendo en http://localhost:3001"
        echo "Inicia el backend primero: cd backend && npm run dev"
    else
        echo "✅ Backend está corriendo correctamente"
        echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
    fi
}

# Loop principal
while true; do
    show_menu
    read -p "Opción: " choice
    echo ""
    
    case $choice in
        1)
            dev_local
            break
            ;;
        2)
            docker_dev
            break
            ;;
        3)
            build_prod
            break
            ;;
        4)
            clean
            ;;
        5)
            health_check
            echo ""
            ;;
        6)
            echo "👋 ¡Hasta luego!"
            exit 0
            ;;
        *)
            echo "❌ Opción inválida"
            echo ""
            ;;
    esac
done
