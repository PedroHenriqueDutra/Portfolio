const mongoose = require('mongoose');

//gerando o esquema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

//criando um objeto do tipo do esquema
const Counter = mongoose.model('Counter', counterSchema);

// exporta o objeto
module.exports = Counter;