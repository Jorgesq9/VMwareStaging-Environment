# Fase 1: build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Fase 2: servir estáticos con Nginx
FROM nginx:alpine AS runner

# Sobrescribimos el vhost por defecto con el nuestro
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el build al directorio público
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

