const express = require('express');
const EstablishmentController = require('../controllers/establishmentController');

const router = express.Router();

// Rota de cadastro de estabelecimento
router.post('/cadastro', EstablishmentController.register);

// Rota de login de estabelecimento
router.post('/login', EstablishmentController.login);

// Rota para obter dados do estabelecimento atual
router.get('/estabelecimentoAtual', EstablishmentController.getCurrentEstablishment);

// Rota para add pedido 
router.post('/addPedido', (req, res) => {
    console.log("Rota /addPedido foi chamada!");
    EstablishmentController.addPedido(req, res);
});


router.get('/pedidos', EstablishmentController.getPedidos);


module.exports = router;
