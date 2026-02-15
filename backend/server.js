// Importando as bibliotecas necessárias
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const credenciais = require('./credenciais.json');
const usuarioRoutes = require('./routers/usuarioRoutes');


// Inicializando o servidor e pegando a porta do ambiente de desenvolvimento
const app = express();
const PORT = process.env.PORT || 3000;

// Início da conexão com o banco de dados
const conection = mongoose.connect(`mongodb://${credenciais.MONGO_USER}:${credenciais.MONGO_PASSWORD}@${credenciais.MONGO_HOST}:${credenciais.MONGO_PORT}/${credenciais.MONGO_DB}`, {
    useNewUrlParser: true,
})
//promisse para caso a conexão funcione
.then(() => {
    console.log("Conectado com sucesso ao MongoDB");
})
// para caso de errado
.catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err);
});
// inicio do código par o servidor

// Middleware para ler o corpo da requisição em JSON
app.use(express.json());
app.use('/api', usuarioRoutes);
/*
// Servindo arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));
*/
// Rota simples
app.get('/api', (req, res) => {
  res.json({ message: "Olá do backend!" });
});

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
