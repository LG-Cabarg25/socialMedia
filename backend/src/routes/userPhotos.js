// routes/userPhotos.js
const express = require('express');
const router = express.Router();
const userPhotosController = require('../controllers/userPhotos');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

// Ruta para subir foto de perfil
router.post('/upload', auth, upload.single('photo'), userPhotosController.uploadPhoto);

module.exports = router;
