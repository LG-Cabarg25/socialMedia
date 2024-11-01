const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const auth = require('../middleware/auth');
const upload = require('../middleware/multer');

// Crear un post de solo texto
router.post('/text', auth, postsController.createTextPost);

// Crear un post con imagen
router.post('/image', auth, upload.single('image'), postsController.createImagePost);

// Obtener todas las publicaciones
router.get('/', auth, postsController.getPosts);

// Obtener una publicación específica
router.get('/:postId', auth, postsController.getPost);

// Dar "me gusta" a una publicación
router.post('/:id/like', auth, postsController.likePost);

// Eliminar una publicación
router.delete('/:postId', auth, postsController.deletePost);

module.exports = router;
