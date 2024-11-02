// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const auth = require('../middleware/auth'); // Middleware de autenticación

// Rutas de autenticación
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Ruta protegida de perfil del usuario completo
router.get('/profile', auth, usersController.getUserProfile);

module.exports = router;
