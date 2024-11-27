require('dotenv').config();
const mysql = require('mysql');

// Configurando a conexão com o banco de dados usando variáveis de ambiente
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Conectando ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        throw err;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = db;
