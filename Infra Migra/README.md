# 🇪🇸 Migración de entorno DevOps: VMware Staging → Mini PC en Producción

Este documento describe cómo he migrado mi **entorno DevOps profesional en VMware** a un **servidor físico (mini PC)** accesible desde Internet mediante **Cloudflare Tunnel**, desplegado con **Docker + Nginx reverse proxy** y automatizado con **GitHub Actions CI/CD**.

El objetivo es construir una infraestructura **realista**, totalmente autoalojada, mantenible y replicable para entrevistas, portfolio y proyectos reales.

---

## 🏗 1. Arquitectura General

### **Antes: Staging en VMware**
- Ubuntu Server 24.04 dentro de VMware Workstation.
- Infraestructura ordenada profesionalmente en `/srv`:
  - `apps/` – aplicaciones (Portfolio, Reservas API, Sales API, Front Reservas)
  - `nginx/` – reverse proxy global
  - `docker-compose.yml` maestro
  - `monitoring/` – Uptime Kuma
  - `portainer/` – administración visual de contenedores
- Dominios internos:
  - `portfolio.local`
  - `reservas.local`
  - `sales.local`
  - `uptime.local`
- Entorno pensado únicamente como **preproducción**.

### **Después: Producción en Mini PC**
- Mini PC con Ubuntu Server 24.04.
- Misma estructura `/srv`, clonada 1:1 desde GitHub.
- Servicios Docker en producción:
  - Portfolio (Next.js)
  - Reservas Front (React/Vite)
  - Reservas API (Node + MongoDB + Swagger)
  - Sales API (Node + Prisma + Swagger)
  - Nginx reverse proxy
  - Portainer
  - Uptime Kuma
- Publicación mediante **Cloudflare Tunnel**:
  - `jorgeesquivafullstack.es` – Portfolio  
  - `api-reservas.jorgeesquivafullstack.es` – API Reservas + Swagger  
  - `api-sales.jorgeesquivafullstack.es` – API Sales + Swagger  
  - `reservas.jorgeesquivafullstack.es` – Front de reservas  

---

## 🌐 2. Migración de VMware a Mini PC

### **2.1 Configuración inicial del Mini PC**
IP estática configurada con Netplan.

### **2.2 Clonar la infraestructura**
```bash
cd /srv
git clone https://github.com/Jorgesq9/VMware-Staging-Environment .
```

### **2.3 Instalar Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker jorge
```

### **2.4 Levantar servicios**
```bash
cd /srv
docker compose up -d --build
docker ps
```

---

## 🔁 3. Nginx Reverse Proxy + Dominios

Ejemplo – Portfolio:
```nginx
server {
    listen 80;
    server_name jorgeesquivafullstack.es;

    location / {
        proxy_pass http://portfolio:3000;
        include /etc/nginx/proxy_params;
    }
}
```

Ejemplo – Reservas API:
```nginx
server {
    listen 80;
    server_name api-reservas.jorgeesquivafullstack.es;

    location = / {
        return 302 /api-docs;
    }

    location / {
        proxy_pass http://reservas-api:5000;
        include /etc/nginx/proxy_params;
    }
}
```

---

## ☁️ 4. Cloudflare Tunnel

### Crear túnel
```bash
cloudflared tunnel create main-tunnel
```

### Configuración
`/etc/cloudflared/config.yml` apunta a los dominios del sistema.

### DNS
```bash
cloudflared tunnel route dns main-tunnel jorgeesquivafullstack.es
cloudflared tunnel route dns main-tunnel api-reservas.jorgeesquivafullstack.es
cloudflared tunnel route dns main-tunnel api-sales.jorgeesquivafullstack.es
cloudflared tunnel route dns main-tunnel reservas.jorgeesquivafullstack.es
```

---

## 📊 5. Monitorización con Uptime Kuma
Accesible localmente en:
```
http://192.168.1.150:3001
```

---

## ⚙️ 6. CI/CD con GitHub Actions (Self-Hosted Runner)

### Runner instalado en el mini PC
```bash
cd ~/actions-runner-portfolio
./config.sh --url https://github.com/Jorgesq9/PortfolioFullStack --token XXXX
sudo ./svc.sh install
sudo ./svc.sh start
```

### Workflow
```yaml
name: Deploy portfolio to mini PC

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: self-hosted

    steps:
      - name: Update portfolio code
        run: |
          cd /srv/apps/portfolio
          git fetch origin
          git reset --hard origin/main

      - name: Rebuild portfolio service
        run: |
          cd /srv
          docker compose up -d --build portfolio
