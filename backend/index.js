const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const knex = require('./src/models/db'); // Conexión a la BD
const usersRoutes = require('./src/routes/users');
const postsRoutes = require('./src/routes/posts');
const friendsRoutes = require('./src/routes/friends');
const messagesRoutes = require('./src/routes/messages');
const userPhotosRoutes = require('./src/routes/userPhotos');
const commentsRoutes = require('./src/routes/comments');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' })); // Habilita CORS para el frontend
app.use(express.json());

// Rutas
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/user-photos', userPhotosRoutes);
app.use('/api/comments', commentsRoutes); // Cambiar aquí a `/api/comments`

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Prueba de conexión a la base de datos
knex.raw('SELECT 1')
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Failed to connect to PostgreSQL:', err));
