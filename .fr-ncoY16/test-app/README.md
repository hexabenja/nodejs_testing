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

### Opción 1: Deploy con PM2 (Recomendado)

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

### Opción 2: Deploy con Docker

**Dockerfile Backend:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

**Dockerfile Frontend:**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

### Opción 3: Deploy en servicios cloud

**Vercel (Frontend):**
```bash
cd frontend
npm install -g vercel
vercel
```

**Railway/Render (Backend):**
- Conecta tu repositorio
- Configura build command: `npm run build`
- Configura start command: `npm start`

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

## 🛠️ Tecnologías

- **Backend**: Express, TypeScript, CORS
- **Frontend**: React, TypeScript, Vite
- **Build**: TSC, Vite

## 📝 Notas

- El backend corre en el puerto 3001
- El frontend en desarrollo corre en el puerto 3000
- Los datos se almacenan en memoria (para testing)
- Para producción, considera agregar una base de datos real

## 🤝 Contribuir

Esta es una app de testing básica. Siéntete libre de extenderla según tus necesidades.

## 📄 Licencia

MIT
