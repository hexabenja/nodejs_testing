# 🔧 Fix: Error de TypeScript con import.meta.env

## ✅ Problema Resuelto

Se agregó el archivo `src/vite-env.d.ts` que define los tipos de TypeScript para las variables de entorno de Vite.

## 📝 Archivos Actualizados

- ✅ `frontend/src/vite-env.d.ts` - Tipos de TypeScript para Vite
- ✅ `frontend/Dockerfile` - Soporte para build args (variables en tiempo de build)

## 🚀 Configuración en Render.com

### Para el Frontend

**IMPORTANTE**: En Render, debes configurar la variable de entorno como **Build Arg** (no como Environment Variable normal).

#### Opción 1: Usando la URL del Backend de Render

1. **Primero despliega el Backend** y obtén su URL (ejemplo: `https://test-app-backend.onrender.com`)

2. En el servicio del Frontend, ve a **Environment** y agrega:
   - Click en **"Add Environment Variable"**
   - **Key**: `VITE_API_URL`
   - **Value**: `https://test-app-backend.onrender.com` (tu URL del backend)

3. Las variables `VITE_*` son usadas en **build time**, así que asegúrate de hacer un **Manual Deploy** después de agregarlas.

#### Opción 2: Usando render.yaml (Automático)

Si usas el archivo `render.yaml`, ya está configurado para que el frontend obtenga automáticamente la URL del backend:

```yaml
services:
  - type: web
    name: test-app-frontend
    runtime: docker
    dockerfilePath: ./frontend/Dockerfile
    dockerContext: ./frontend
    envVars:
      - key: VITE_API_URL
        fromService:
          type: web
          name: test-app-backend
          envVarKey: RENDER_EXTERNAL_URL
```

### Para el Backend

No necesita configuración especial, solo asegúrate de que CORS permita la URL del frontend:

```typescript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://test-app-frontend.onrender.com',
    'https://tu-dominio-custom.com'
  ]
}));
```

## 🧪 Testing Local

Para probar localmente con Docker:

```bash
cd frontend

# Build con variable de entorno
docker build --build-arg VITE_API_URL=http://localhost:3001 -t test-app-frontend .

# Run
docker run -p 80:80 test-app-frontend
```

## 💡 Importante sobre Variables VITE_*

Las variables que empiezan con `VITE_` son especiales:
- ✅ Se leen en **build time** (cuando se compila el código)
- ✅ Se incluyen en el bundle final
- ❌ NO se pueden cambiar después del build

Por eso, si cambias `VITE_API_URL` en Render, debes hacer un **nuevo deploy** para que tome efecto.

## 🎯 Checklist de Deploy

- [ ] Backend desplegado y funcionando
- [ ] Obtener URL del backend (ej: `https://test-app-backend.onrender.com`)
- [ ] En frontend, agregar variable `VITE_API_URL` con la URL del backend
- [ ] Deploy del frontend (las variables se aplicarán en el build)
- [ ] Verificar en los logs del frontend que el build se completa sin errores de TypeScript
- [ ] Probar que el frontend se conecta correctamente al backend

## 🐛 Troubleshooting

### "Property 'env' does not exist on type 'ImportMeta'"
✅ **Resuelto**: Se agregó `vite-env.d.ts` con los tipos correctos

### Frontend no se conecta al backend
- Verifica que `VITE_API_URL` esté configurada correctamente
- Verifica CORS en el backend
- Revisa los logs del navegador (F12 → Console)

### Variable no se aplica después de cambiarla
- Recuerda hacer un **nuevo deploy** del frontend
- Las variables `VITE_*` se aplican en build time, no en runtime
