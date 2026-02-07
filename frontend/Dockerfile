FROM node:18-alpine AS build

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --omit=dev

# Copiar código compilado desde la etapa de build
COPY --from=build /app/dist ./dist

# Exponer puerto
EXPOSE 3001

# Variables de entorno por defecto
ENV NODE_ENV=production
ENV PORT=3001

# Comando para iniciar la aplicación
CMD ["node", "dist/index.js"]
