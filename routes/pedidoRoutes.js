const express = require("express");
const router = express.Router();
const PedidoController = require("../controllers/pedidoController");

// Rota para buscar todos os pedidos
router.get("/", PedidoController.getPedidos);

// Rota para deletar um pedido pelo ID e adicionar pontos ao usuário
router.delete("/:id", PedidoController.deletePedido);

module.exports = router;
