# 🚀 Deploy en Render.com

Esta guía te muestra cómo hacer deploy de la aplicación en Render.com usando Docker.

## 📋 Prerrequisitos

- Cuenta en [Render.com](https://render.com)
- Código subido a un repositorio Git (GitHub, GitLab, etc.)

## 🎯 Opción 1: Deploy del Backend (Recomendado para empezar)

### Paso 1: Crear Web Service en Render

1. Ve a tu [Dashboard de Render](https://dashboard.render.com/)
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio Git

### Paso 2: Configurar el Servicio

**Configuración básica:**
- **Name**: `test-app-backend`
- **Region**: Elige la más cercana a tus usuarios
- **Branch**: `main` (o tu rama principal)
- **Root Directory**: `backend`
- **Runtime**: `Docker`
- **Plan**: `Free` (para testing) o `Starter`

**Build & Deploy:**
- **Dockerfile Path**: `backend/Dockerfile` (o `./Dockerfile` si Root Directory es `backend`)

**Variables de entorno:**
```
PORT=3001
NODE_ENV=production
```

### Paso 3: Deploy

1. Click en **"Create Web Service"**
2. Render detectará automáticamente el Dockerfile
3. Iniciará el build y deploy (tarda ~3-5 minutos)
4. Una vez completado, tendrás una URL como: `https://test-app-backend.onrender.com`

### Paso 4: Verificar

Visita: `https://tu-app.onrender.com/api/health`

Deberías ver:
```json
{
  "status": "ok",
  "uptime": 123,
  "timestamp": "2024-..."
}
```

## 🎨 Opción 2: Deploy del Frontend en Render

### Método A: Como Static Site (Más Simple)

1. **New +** → **"Static Site"**
2. Conecta tu repositorio
3. Configuración:
   - **Name**: `test-app-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Variables de entorno**:
   ```
   VITE_API_URL=https://test-app-backend.onrender.com
   ```

### Método B: Como Web Service con Docker

1. **New +** → **"Web Service"**
2. Conecta tu repositorio
3. Configuración:
   - **Name**: `test-app-frontend`
   - **Root Directory**: `frontend`
   - **Runtime**: `Docker`
   - **Dockerfile Path**: `frontend/Dockerfile`

4. Antes de hacer deploy, actualiza `frontend/vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:3001'
    )
  }
})
```

## 🔗 Deploy Completo (Backend + Frontend)

### 1. Deploy Backend primero
Sigue los pasos de "Opción 1" y obtén tu URL del backend.

### 2. Actualizar Frontend
Antes de hacer deploy del frontend, actualiza el archivo `.env` o las variables de entorno en Render:

```env
VITE_API_URL=https://test-app-backend.onrender.com
```

### 3. Deploy Frontend
Usa el método que prefieras (Static Site o Docker).

## ⚙️ Configuración Avanzada

### Healthcheck (Opcional)

Agrega en la configuración de Render:
- **Health Check Path**: `/api/health`

### Auto-Deploy

Render hace auto-deploy cuando hay push a tu rama principal. Para desactivarlo:
1. Ve a tu servicio
2. Settings → Build & Deploy
3. Desactiva "Auto-Deploy"

### Dominios Personalizados

1. Ve a tu servicio en Render
2. Settings → Custom Domains
3. Agrega tu dominio
4. Configura los DNS según las instrucciones

### Logs y Monitoreo

Ver logs en tiempo real:
```bash
# En Render Dashboard
Logs tab → Live logs
```

## 💰 Planes y Costos

### Free Tier
- Backend: Se duerme después de 15 min de inactividad
- 750 horas/mes gratuitas
- Perfecto para testing

### Starter ($7/mes por servicio)
- Siempre activo
- Sin límite de horas
- Mejor rendimiento

## 🐛 Troubleshooting

### Error: "Failed to build"

**Problema**: Falta archivo Dockerfile
**Solución**: Verifica que `backend/Dockerfile` existe

### Error: CORS

**Problema**: Frontend no puede conectar con backend
**Solución**: Actualiza `backend/src/index.ts`:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://test-app-frontend.onrender.com',
    'https://tu-dominio.com'
  ]
}));
```

### Error: Variable de entorno no se lee

**Problema**: `VITE_API_URL` no funciona
**Solución**: Las variables `VITE_*` deben definirse en **build time**, no en runtime.

En Render, ve a:
1. Settings → Environment
2. Agrega `VITE_API_URL`
3. Redeploy el servicio

### Backend se duerme (Free tier)

**Problema**: Primera request es muy lenta
**Soluciones**:
1. Upgrade a plan Starter ($7/mes)
2. Usa un servicio de ping (UptimeRobot)
3. Avisa a los usuarios que puede tardar ~30s en la primera carga

## 📊 Alternativas de Deploy

Si Render no te convence, otras opciones:

**Backend**:
- Railway.app (también con Docker)
- Fly.io
- DigitalOcean App Platform
- Heroku

**Frontend**:
- Vercel (recomendado para React)
- Netlify
- Cloudflare Pages
- GitHub Pages

## ✅ Checklist de Deploy

- [ ] Backend deployado en Render
- [ ] URL del backend funcionando (`/api/health` responde)
- [ ] Variable `VITE_API_URL` configurada con la URL del backend
- [ ] Frontend deployado
- [ ] Frontend se conecta correctamente al backend
- [ ] CORS configurado para permitir requests del frontend
- [ ] Logs verificados (sin errores)

## 📝 Comandos Útiles

```bash
# Test local del Dockerfile del backend
cd backend
docker build -t test-app-backend .
docker run -p 3001:3001 test-app-backend

# Test local del Dockerfile del frontend
cd frontend
docker build -t test-app-frontend .
docker run -p 80:80 test-app-frontend

# Test con docker-compose (ambos servicios)
docker-compose up --build
```

## 🎉 ¡Listo!

Tu aplicación debería estar corriendo en:
- **Backend**: `https://test-app-backend.onrender.com`
- **Frontend**: `https://test-app-frontend.onrender.com`

Para ver tu app funcionando, visita la URL del frontend. 🚀
