const db = require('./db');

const UserModel = {
    createUser: (data, callback) => {
        const sql = `INSERT INTO usuarios (cpf_cnpj, nome, email, senha) VALUES (?, ?, ?, ?)`;
        db.query(sql, [data.cpf_cnpj, data.nome, data.email, data.senha], callback);
    },

    findUserByCpfCnpj: (cpf_cnpj, callback) => {
        const sql = `SELECT * FROM usuarios WHERE cpf_cnpj = ?`;
        db.query(sql, [cpf_cnpj], callback);
    },

    executeQuery: (sql, callback) => {
        db.query(sql, callback);
    }
};

module.exports = UserModel;
