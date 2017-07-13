'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AficheSchema = Schema({
  nombre: String,
  descripcion: String,
  img: String,
  seccion: { type: Schema.ObjectId, ref: "Seccion" },
  palabras: [{ type: Schema.ObjectId, ref: "PalabraSchema"}]
})

module.exports = mongoose.model('Afiche', AficheSchema)
