# Fase 1: build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos los manifests
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Build de producción
RUN npm run build

# Fase 2: runtime
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copiamos solo lo necesario
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Copiamos node_modules ya resueltas del builder
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]

