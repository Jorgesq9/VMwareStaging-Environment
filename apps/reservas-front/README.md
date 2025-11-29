
# Frontend – Booking Management System 🧾📆

Available in: [English](#english-version) | [Español](#versión-en-español)

---

# English Version

This project is the **frontend interface** of the booking management system, designed to facilitate reservation administration through role-based access (Administrator and Worker). It connects to a RESTful API developed in Node.js.

## 🌐 Live Demo

Access the live app:  
👉 https://centralreservas.jorgeesquivafullstack.es/login

To log in as an **admin**:  
- Username: `admin`  
- Password: `admin`  

Or you can create a new user through Swagger:  
👉 https://api.jorgeesquivafullstack.es/api-docs/

## 📦 Backend Repository

🔗 [Central-Reservas-BackEnd (API)](https://github.com/Jorgesq9/Central-Reservas-BackEnd)

## 🛠 Technologies Used

- React  
- Custom CSS  
- Axios for API calls  
- React Router DOM for navigation  
- Cloudflare Tunnel for deployment  

## 🔐 Authentication System

- Login with JWT  
- Role validation: Administrator and Worker  
- Route protection according to permissions  

## ⚙️ Main Features

- Reservation management (CRUD)  
- Advanced filters: status, priority, customer name  
- Statistics dashboard  
- Responsive design for desktop and mobile  

## 📂 Project Structure

```
Central-reservas/
│── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Main views (Login, Dashboard, etc.)
│   ├── services/      # API connection
│   ├── assets/        # Logos and images
│   └── App.jsx        # Root component
│── public/            # Static files
│── package.json       # Dependencies and scripts
│── vite.config.js     # Vite configuration
└── README.md          # This document
```

## 🚀 How to Run Locally

```bash
git clone https://github.com/Jorgesq9/Central-reservas.git
cd Central-reservas
npm install
npm run dev
```

## 🌍 Deployment

The frontend is hosted on a self-managed home server through **Cloudflare Tunnel**, ensuring secure access without needing a public IP or open ports.

## 📜 License

This project is open-source under the MIT License.

## 👤 Author

**Jorge Esquiva** – Full-Stack Developer  
🌐 [jorgeesquivafullstack.es](https://jorgeesquivafullstack.es)  
🐙 [GitHub](https://github.com/Jorgesq9)

---

# Versión en Español

Este proyecto es la **interfaz de usuario** del sistema de gestión de reservas, diseñada para facilitar la administración de reservas a través de roles (Administrador y Trabajador). Se conecta con una API RESTful desarrollada en Node.js.

## 🌐 Demo online

Accede a la app en vivo:  
👉 https://centralreservas.jorgeesquivafullstack.es/login

Para acceder como **administrador**:  
- Usuario: `admin`  
- Contraseña: `admin`  

O puedes crear un nuevo usuario desde Swagger:  
👉 https://api.jorgeesquivafullstack.es/api-docs/

## 📦 Repositorio del backend

🔗 [Central-Reservas-BackEnd (API)](https://github.com/Jorgesq9/Central-Reservas-BackEnd)

## 🛠 Tecnologías utilizadas

- React  
- CSS personalizado  
- Axios para llamadas a la API  
- React Router DOM para navegación  
- Cloudflare Tunnel para despliegue  

## 🔐 Sistema de autenticación

- Inicio de sesión con JWT  
- Validación de roles: administrador y trabajador  
- Protección de rutas según permisos  

## ⚙️ Características principales

- Gestión de reservas (CRUD)  
- Filtros avanzados: estado, prioridad, nombre del cliente  
- Panel de estadísticas  
- Responsive design para escritorio y móvil  

## 📂 Estructura del proyecto

```
Central-reservas/
│── src/
│   ├── components/    # Componentes reutilizables
│   ├── pages/         # Vistas principales (Login, Dashboard, etc.)
│   ├── services/      # Conexión con la API
│   ├── assets/        # Logos e imágenes
│   └── App.jsx        # Componente raíz
│── public/            # Archivos estáticos
│── package.json       # Dependencias y scripts
│── vite.config.js     # Configuración de Vite
└── README.md          # Este documento
```

## 🚀 Cómo levantarlo localmente

```bash
git clone https://github.com/Jorgesq9/Central-reservas.git
cd Central-reservas
npm install
npm run dev
```

## 🌍 Despliegue actual

El frontend está alojado en un servidor casero a través de **Cloudflare Tunnel**, lo que garantiza acceso seguro sin necesidad de IP pública ni puertos abiertos.

## 📜 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

## 👤 Autor

**Jorge Esquiva** – Desarrollador Full-Stack  
🌐 [jorgeesquivafullstack.es](https://jorgeesquivafullstack.es)  
🐙 [GitHub](https://github.com/Jorgesq9)
