# Usamos una imagen ligera de Node
FROM node:18-alpine

# Carpeta de trabajo
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto que usa tu API
EXPOSE 4000

# Comando para arrancar el servidor
CMD ["npm", "start"]