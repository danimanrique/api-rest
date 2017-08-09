'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AficheSchema = Schema({
  name: {type:String, require:true},
  small: {type:String},
  medium: {type:String},
  big: {type:String},
  description: {type:String},
  section: { type: Schema.ObjectId, ref: "Seccion" },
  keys: [{ type: Schema.ObjectId, ref: "Palabra"}]
})

module.exports = mongoose.model('Afiche', AficheSchema)
