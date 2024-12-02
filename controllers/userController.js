const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');

const UserController = {
    // Registro de usuário
    register: async (req, res) => {
        try {
            const { cpf_cnpj, nome, email, senha } = req.body;

            // Validações básicas
            if (!cpf_cnpj || !nome || !email || !senha) {
                return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
            }

            // Criptografa a senha
            const senhaHash = await bcrypt.hash(senha, 10);

            // Cria o usuário no banco de dados
            UserModel.createUser({ cpf_cnpj, nome, email, senha: senhaHash }, (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar usuário:', err);
                    return res.status(400).json({ message: `Erro ao cadastrar usuário: ${err.sqlMessage}` });
                }
                res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
            });
        } catch (error) {
            console.error('Erro interno no registro:', error);
            res.status(500).json({ message: 'Erro interno no servidor.' });
        }
    },

    // Login de usuário
    login: (req, res) => {
        const { cpf_cnpj, senha } = req.body;

        // Validações básicas
        if (!cpf_cnpj || !senha) {
            return res.status(400).json({ message: 'CPF/CNPJ e senha são obrigatórios.' });
        }

        UserModel.findUserByCpfCnpj(cpf_cnpj, async (err, results) => {
            if (err) {
                console.error('Erro no servidor:', err);
                return res.status(500).json({ message: 'Erro no servidor.' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado.' });
            }

            const user = results[0];

            // Valida a senha
            const senhaValida = await bcrypt.compare(senha, user.senha);
            if (senhaValida) {
                res.json({ success: true, message: 'Login realizado com sucesso!', user: { nome: user.nome, email: user.email } });
            } else {
                res.status(401).json({ success: false, message: 'Senha incorreta.' });
            }
        });
    },

    // Busca o usuário atual
    getCurrentUser: (req, res) => {
        const sql = `SELECT cpf_cnpj,nome,email,pontos FROM usuarios ORDER BY id DESC LIMIT 1`;
        UserModel.executeQuery(sql, (err, results) => {
            if (err) {
                console.error('Erro ao buscar dados do usuário:', err);
                return res.status(500).json({ message: 'Erro ao buscar os dados do usuário.' });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Nenhum usuário encontrado.' });
            }
            res.json(results[0]);
        });
    }
};

module.exports = UserController;
