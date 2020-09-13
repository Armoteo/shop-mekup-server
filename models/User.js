const { Schema, model, Types } = require('mongoose')

const shema = new Schema({
  //поле текстовое , обьязательное и уникальное
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
  links: [{ type: Types.ObjectId, ref: 'Links' }]
})

module.exports = model('User', shema)