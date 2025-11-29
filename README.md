# 📦 Entorno de Trabajo DevOps en VMware  
## (README.md – Español & English)

---

# 🇪🇸 **Preparación del Entorno de Trabajo en VMware – DevOps Home Lab**

Este documento describe la creación de un entorno de trabajo profesional en **Ubuntu Server 24.04** ejecutado dentro de **VMware Workstation**, diseñado como laboratorio DevOps para desplegar servicios, practicar automatización y simular una infraestructura real.

---

## 🧱 **Tecnologías instaladas**
El entorno incluye:

- **Ubuntu Server 24.04 (LTS)**
- **Docker + Docker Compose**
- **Portainer CE** (gestión visual de contenedores)
- **Nginx Reverse Proxy**
- **Uptime Kuma** (monitorización en tiempo real)
- **Dominios internos vía /etc/hosts**

Este entorno actúa como tu *staging environment*, donde montas una infraestructura limpia antes de migrarla a un servidor físico o cloud.

---

# 🚀 **Pasos realizados**

## 1. **Instalación de Ubuntu Server en VMware**
- Se creó una VM con:
  - 2 CPU
  - 4 GB RAM
  - 30 GB disco dinámico
  - Adaptador de red NAT
- Se instaló Ubuntu Server 24.04 con SSH habilitado.

---

## 2. **Configuración de red**
- Se utilizó NAT para permitir acceso a internet sin exponer la VM.
- Se verificó la IP interna con:
  ```
  ip a
  ```
- Se añadió un dominio local personalizado desde Windows:
  ```
  C:\Windows\System32\drivers\etc\hosts
  192.168.xx.xx   uptime.local
  ```

---

## 3. **Instalación de Docker + Compose**
Se instaló Docker siguiendo el repositorio oficial:

```bash
sudo apt update
sudo apt install ca-certificates curl gnupg -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg]   https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
```

---

## 4. **Instalación de Portainer**
```bash
docker volume create portainer_data
docker run -d   -p 9000:9000 -p 9443:9443   --name portainer   --restart=always   -v /var/run/docker.sock:/var/run/docker.sock   -v portainer_data:/data   portainer/portainer-ce:latest
```

Acceso:
```
http://IP_DE_LA_VM:9000
```

---

## 5. **Instalación de Uptime Kuma**
Estructura:
```
/infra/monitoring/uptime-kuma/
```

Compose:
```yaml
services:
  uptime-kuma:
    image: louislam/uptime-kuma:1
    container_name: uptime-kuma
    restart: always
    ports:
      - "3001:3001"
    volumes:
      - ./data:/app/data
```

---

## 6. **Instalación del Reverse Proxy Nginx**
Estructura:
```
/infra/nginx/
├── conf.d/
├── docker-compose.yml
```

Compose:
```yaml
services:
  nginx:
    image: nginx
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./conf.d:/etc/nginx/conf.d
```

Ejemplo de dominio interno:

```
server {
    listen 80;
    server_name uptime.local;

    location / {
        proxy_pass http://IP_DE_LA_VM:3001;
    }
}
```

---

# 🧪 **Infraestructura final en VMware**
El entorno resultante incluye:

| Servicio | Puerto | Función |
|---------|--------|---------|
| Portainer | 9000 | Gestión de contenedores |
| Nginx Proxy | 80 | Reverse Proxy |
| Uptime Kuma | 3001 | Monitorización |
| Dominios internos | N/A | Acceso limpio usando `.local` |

---

# EN **DevOps Working Environment in VMware – README**

(This is the full English translation of the Spanish version.)

---

# 📦 VMware DevOps Work Environment (Ubuntu Server 24.04)

This document describes the creation of a clean, professional DevOps environment inside **VMware Workstation**, used as a *staging environment* for deployments, monitoring, and infrastructure simulation.

---

## 🧱 Installed Technologies
- Ubuntu Server 24.04  
- Docker + Docker Compose  
- Portainer CE  
- Nginx Reverse Proxy  
- Uptime Kuma  
- Local domain routing via hosts file  

---

## 🚀 Steps Performed
### 1. Ubuntu Server installation in VMware
VM specs:
- 2 CPU  
- 4 GB RAM  
- 30 GB disk  
- NAT networking  
- SSH enabled  

---

### 2. Networking
- NAT connection  
- Internal IP checked with:
  ```
  ip a
  ```
- Local domain added in Windows:
  ```
  192.168.xx.xx   uptime.local
  ```

---

### 3. Docker installation
Docker was installed using the official Docker repository to guarantee the latest stable version:

```bash
sudo apt update
sudo apt install ca-certificates curl gnupg -y
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg]   https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y
```

Docker service was verified and enabled to start automatically.

---

### 4. Portainer installation
Portainer provides a graphical interface for Docker container management:

```bash
docker volume create portainer_data
docker run -d   -p 9000:9000 -p 9443:9443   --name portainer   --restart=always   -v /var/run/docker.sock:/var/run/docker.sock   -v portainer_data:/data   portainer/portainer-ce:latest
```

Access:
```
http://IP_DE_LA_VM:9000
```

---

### 5. Uptime Kuma installation
Folder structure:

```
/infra/nginx/
├── conf.d/
├── docker-compose.yml
```

Compose:
```yaml
services:
  nginx:
    image: nginx
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./conf.d:/etc/nginx/conf.d
```

This provides clean service status dashboards and alerts



---

### 6. Nginx Reverse Proxy setup
Folder structure:

```
/infra/nginx/
├── conf.d/
├── docker-compose.yml
```

Compose:
```yaml
services:
  nginx:
    image: nginx
    restart: always
    ports:
      - "80:80"
    volumes:
      - ./conf.d:/etc/nginx/conf.d
```
 Example reverse proxy for Uptime Kuma:   

 ```
server {
    listen 80;
    server_name uptime.local;

    location / {
        proxy_pass http://IP_DE_LA_VM:3001;
    }
}
```
---

# 🎯 Final VMware Setup Overview
VMware Home Lab now includes:

| Service | Port | Description |
|---------|--------|---------|
| Portainer | 9000 | Container Management |
| Nginx Proxy | 80 | Reverse Proxy |
| Uptime Kuma | 3001 | Monitoring |
| Dominios internos | N/A | Clear access `.local` |

The environment is clean, stable, and ready to deploy APIs, apps, or entire infrastructures — and later migrate everything.

---

# 📄 Autor / Author
Infraestructura montada por: **Jorge Esquiva**  
Propósito: Home Lab profesional para DevOps / Cloud Engineer.
