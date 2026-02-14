FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Importante: --host 0.0.0.0 permite que Windows vea el contenedor
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]