const PedidoModel = require("../models/pedidoModel");

const PedidoController = {
    // Buscar todos os pedidos
    getPedidos: (req, res) => {
        PedidoModel.getAllPedidos((err, results) => {
            if (err) return res.status(500).json({ message: "Erro ao buscar pedidos" });
            res.json(results);
        });
    },

    // Deletar pedido e adicionar pontos ao usuário
    deletePedido: (req, res) => {
        const { id } = req.params;
        const { cpf_cnpj } = req.body;

        PedidoModel.getPontosDoPedido(id, (err, results) => {
            if (err) return res.status(500).json({ message: "Erro ao buscar pontos do pedido" });
            if (results.length === 0) return res.status(404).json({ message: "Pedido não encontrado" });

            const pontos = results[0].pontos;

            PedidoModel.adicionarPontosUsuario(cpf_cnpj, pontos, (err) => {
                if (err) return res.status(500).json({ message: "Erro ao adicionar pontos ao usuário" });

                PedidoModel.removePedidoById(id, (err) => {
                    if (err) return res.status(500).json({ message: "Erro ao deletar pedido" });
                    res.json({ message: "Pedido removido e pontos adicionados com sucesso!" });
                });
            });
        });
    },
};

module.exports = PedidoController;
