const mongoose = require('mongoose')
const Counter = require('./contador')

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

// Middleware "pre-save" para gerar o ID sequencial
usuarioSchema.pre('save', async function(next) {
  // Verificando se o usuário já tem um _id
  if (!this._id) {
    try {
      // Pegando o contador de usuários
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'usuarioId' }, // Usando 'usuarioId' para identificar o contador
        { $inc: { seq: 1 } },  // Incrementando o contador
        { new: true, upsert: true } // Cria o contador se não existir
      );

      // Atribuindo o novo ID ao usuário
      this._id = counter.seq;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Criando modelo apartir do esquema 
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario