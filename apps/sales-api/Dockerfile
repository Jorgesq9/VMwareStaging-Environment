FROM node:18-alpine

WORKDIR /app

# 1. Instalar dependencias
COPY package*.json ./
RUN npm ci

# 2. Copiar schema de Prisma y generar el cliente
COPY prisma ./prisma
RUN npx prisma generate

# 3. Copiar el resto del código (incluye dev.db si está commiteado)
COPY . .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]

