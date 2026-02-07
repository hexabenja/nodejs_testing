# 🚀 Guía Rápida de Deploy

## Deploy en VPS/Servidor Linux

### 1. Preparar el Servidor

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (v18 o superior)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar instalación
node --version
npm --version

# Instalar PM2 (opcional pero recomendado)
sudo npm install -g pm2
```

### 2. Subir el Código

```bash
# Opción A: Git
git clone tu-repositorio.git
cd test-app

# Opción B: SCP
scp -r test-app usuario@servidor:/ruta/destino/
```

### 3. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
echo "PORT=3001" > .env
echo "NODE_ENV=production" >> .env

# Compilar TypeScript
npm run build

# Iniciar con PM2
pm2 start dist/index.js --name test-app-backend

# O iniciar directamente
npm start
```

### 4. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variable de entorno
echo "VITE_API_URL=http://tu-dominio.com:3001" > .env

# Build para producción
npm run build
```

### 5. Servir Frontend con Nginx

```bash
# Instalar Nginx
sudo apt install nginx -y

# Copiar archivos build
sudo cp -r dist/* /var/www/html/

# Configurar Nginx
sudo nano /etc/nginx/sites-available/default
```

Configuración Nginx:
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Reiniciar Nginx
sudo systemctl restart nginx

# Habilitar Nginx al inicio
sudo systemctl enable nginx
```

### 6. Configurar Firewall

```bash
# Permitir HTTP/HTTPS
sudo ufw allow 'Nginx Full'
sudo ufw allow 3001/tcp
sudo ufw enable
```

### 7. SSL con Let's Encrypt (Opcional)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d tu-dominio.com
```

### 8. Mantener PM2 corriendo

```bash
# Guardar configuración PM2
pm2 save

# Iniciar PM2 al arranque del sistema
pm2 startup

# Ver logs
pm2 logs test-app-backend

# Reiniciar app
pm2 restart test-app-backend

# Ver estado
pm2 status
```

## Deploy Rápido (Sin Nginx)

Si solo quieres probar rápido:

```bash
# Backend
cd backend
npm install
npm run build
PORT=80 npm start &

# Frontend (sirve archivos estáticos)
cd frontend
npm install
npm run build
npx serve -s dist -l 3000
```

## Troubleshooting

### Error: Puerto en uso
```bash
sudo lsof -i :3001
sudo kill -9 PID
```

### Ver logs del backend
```bash
pm2 logs test-app-backend
```

### Reiniciar todo
```bash
pm2 restart all
sudo systemctl restart nginx
```

### Verificar que el backend está corriendo
```bash
curl http://localhost:3001/api/health
```

## Checklist de Deploy ✅

- [ ] Node.js instalado (v18+)
- [ ] Código subido al servidor
- [ ] Backend compilado y corriendo
- [ ] Frontend compilado
- [ ] Nginx configurado
- [ ] Firewall configurado
- [ ] SSL configurado (opcional)
- [ ] PM2 configurado para arranque automático
- [ ] Variables de entorno configuradas

¡Listo! Tu aplicación debería estar funcionando en producción. 🎉
