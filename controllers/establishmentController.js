const bcrypt = require('bcrypt');
const EstablishmentModel = require('../models/establishmentModel');

const EstablishmentController = {
    // Registro de estabelecimento
    register: async (req, res) => {
        try {
            const { cpf_cnpj, nome, email, senha } = req.body;

            // Validações básicas
            if (!cpf_cnpj || !nome || !email || !senha) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Criptografa a senha
            const senhaHash = await bcrypt.hash(senha, 10);

            // Cria o estabelecimento no banco de dados
            EstablishmentModel.createEstablishment({ cpf_cnpj, nome, email, senha: senhaHash }, (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar estabelecimento:', err);
                    return res.status(400).json({ message: `Erro ao cadastrar estabelecimento: ${err.sqlMessage}` });
                }
                res.status(201).json({ message: 'Estabelecimento cadastrado com sucesso!' });
            });
        } catch (error) {
            console.error('Erro interno no registro:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    },

    // Login de estabelecimento
    login: (req, res) => {
        const { cpf_cnpj, senha } = req.body;

        // Validações básicas
        if (!cpf_cnpj || !senha) {
            return res.status(400).json({ message: 'CPF/CNPJ e senha são obrigatórios.' });
        }

        EstablishmentModel.findEstablishmentByCpfCnpj(cpf_cnpj, async (err, results) => {
            if (err) {
                console.error('Erro no servidor:', err);
                return res.status(500).json({ message: 'Erro no servidor.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
            }

            const estabelecimento = results[0];

            // Valida a senha
            const senhaValida = await bcrypt.compare(senha, estabelecimento.senha);
            if (senhaValida) {
                res.json({ success: true, message: 'Login realizado com sucesso!', estabelecimento: { nome: estabelecimento.nome, email: estabelecimento.email } });
            } else {
                res.status(401).json({ success: false, message: 'Senha incorreta.' });
            }
        });
    },

    // Busca o estabelecimento atual
    getCurrentEstablishment: (req, res) => {
        const sql = `SELECT cpf_cnpj, nome, email FROM estabelecimentos ORDER BY id DESC LIMIT 1`;
        EstablishmentModel.executeQuery(sql, (err, results) => {
            if (err) {
                console.error('Erro ao buscar dados do estabelecimento:', err);
                return res.status(500).json({ message: 'Erro ao buscar os dados do estabelecimento.' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Nenhum estabelecimento encontrado.' });
            }
            res.json(results[0]);
        });
    }
};

module.exports = EstablishmentController;
