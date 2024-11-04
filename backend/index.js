const express = require('express');
const cors = require('cors');
const knex = require('./src/models/db');
const usersRoutes = require('./src/routes/users');
const postsRoutes = require('./src/routes/posts');
const friendsRoutes = require('./src/routes/friends');
const messagesRoutes = require('./src/routes/messages');
const userPhotosRoutes = require('./src/routes/userPhotos');
const commentsRoutes = require('./src/routes/comments');
const path = require('path');
require('dotenv').config();

const app = express();
const http = require('http'); // Requerimos 'http' para combinar con Socket.IO
const { Server } = require('socket.io'); // Requerimos el servidor de Socket.IO
const PORT = 3000;

// Configuración de CORS
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Configuración de archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de WebSocket
const server = http.createServer(app); // Crear servidor HTTP usando Express
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // El frontend
    methods: ['GET', 'POST'], // Métodos permitidos
  },
});

app.set('socketio', io); // Guardar la instancia de Socket.IO para usarla en los controladores

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);

  // Evento de desconexión
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/user-photos', userPhotosRoutes);
app.use('/api/comments', commentsRoutes);

// Iniciar el servidor en el puerto especificado
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Prueba de conexión a la base de datos
knex.raw('SELECT 1')
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Failed to connect to PostgreSQL:', err));
