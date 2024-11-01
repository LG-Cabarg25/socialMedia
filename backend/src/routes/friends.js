const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends');
const auth = require('../middleware/auth'); // Middleware de autenticación

router.post('/request', auth, friendsController.sendFriendRequest);      // Enviar solicitud de amistad
router.put('/accept/:friendId', auth, friendsController.acceptFriendRequest); // Aceptar solicitud de amistad
router.get('/', auth, friendsController.getFriends);                     // Obtener lista de amigos

module.exports = router;
