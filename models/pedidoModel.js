const db = require("./db");

const PedidoModel = {
    // Buscar todos os pedidos
    getAllPedidos: (callback) => {
        const sql = "SELECT * FROM pedidos";
        db.query(sql, callback);
    },

    // Buscar pontos do pedido pelo ID
    getPontosDoPedido: (id, callback) => {
        const sql = "SELECT pontos FROM pedidos WHERE id = ?";
        db.query(sql, [id], callback);
    },

    // Atualizar pontos do usuário
    adicionarPontosUsuario: (cpf_cnpj, pontos, callback) => {
        const sql = "UPDATE usuarios SET pontos = pontos + ? WHERE cpf_cnpj = ?";
        db.query(sql, [pontos, cpf_cnpj], callback);
    },

    // Remover pedido pelo ID
    removePedidoById: (id, callback) => {
        const sql = "DELETE FROM pedidos WHERE id = ?";
        db.query(sql, [id], callback);
    },
};

module.exports = PedidoModel; // Exportar todas as funções
