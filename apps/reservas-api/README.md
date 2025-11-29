# Booking Management API

Available in: [English](#english-version) | [Español](#versión-en-español)

---

# English Version

This API is designed to manage reservations, providing user authentication, reservation creation and modification, status history tracking, and statistics queries. It also includes interactive documentation via Swagger.

## Table of Contents

- [Features](#features)  
- [Requirements](#requirements)  
- [Installation](#installation)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Main Endpoints](#main-endpoints)  
- [Documentation](#documentation)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  

## Features

- **JWT Authentication**: User registration, login, and route protection.  
- **Reservation Management**: Create, update, delete, and list reservations.  
- **Status History**: Track all status changes for each reservation.  
- **Statistics**: Retrieve reservation statistics and metrics.  
- **Swagger Documentation**: Interactive API documentation for testing endpoints.  

## Requirements

- **Node.js** v14 or higher  
- **MongoDB** v4.4 or higher  
- Dependencies listed in `package.json`  

## Installation

1. Clone this repository:  
   ```bash
   git clone <REPOSITORY_URL>
   cd <REPOSITORY_NAME>
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Configure environment variables (see [Configuration](#configuration)).  
4. Start the server:  
   ```bash
   npm start
   ```

## Configuration

Create a `.env` file at the root of the project with the following variables:  

```env
MONGO_URI=mongodb://localhost:27017/myDatabase
JWT_SECRET=my_secret_key
PORT=5000
```

## Usage

The API runs at `http://localhost:5000` by default.  

### Main Endpoints

- **Authentication**:  
  - `POST /api/auth/register`: Register a new user  
  - `POST /api/auth/login`: Log in and obtain a JWT token  

- **Reservations**:  
  - `GET /api/reservations`: Retrieve a list of reservations (with optional filters)  
  - `POST /api/reservations`: Create a new reservation  
  - `PATCH /api/reservations/:id`: Update an existing reservation  
  - `DELETE /api/reservations/:id`: Delete a reservation  
  - `GET /api/reservations/:reservationId/history`: Retrieve the history of changes for a reservation  
  - `GET /api/reservations/statistics`: Get reservation statistics  

## Documentation

Interactive API documentation is available via Swagger at:  

```
https://api.jorgeesquivafullstack.es/api-docs/
```

## 🌍 Deployment

The API has been deployed in two different environments to demonstrate flexibility and real-world production skills:

- **AWS EC2** → Deployed with **Nginx**, **Certbot SSL**, **UFW** and **Security Groups** for secure cloud hosting.
- **Self-managed Home Server** → Deployed using **Docker** and **Cloudflare Tunnel (cloudflared)**, allowing secure public exposure without opening ports or relying on a public IP.

This dual setup showcases experience in both **cloud infrastructure (AWS)** and **on-premises hosting**, using production-ready tools and security best practices.

## Contributing

1. Fork the repository  
2. Create a new branch for your feature (`git checkout -b feature/new-feature`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push the branch (`git push origin feature/new-feature`)  
5. Open a Pull Request  

## License

This project is licensed under the MIT License.  

---

# Versión en Español

Esta API está diseñada para gestionar reservas, permitiendo autenticación de usuarios, creación y modificación de reservas, historial de estados y consulta de estadísticas. Además, se proporciona documentación interactiva mediante Swagger.

## Tabla de Contenidos

- [Características](#características)  
- [Requisitos](#requisitos)  
- [Instalación](#instalación)  
- [Configuración](#configuración)  
- [Uso](#uso)  
- [Endpoints Principales](#endpoints-principales)  
- [Documentación](#documentación)  
- [Despliegue](#despliegue)  
- [Contribución](#contribución)  
- [Licencia](#licencia)  

## Características

- **Autenticación con JWT**: Registro e inicio de sesión de usuarios, protección de rutas.  
- **Gestión de Reservas**: Crear, actualizar, eliminar y listar reservas.  
- **Historial de Estados**: Registro de cambios en el estado de las reservas.  
- **Estadísticas**: Consulta de estadísticas de las reservas.  
- **Documentación Swagger**: Documentación interactiva para probar los endpoints.  

## Requisitos

- **Node.js** v14 o superior  
- **MongoDB** v4.4 o superior  
- Dependencias listadas en `package.json`  

## Instalación

1. Clona este repositorio:  
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_REPOSITORIO>
   ```
2. Instala las dependencias:  
   ```bash
   npm install
   ```
3. Configura las variables de entorno (ver [Configuración](#configuración)).  
4. Inicia el servidor:  
   ```bash
   npm start
   ```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:  

```env
MONGO_URI=mongodb://localhost:27017/miBaseDeDatos
JWT_SECRET=mi_clave_secreta
PORT=5000
```

## Uso

La API se ejecuta en `http://localhost:5000` por defecto.  

### Endpoints Principales

- **Autenticación**:  
  - `POST /api/auth/register`: Registrar un nuevo usuario  
  - `POST /api/auth/login`: Iniciar sesión y obtener un token JWT  

- **Reservas**:  
  - `GET /api/reservations`: Obtener una lista de reservas (con filtros opcionales)  
  - `POST /api/reservations`: Crear una nueva reserva  
  - `PATCH /api/reservations/:id`: Actualizar una reserva existente  
  - `DELETE /api/reservations/:id`: Eliminar una reserva  
  - `GET /api/reservations/:reservationId/history`: Obtener el historial de cambios de una reserva  
  - `GET /api/reservations/statistics`: Obtener estadísticas de las reservas  

## Documentación

La documentación interactiva de la API está disponible mediante Swagger en:  

```
https://api.jorgeesquivafullstack.es/api-docs/
```

## 🌍 Despliegue

Está alojado en un servidor casero utilizando **cloudflared (Cloudflare Tunnel)**, lo que permite exponerlo al público sin abrir puertos ni usar una IP pública.  

## Contribución

1. Haz un fork del proyecto  
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)  
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)  
4. Haz push de la rama (`git push origin feature/nueva-funcionalidad`)  
5. Abre un Pull Request  

## Licencia

Este proyecto está bajo la licencia MIT.  
