const { Schema, model, Types } = require('mongoose')

const goods = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: String
})

module.exports = model('Goods', goods)