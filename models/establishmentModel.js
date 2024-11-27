const db = require('./db');

const EstablishmentModel = {
    createEstablishment: (data, callback) => {
        const sql = `INSERT INTO estabelecimentos (cnpj, nome, email, senha) VALUES (?, ?, ?, ?)`;
        db.query(sql, [data.cnpj, data.nome, data.email, data.senha], callback);
    },
    findEstablishmentByCnpj: (cnpj, callback) => {
        const sql = `SELECT * FROM estabelecimentos WHERE cnpj = ?`;
        db.query(sql, [cnpj], callback);
    }
};

module.exports = EstablishmentModel;
