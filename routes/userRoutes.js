const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/cadastro', UserController.register);
router.post('/login', UserController.login);
router.get('/usuarioAtual', UserController.getCurrentUser);
router.get('/pedidos', UserController.getPedidos);


module.exports = router;
