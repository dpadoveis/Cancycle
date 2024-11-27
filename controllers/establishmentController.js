const bcrypt = require('bcrypt');
const EstablishmentModel = require('../models/establishmentModel');

const EstablishmentController = {
    register: async (req, res) => {
        const { cnpj, nome, email, senha } = req.body;
        const senhaHash = await bcrypt.hash(senha, 10);

        EstablishmentModel.createEstablishment({ cnpj, nome, email, senha: senhaHash }, (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar estabelecimento:', err);
                return res.status(400).send(`Erro ao cadastrar estabelecimento: ${err.sqlMessage}`);
            }
            res.send('Estabelecimento cadastrado com sucesso!');
        });
    }
};

module.exports = EstablishmentController;
