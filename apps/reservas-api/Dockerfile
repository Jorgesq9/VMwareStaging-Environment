FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Dependencias (prod)
RUN npm install --omit=dev

COPY . .

# Ajusta el puerto al que use tu API.
# Si tu API escucha en otro puerto, CAMBIA esto y el EXPOSE.
ENV PORT=4000
EXPOSE 4000

# Debe existir un script "start" en package.json.
# Si no existe, lo creas tú (por ejemplo "node index.js" o "node app.js").
CMD ["npm", "start"]
