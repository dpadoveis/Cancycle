const bcrypt = require('bcrypt');
const EstablishmentModel = require('../models/establishmentModel');

const EstablishmentController = {
    // Registro de estabelecimento
    register: async (req, res) => {
        try {
            const { cpf_cnpj, nome, email, senha } = req.body;

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
        const sql = 'SELECT cpf_cnpj, nome, email FROM estabelecimentos ORDER BY id DESC LIMIT 1';
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
    },

    // Método para adicionar um pedido
    addPedido: (req, res) => {
        console.log("addPedido foi chamada.");
        console.log("Corpo da requisição:", req.body);

        const { descricao, pontos } = req.body;

        if (!descricao || !pontos) {
            console.log("Erro: Campos obrigatórios ausentes.");
            return res.status(400).json({ message: 'Descrição e pontos são obrigatórios.' });
        }


        const estabelecimentoCpfCnpj = req.user?.cpf_cnpj || '24126180000110'; 

        EstablishmentModel.findEstablishmentByCpfCnpj(estabelecimentoCpfCnpj, (err, results) => {
            if (err) {
                console.error("Erro ao buscar dados do estabelecimento:", err);
                return res.status(500).json({ message: 'Erro ao buscar os dados do estabelecimento.' });
            }

            if (results.length === 0) {
                console.log("Estabelecimento não encontrado:", estabelecimentoCpfCnpj);
                return res.status(404).json({ message: 'Estabelecimento não encontrado.' });
            }

            const { nome, cpf_cnpj } = results[0];

            const novoPedido = {
                nome_empresa: nome,
                descricao,
                cnpj: cpf_cnpj,
                cpf: null, // Sempre nulo
                pontos,
            };

            // Adicionar o pedido no banco
            EstablishmentModel.addPedido(novoPedido, (err, result) => {
                if (err) {
                    console.error("Erro ao adicionar pedido:", err);
                    return res.status(500).json({ message: 'Erro ao adicionar o pedido.' });
                }

                console.log("Pedido adicionado com sucesso:", novoPedido);
                return res.status(201).json({
                    message: 'Pedido adicionado com sucesso!',
                    pedidoId: result.insertId,
                    pedido: novoPedido,
                });
            });
        });
    },





    // Buscar pedidos
    getPedidos: (req, res) => {
        const sql = `
            SELECT 
                p.id,
                p.nome_empresa AS nome_empresa, 
                p.descricao, 
                p.pontos 
            FROM pedidos p
            ORDER BY p.id DESC
        `;

        EstablishmentModel.executeQuery(sql, (err, results) => {
            if (err) {
                console.error('Erro ao buscar pedidos:', err);
                return res.status(500).json({ message: 'Erro ao buscar os pedidos.' });
            }
            res.json(results);
        });
    },
};

module.exports = EstablishmentController;
