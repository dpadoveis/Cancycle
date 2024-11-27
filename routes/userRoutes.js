const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/cadastro', UserController.register);
router.post('/login', UserController.login);
router.get('/usuarioAtual', UserController.getCurrentUser);

module.exports = router;
