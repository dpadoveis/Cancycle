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

    // Execução de consulta SQL genérica
    executeQuery: (sql, callback) => {
        db.query(sql, callback);
    }
};

module.exports = EstablishmentModel;
