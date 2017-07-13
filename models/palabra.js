'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PalabraSchema = Schema({
  palabra: String,
  afiches: [{ type: Schema.ObjectId, ref: "Afiche" }]
})

module.exports = mongoose.model('Palabra', PalabraSchema)
