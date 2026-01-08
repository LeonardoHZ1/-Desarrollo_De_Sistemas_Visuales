# MERN Stack Project

Este es un proyecto mínimo basado en el stack MERN (MongoDB, Express.js, React, Node.js) utilizando contenedores Docker.

## Estructura

- `backend/`: API de Express.js
- `frontend/`: Aplicación de React con Vite
- `docker-compose.yml`: Configuración de Docker Compose

## Cómo ejecutar

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Ejecuta `docker-compose up --build` en la raíz del proyecto.
3. Accede a:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - MongoDB: localhost:27017

## Servicios

- **MongoDB**: Base de datos NoSQL.
- **Backend**: API REST con Express.
- **Frontend**: Interfaz de usuario con React.