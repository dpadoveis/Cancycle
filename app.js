const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models/db');
const cors = require('cors');
require('dotenv').config();




// Importando rotas
const userRoutes = require('./routes/userRoutes');
const establishmentRoutes = require('./routes/establishmentRoutes');
const pedidoRoutes = require("./routes/pedidoRoutes");
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Servir arquivos estáticos da pasta views
app.use('/css', express.static(__dirname + '/views/css'));
app.use('/js', express.static(__dirname + '/views/js'));
app.use('/html', express.static(__dirname + '/views/html'));

// Conectar rotas
app.use('/usuarios', userRoutes);
app.use('/estabelecimentos', establishmentRoutes);

app.use('/pedidos', pedidoRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});