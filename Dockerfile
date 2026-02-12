# ============================================
# Dockerfile único para Backend + Frontend
# ============================================

# Etapa 1: Build del Frontend
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend

# Copiar package files del frontend
COPY frontend/package*.json ./

# Instalar dependencias del frontend
RUN npm install

# Copiar código fuente del frontend
COPY frontend/ ./

# Argumentos de build para variables de entorno de Vite
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Build del frontend
RUN npm run build

# Etapa 2: Build del Backend
FROM node:18-alpine AS backend-build

WORKDIR /app/backend

# Copiar package files del backend
COPY backend/package*.json ./

# Instalar dependencias del backend
RUN npm install

# Copiar código fuente del backend
COPY backend/ ./

# Compilar TypeScript del backend
RUN npm run build

# Etapa 3: Producción - Backend + Frontend juntos
FROM node:18-alpine

WORKDIR /app

# Instalar dependencias de producción del backend
COPY backend/package*.json ./
RUN npm install --omit=dev

# Copiar backend compilado
COPY --from=backend-build /app/backend/dist ./dist

# Copiar frontend compilado
COPY --from=frontend-build /app/frontend/dist ./public

# Exponer puerto
EXPOSE 3001

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3001

# Comando de inicio
CMD ["node", "dist/index.js"]
