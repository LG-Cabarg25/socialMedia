const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const upload = require('../middleware/multer'); // Middleware de Multer
const auth = require('../middleware/auth'); // Middleware de autenticación

// Rutas de autenticación
router.post('/register', usersController.register);
router.post('/login', usersController.login);

// Ruta protegida de prueba
router.get('/profile', auth, (req, res) => {
  res.json({ message: `Welcome, user with ID: ${req.user.userId}` });
});

module.exports = router;
