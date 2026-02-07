# 🧪 Test App - TypeScript + Node.js + React

Aplicación full-stack de testeo construida con:
- **Backend**: Node.js + Express + TypeScript
- **Frontend**: React + TypeScript + Vite
- **Listo para deploy** en producción

## 📁 Estructura del Proyecto

```
test-app/
├── backend/          # API REST con Express
│   ├── src/
│   │   └── index.ts  # Servidor principal
│   ├── package.json
│   └── tsconfig.json
├── frontend/         # Aplicación React
│   ├── src/
│   │   ├── App.tsx   # Componente principal
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Inicio Rápido

### Desarrollo Local

**1. Backend:**
```bash
cd backend
npm install
npm run dev
# Servidor corriendo en http://localhost:3001
```

**2. Frontend:**
```bash
cd frontend
npm install
npm run dev
# App corriendo en http://localhost:3000
```

## 📦 Build para Producción

### Backend
```bash
cd backend
npm install
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run build
# Los archivos estarán en /frontend/dist
```

## 🌐 Deploy en Servidor

### Opción 1: Deploy en Render.com (Recomendado - Con Docker) 🐳

**La forma más fácil de hacer deploy en producción:**

1. Sube tu código a GitHub/GitLab
2. Ve a [Render.com](https://render.com) y crea una cuenta
3. Sigue la guía completa en **[RENDER_DEPLOY.md](./RENDER_DEPLOY.md)**

**TL;DR:**
- **Backend**: New Web Service → Runtime: Docker → Deploy
- **Frontend**: New Static Site o Web Service con Docker
- **Costo**: Gratis para testing (con limitaciones) o $7/mes por servicio

### Opción 2: Deploy con Docker (Local o VPS)

**Deploy con docker-compose (Más fácil):**
```bash
# Clonar o subir el proyecto
git clone tu-repo.git
cd test-app

# Iniciar ambos servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

**Deploy manual con Docker:**

Backend:
```bash
cd backend
docker build -t test-app-backend .
docker run -d -p 3001:3001 --name backend test-app-backend
```

Frontend:
```bash
cd frontend
docker build -t test-app-frontend .
docker run -d -p 80:80 --name frontend test-app-frontend
```

### Opción 3: Deploy con PM2 (VPS tradicional)

**1. Instalar PM2:**
```bash
npm install -g pm2
```

**2. Backend:**
```bash
cd backend
npm install --production
npm run build
pm2 start dist/index.js --name "test-app-backend"
```

**3. Frontend:**
Sirve los archivos estáticos con nginx o un servidor web:
```bash
cd frontend
npm run build
# Copia el contenido de /dist a tu servidor web
```

Ver guía completa en **[DEPLOY.md](./DEPLOY.md)**

### Opción 4: Deploy en otros servicios cloud

**Vercel (Frontend):**
```bash
cd frontend
npm install -g vercel
vercel
```

**Railway/Fly.io (Backend con Docker):**
- Conecta tu repositorio
- Detecta automáticamente el Dockerfile
- Deploy con un click

## 🔧 Variables de Entorno

**Backend (.env):**
```env
PORT=3001
NODE_ENV=production
```

**Frontend (.env):**
```env
VITE_API_URL=https://tu-backend-url.com
```

## 📡 API Endpoints

- `GET /` - Información de la API
- `GET /api/health` - Estado del servidor
- `GET /api/tests` - Obtener todos los tests
- `POST /api/tests` - Crear nuevo test

## ✨ Características

- ✅ TypeScript en frontend y backend
- ✅ API REST funcional
- ✅ Interfaz moderna y responsiva
- ✅ Listo para producción
- ✅ CORS configurado
- ✅ Manejo de errores
- ✅ Hot reload en desarrollo
- ✅ Dockerfiles optimizados multi-stage
- ✅ Docker Compose para desarrollo local
- ✅ Configuración Nginx incluida
- ✅ Listo para Render.com
- ✅ Guías de deploy completas

## 🛠️ Tecnologías

- **Backend**: Express, TypeScript, CORS
- **Frontend**: React, TypeScript, Vite
- **Build**: TSC, Vite
- **Deploy**: Docker, Docker Compose, PM2, Nginx

## 🐳 Archivos Docker Incluidos

- `backend/Dockerfile` - Imagen optimizada del backend
- `frontend/Dockerfile` - Imagen del frontend con Nginx
- `docker-compose.yml` - Orquestación de ambos servicios
- `.dockerignore` - Optimización de builds

## 📝 Notas

- El backend corre en el puerto 3001
- El frontend en desarrollo corre en el puerto 3000
- Los datos se almacenan en memoria (para testing)
- Para producción, considera agregar una base de datos real

## 🤝 Contribuir

Esta es una app de testing básica. Siéntete libre de extenderla según tus necesidades.

## 📄 Licencia

MIT
