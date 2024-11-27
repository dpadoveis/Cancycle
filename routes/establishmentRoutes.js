const express = require('express');
const EstablishmentController = require('../controllers/establishmentController');

const router = express.Router();

router.post('/cadastro', EstablishmentController.register);

module.exports = router;
