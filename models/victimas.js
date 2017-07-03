'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VictimaSchema = Schema({
  nombre: String,
  apellido: String,
  picture: String,
  estado: { type: String, enum: ['desaparecido', 'muerto']}
})

module.exports = mongoose.model('Victima', VictimaSchema)
