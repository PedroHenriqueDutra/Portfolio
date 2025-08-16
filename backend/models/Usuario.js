const mongoose = require('mongoose')

//definindo o esquema do usuario

const usuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},// required signifia obrigatorio
    idade: {type: Number, required: true},
    email: {typr: String},
    endereco: {
        rua: String, 
        cidade: String ,
        estado: String
    },
    acompanhado: {type: Boolean, required: true},
    ultimoBeneficio: {type: Number, required: true}
});

// Criando modelo apartir do esquema 
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario