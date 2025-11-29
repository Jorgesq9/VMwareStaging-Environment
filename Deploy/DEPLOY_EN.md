# 🚀 Deployment Guide  
## VMware Staging Environment (Ubuntu 24.04 + Docker)

This document provides a complete step-by-step guide to deploy the professional staging environment used in this VMware-based lab.  
Everything is structured according to DevOps best practices and is fully replicable on a physical server or cloud VM.

---

# 📦 1. Requirements

### Software needed
- VMware Workstation / Player
- Ubuntu Server 24.04 LTS
- Docker
- Docker Compose plugin
- Git
- Web browser (Chrome/Edge — ⚠ Brave may block Swagger UI)

---

# 🗂 2. Professional structure inside `/srv`

All application and infrastructure files are organized inside `/srv`, exactly like in a real production system:


```bash
/srv
├── apps/
│ ├── portfolio/
│ ├── reservas-api/
│ ├── reservas-front/
│ ├── sales-api/
├── nginx/
│ ├── conf.d/
│ ├── logs/
├── backups/
└── docker-compose.yml

```


---

# 🐳 3. Install Docker + Docker Compose

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo usermod -aG docker $USER
newgrp docker
```

---

# 🌐 4. Reverse Proxy with Nginx

Reverse proxy config files live in:

/srv/nginx/conf.d/

Example (reservas.conf):

```
server {
    listen 80;
    server_name reservas.local;

    location / {
        proxy_pass http://reservas-api:4000;
    }
}
```

Each app has its own file:

- portfolio.conf  
- reservas.conf  
- reservas-front.conf  
- sales.conf  
- uptime-kuma.conf  

---

# 🐋 5. Unified Docker Compose

Main file:

/srv/docker-compose.yml

Includes all containers:

- Nginx reverse proxy  
- Portainer  
- Uptime Kuma  
- Portfolio (Next.js static)  
- Reservas Front (Nginx static)  
- Reservas API + MongoDB  
- Sales API (with Prisma SQLite)  

Start all containers:

```
cd /srv
docker compose up -d
```

Check proxy logs:

```
docker logs nginx_reverse_proxy
```

---

# 🌍 6. Local domain names (.local) — Windows

Edit:

`C:\Windows\System32\drivers\etc\hosts`

Add:

192.168.229.133 portfolio.local  
192.168.229.133 reservas.local  
192.168.229.133 reservas-front.local  
192.168.229.133 sales.local  
192.168.229.133 uptime.local  

---

# 🔗 7. Accessing the services

Service | URL
--------|-----
Portfolio | http://portfolio.local
Reservas Front | http://reservas-front.local
Reservas API Swagger | http://reservas.local/api-docs
Sales API Swagger | http://sales.local/docs
Uptime Kuma | http://uptime.local
Portainer | http://YOUR-IP:9000

---

# 📊 8. Logrotate

Example file:

`/etc/logrotate.d/nginx_home_lab`

Configured for daily rotation with compression.

---

# 💾 9. Automated Backups

Backup script:

`/srv/backups/backup.sh`

Daily cron job (3 AM):

`0 3 * * * root /srv/backups/backup.sh`

---

# 🎯 10. Final Result

By the end of this deployment we have a full professional staging environment:

✔ Nginx reverse proxy  
✔ Portfolio deployed  
✔ Reservas API + Front working  
✔ Sales API working  
✔ Swagger running on both APIs  
✔ MongoDB running in Docker  
✔ Portainer for visual management  
✔ Uptime Kuma monitoring all services  
✔ Log rotation and automated backups  
✔ Unified Docker Compose in /srv  
