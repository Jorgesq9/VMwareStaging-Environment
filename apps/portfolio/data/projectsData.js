export const projectsData = [
  {
    id: "mendix-issue-tracker",
    category: "mendix",
    title_es: "Issue Tracker (Mendix)",
    title_en: "Issue Tracker (Mendix)",
    description_es:
      "Aplicación de gestión de incidencias multi-rol con dashboards y chat interno, desarrollada con Mendix.",
    description_en:
      "Multi-role issue tracking app with dashboards and internal chat, built with Mendix.",
    features_es: [
      "Acceso por roles: Employee, Supervisor, Technician",
      "Dashboard visual de incidencias por estado",
      "Chat interno por incidencia",
      "Gestión de cuentas de usuario (alta, edición, borrado)",
      "UI responsive y demo online",
    ],
    features_en: [
      "Role-based access: Employee, Supervisor, Technician",
      "Visual dashboard by status",
      "Internal chat per incident",
      "User account management (create, edit, delete)",
      "Responsive UI and online demo",
    ],
    tech: [
      "Mendix",
      "Low-code",
      "Security",
      "Cloud deployment",
      "CSS",
      "JS",
      "GitHub",
    ],
    links: {
      demo: "https://trackerissue-sandbox.mxapps.io/index.html?profile=Responsive",
      documentation: "https://github.com/Jorgesq9/IssueTracker-Mendix-",
    },
    credentials_es: [
      "Supervisor: supervisor / 1234",
      "Technician: technician / 1234",
      "Employee: employee / 1234",
    ],
    credentials_en: [
      "Supervisor: supervisor / 1234",
      "Technician: technician / 1234",
      "Employee: employee / 1234",
    ],
  },
  {
    id: 1,
    category: "backend",
    title_es: "API de Reservas (AWS & Servidor propio)",
    title_en: "Booking API (AWS & Self-hosted)",
    description_es:
      "API REST para la gestión de reservas con control de roles y despliegue en AWS y servidor propio",
    description_en:
      "REST API for booking management with role-based access control, deployed on AWS and self-hosted server",
    tech: [
      "JWT Auth",
      "AtlasDB",
      "Swagger",
      "Docker",
      "Nginx",
      "AWS EC2",
      "Cloudflare",
    ],
    features_es: [
      "CRUD de reservas y usuarios",
      "Autenticación JWT y control de roles (Admin/Worker)",
      "Base de datos MongoDB con índices optimizados",
      "Documentación interactiva con Swagger",
      "Despliegue en servidor propio con Docker + Cloudflare + systemd",
      "Despliegue en AWS EC2 con Nginx, Certbot SSL, UFW y Security Groups",
    ],
    features_en: [
      "CRUD for bookings and users",
      "JWT authentication and role-based access (Admin/Worker)",
      "MongoDB database with optimized indexes",
      "Interactive Swagger API documentation",
      "Deployment on self-hosted server using Docker + Cloudflare + systemd",
      "Deployment on AWS EC2 with Nginx, Certbot SSL, UFW and Security Groups",
    ],
    links: {
      live_aws: "https://apiaws.jorgeesquivafullstack.es",
      live_self: "https://api.jorgeesquivafullstack.es/",
      docs: "https://apiaws.jorgeesquivafullstack.es/api-docs/",
      code_api: "https://github.com/Jorgesq9/Reservas-Back",
    },
  },
  {
    id: 2,
    category: "backend",
    title_en: "Booking Management System",
    title_es: "Sistema de Gestión de Reservas",
    description_en:
      "Full-stack reservation system with role-based access control",
    description_es:
      "Sistema de reservas full-stack con control de acceso por roles",
    tech: [
      "Node.js",
      "Express",
      "MongoDB",
      "JWT Auth",
      "Swagger",
      "React",
      "CSS",
    ],
    features_en: [
      "Admin/Worker roles system",
      "CRUD operations for bookings",
      "Advanced search filters (status, priority, client name)",
      "Booking statistics dashboard",
      "Indexed search optimization",
    ],
    features_es: [
      "Sistema de roles Admin/Trabajador",
      "Operaciones CRUD para reservas",
      "Filtros avanzados (estado, prioridad, nombre cliente)",
      "Panel de estadísticas de reservas",
      "Búsqueda indexada optimizada",
    ],
    images: ["/Front-End.png"],
    links: {
      demo: "http://centralreservas.jorgeesquivafullstack.es/login",
      code_api: "https://github.com/Jorgesq9/Reservas-Back",
      code_frontend: "https://github.com/Jorgesq9/Reservas-Front",
      docs: "https://api.jorgeesquivafullstack.es/api-docs/", // Swagger docs link
    },
  },

  {
    id: 5,
    category: "backend",
    title_es: "API de Ventas y Reservas",
    title_en: "Sales & Reservations API",
    description_es: "API para gestión de ventas y reservas",
    description_en: " API for sales and bookings management",
    tech: [
      "Node.js",
      "Express",
      "JS",
      "Prisma ORM",
      "PostgreSQL",
      "Swagger",
      "Docker",
    ],
    features_es: [
      "Endpoints REST para ventas y reservas",
      "Generación automática de la base de datos con Prisma",
      "Migraciones y schema gestionados con Prisma Migrate",
      "Documentación interactiva con Swagger",
      "Despliegue en servidor autogestionado con túneles Cloudflare",
    ],
    features_en: [
      "REST endpoints for sales and booking management",
      "Database schema generation with Prisma",
      "Migrations handled via Prisma Migrate",
      "Interactive Swagger API documentation",
      "Deployment on self-hosted server with Cloudflare tunnels",
    ],
    links: {
      docs: "https://apinode.jorgeesquivafullstack.es/docs",
      code_api: "https://github.com/Jorgesq9/sales-reservations-api-node", // ajusta si tu repo se llama distinto
    },
  },

  {
    id: 6,
    category: "devops",
    title_es: "Entorno de Staging en VMware (Ubuntu + Docker)",
    title_en: "VMware Staging Environment (Ubuntu + Docker)",
    description_es:
      "Home Lab profesional en Ubuntu Server 24.04 con arquitectura /srv, Docker Compose maestro, Nginx reverse proxy, Uptime Kuma, Portainer, logrotate y backups automatizados.",
    description_en:
      "Professional Home Lab on Ubuntu Server 24.04 with /srv architecture, master Docker Compose, Nginx reverse proxy, Uptime Kuma, Portainer, logrotate and automated backups.",
    features_es: [
      "Arquitectura unificada en /srv para servicios e infra",
      "Nginx reverse proxy sirviendo servicios internos por dominio .local",
      "Monitorización con Uptime Kuma y gestión de contenedores con Portainer",
      "Rotación de logs profesional con logrotate",
      "Script de backups automáticos con cron",
    ],
    features_en: [
      "/srv unified architecture for services and infrastructure",
      "Nginx reverse proxy exposing internal services via .local domains",
      "Monitoring with Uptime Kuma and container management with Portainer",
      "Production-style log rotation using logrotate",
      "Automated backup script scheduled with cron",
    ],
    tech: [
      "VMware",
      "Docker",
      "Nginx",
      "Uptime Kuma",
      "Portainer",
      "Logrotate",
      "Cron",
    ],
    links: {
      documentation: "https://github.com/Jorgesq9/VMware-Staging-Environment",
    },
  },
];
