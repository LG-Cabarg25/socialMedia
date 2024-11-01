// src/routes/comments.js
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');
const auth = require('../middleware/auth');

// Crear un comentario en un post específico
router.post('/:postId/comments', auth, commentsController.createComment);

// Obtener todos los comentarios de un post específico
router.get('/:postId/comments', auth, commentsController.getComments);

// Eliminar un comentario específico
router.delete('/comments/:commentId', auth, commentsController.deleteComment);

module.exports = router;
