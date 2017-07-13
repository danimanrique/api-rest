'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SeccionSchema = Schema({
  numero: Number,
  descripcion: String,
  afiches: [{ type: Schema.ObjectId, ref: "Afiche" }]
})

module.exports = mongoose.model('Seccion', SeccionSchema)