```

---

# 🇬🇧 English Version — DevOps Migration: VMware Staging → Mini PC Production

This document explains how I migrated my **professional DevOps staging environment** from VMware Workstation to a **self-hosted physical server (Mini PC)** using **Cloudflare Tunnel**, **Docker**, **Nginx reverse proxy**, and **GitHub Actions CI/CD**.

The goal was to create a **fully production-ready home lab**, replicable for professional work.

---

## 🏗 1. General Architecture

### **Before: Staging on VMware**
- Ubuntu Server 24.04 running inside VMware Workstation.
- Professionally organized infrastructure under `/srv`:
  - `apps/` – applications (Portfolio, Reservations API, Sales API, Reservations Front)
  - `nginx/` – global reverse proxy
  - `docker-compose.yml` – master compose file
  - `monitoring/` – Uptime Kuma
  - `portainer/` – visual container management
- Internal domains:
  - `portfolio.local`
  - `reservas.local`
  - `sales.local`
  - `uptime.local`
- Environment designed **exclusively for pre-production**.

### **After: Production on Mini PC**
- Mini PC running Ubuntu Server 24.04.
- Same `/srv` structure cloned **1:1** from GitHub.
- Docker services in production:
  - Portfolio (Next.js)
  - Reservations Frontend (React/Vite)
  - Reservations API (Node + MongoDB + Swagger)
  - Sales API (Node + Prisma + Swagger)
  - Nginx reverse proxy
  - Portainer
  - Uptime Kuma
- Public access via **Cloudflare Tunnel**:
  - `jorgeesquivafullstack.es` – Portfolio  
  - `api-reservas.jorgeesquivafullstack.es` – Reservations API + Swagger  
  - `api-sales.jorgeesquivafullstack.es` – Sales API + Swagger  
  - `reservas.jorgeesquivafullstack.es` – Reservations frontend  

---

## 🌐 2. Migration from VMware to Mini PC

### **2.1 Initial Mini PC Configuration**
Static IP configured via Netplan.

### **2.2 Clone the Infrastructure**
```bash
cd /srv
git clone https://github.com/Jorgesq9/VMware-Staging-Environment .
```

### **2.3 Install Docker**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker jorge
```

### **2.4 Start all services**
```bash
cd /srv
docker compose up -d --build
docker ps
```

---

## 🔁 3. Nginx Reverse Proxy + Domains

Example – Portfolio:
```nginx
server {
    listen 80;
    server_name jorgeesquivafullstack.es;

    location / {
        proxy_pass http://portfolio:3000;
        include /etc/nginx/proxy_params;
    }
}
```

Example – Reservations API:
```nginx
server {
    listen 80;
    server_name api-reservas.jorgeesquivafullstack.es;

    location = / {
        return 302 /api-docs;
    }

    location / {
        proxy_pass http://reservas-api:5000;
        include /etc/nginx/proxy_params;
    }
}
```

---

## ☁️ 4. Cloudflare Tunnel

### Create tunnel
```bash
cloudflared tunnel create main-tunnel
```

### Configuration
`/etc/cloudflared/config.yml` defines all system routes and services.

### DNS routes
```bash
cloudflared tunnel route dns main-tunnel jorgeesquivafullstack.es
cloudflared tunnel route dns main-tunnel api-reservas.jorgeesquivafullstack.es
cloudflared tunnel route dns main-tunnel api-sales.jorgeesquivafullstack.es
cloudflared tunnel route dns main-tunnel reservas.jorgeesquivafullstack.es
```

---

## 📊 5. Monitoring with Uptime Kuma
Local dashboard available at:
```
http://192.168.1.150:3001
```

---

## ⚙️ 6. CI/CD with GitHub Actions (Self-Hosted Runner)

### Runner installed on the mini PC
```bash
cd ~/actions-runner-portfolio
./config.sh --url https://github.com/Jorgesq9/PortfolioFullStack --token XXXX
sudo ./svc.sh install
sudo ./svc.sh start
```

### Workflow
```yaml
name: Deploy portfolio to mini PC

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: self-hosted

    steps:
      - name: Update portfolio code
        run: |
          cd /srv/apps/portfolio
          git fetch origin
          git reset --hard origin/main

      - name: Rebuild portfolio service
        run: |
          cd /srv
          docker compose up -d --build portfolio
```

