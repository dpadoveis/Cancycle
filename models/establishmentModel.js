const db = require('./db');

const EstablishmentModel = {
    // Criação de estabelecimento
    createEstablishment: (data, callback) => {
        const sql = `INSERT INTO estabelecimentos (cpf_cnpj, nome, email, senha) VALUES (?, ?, ?, ?)`;
        db.query(sql, [data.cpf_cnpj, data.nome, data.email, data.senha], callback);
    },

    // Busca estabelecimento pelo CNPJ/CPF
    findEstablishmentByCpfCnpj: (cpf_cnpj, callback) => {
        const sql = `SELECT * FROM estabelecimentos WHERE cpf_cnpj = ?`;
        db.query(sql, [cpf_cnpj], callback);
    },
     // Adicionar um pedido
     addPedido: (pedido, callback) => {
        const sql = `INSERT INTO pedidos (nome_empresa, descricao, cnpj, cpf, pontos) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [pedido.nome_empresa, pedido.descricao, pedido.cnpj, null, pedido.pontos], callback);
    },
    
    
    

    // Buscar pedidos de um estabelecimento
    getPedidosByEstablishment: (estabelecimento_id, callback) => {
        const sql = `SELECT * FROM pedidos WHERE estabelecimento_id = ?`;
        db.query(sql, [estabelecimento_id], callback);
    },
    findEstablishmentByName: (nome, callback) => {
        const sql = `SELECT nome, cpf_cnpj FROM estabelecimentos WHERE nome = ?`;
        db.query(sql, [nome], callback);
    },
    
    

    // Execução de consulta SQL genérica
    executeQuery: (sql, callback) => {
        db.query(sql, callback);
    }
};

module.exports = EstablishmentModel;
