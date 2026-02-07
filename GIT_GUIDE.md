# 📦 Qué Subir al Repositorio Git

## ✅ Archivos que DEBES subir

Sube **toda la carpeta `test-app/`** con esta estructura:

```
test-app/
├── .gitignore                    ← Importante: ignora node_modules
├── README.md                     ← Documentación principal
├── DEPLOY.md                     ← Guía de deploy tradicional
├── RENDER_DEPLOY.md              ← Guía de deploy en Render
├── docker-compose.yml            ← Para desarrollo local con Docker
├── render.yaml                   ← Blueprint de Render (deploy automático)
├── start.sh                      ← Script de inicio rápido
│
├── backend/
│   ├── .dockerignore            ← Importante para builds Docker
│   ├── .env.example             ← Ejemplo de variables de entorno
│   ├── .gitignore               ← Ignora node_modules y dist
│   ├── Dockerfile               ← CRÍTICO para Render
│   ├── package.json             ← Dependencias del backend
│   ├── tsconfig.json            ← Configuración TypeScript
│   └── src/
│       └── index.ts             ← Código del servidor
│
└── frontend/
    ├── .dockerignore            ← Importante para builds Docker
    ├── .env.example             ← Ejemplo de variables de entorno
    ├── .gitignore               ← Ignora node_modules y dist
    ├── Dockerfile               ← CRÍTICO para Render
    ├── nginx.conf               ← Configuración Nginx (para Docker)
    ├── package.json             ← Dependencias del frontend
    ├── tsconfig.json            ← Configuración TypeScript
    ├── tsconfig.node.json       ← Configuración para Vite
    ├── vite.config.ts           ← Configuración Vite
    ├── index.html               ← HTML principal
    └── src/
        ├── main.tsx             ← Punto de entrada React
        ├── App.tsx              ← Componente principal
        ├── App.css              ← Estilos del componente
        └── index.css            ← Estilos globales
```

## ❌ Archivos que NO debes subir

Estos archivos están en `.gitignore` y Git los ignorará automáticamente:

```
node_modules/          ← Dependencias (se instalan con npm install)
dist/                  ← Build compilado (se genera automáticamente)
.env                   ← Variables de entorno locales (secretos)
*.log                  ← Archivos de log
.DS_Store              ← Archivos del sistema Mac
.vite/                 ← Cache de Vite
```

## 🚀 Comandos para Subir al Repositorio

### Primera vez (nuevo repositorio):

```bash
# 1. Extraer el archivo
tar -xzf test-app.tar.gz
cd test-app

# 2. Inicializar Git
git init

# 3. Agregar todos los archivos
git add .

# 4. Verificar qué se va a subir (no debería haber node_modules)
git status

# 5. Hacer commit
git commit -m "Initial commit: Test App con TypeScript, Node.js, React y Docker"

# 6. Conectar con tu repositorio remoto (GitHub/GitLab)
git remote add origin https://github.com/tu-usuario/test-app.git

# 7. Subir al repositorio
git push -u origin main
```

### Si ya tienes un repositorio:

```bash
cd test-app

# Agregar cambios
git add .

# Commit
git commit -m "Add Docker support for Render deployment"

# Push
git push
```

## 🔍 Verificar antes de subir

```bash
# Ver qué archivos se van a subir
git status

# Ver contenido del .gitignore
cat .gitignore
cat backend/.gitignore
cat frontend/.gitignore

# Asegúrate que NO aparezcan:
# - node_modules/
# - dist/
# - .env (solo .env.example está bien)
```

## 📋 Checklist

Antes de hacer push, verifica:

- [ ] El archivo `.gitignore` existe en la raíz
- [ ] Hay `.gitignore` en `/backend` y `/frontend`
- [ ] Los `Dockerfile` están en `/backend` y `/frontend`
- [ ] El archivo `render.yaml` está en la raíz
- [ ] NO hay carpetas `node_modules/` en ningún lado
- [ ] NO hay carpetas `dist/` en ningún lado
- [ ] Solo existe `.env.example` (NO `.env`)

## 💡 Importante para Render

Para que Render funcione correctamente, DEBES tener:

1. **Backend**: `backend/Dockerfile`
2. **Frontend**: `frontend/Dockerfile`
3. **Opcional**: `render.yaml` (para deploy automático de ambos servicios)

Sin estos archivos, Render no sabrá cómo hacer el build de tu aplicación.

## 🎯 Resumen

**Sube TODO excepto:**
- `node_modules/`
- `dist/`
- `.env`
- Archivos de log

**El archivo comprimido `test-app.tar.gz` NO se sube** - solo es para que descargues el proyecto. Después de extraerlo, subes el contenido de la carpeta `test-app/`.
