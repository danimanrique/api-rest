'use strict'
// Modelos
const Palabra = require('../models/palabra')

function getPalabra (req, res) {
  let palabraId = req.params.palabraId

  Palabra.findById(palabraId, (err, elto) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!elto) return res.status(404).send({message: 'La palabra no existe'})

    res.status(200).send({palabra: elto})
  })
}

function getPalabras (req, res) {
  Palabra.find({}, (err, array) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!array) return res.status(404).send({message: 'No existen palabras'})
    res.status(200).send({palabras: array})
  })
}

function savePalabra(req, res){
  console.log('POST /api/palabra')
  /* gracias al middleware body-parser se puede acceder
  al cuerpo de la petición fácilmente con req.body-parser
  como si fuera un elemento JSON*/
  console.log(req.body)

  let palabra = new Palabra()
  palabra.nombre = req.body.nombre
  palabra.descripcion = req.body.descripcion
  palabra.img = req.body.img
  palabra.seccion = req.body.seccion
  palabra.palabras = req.body.palabras

  // mongodb le asigna un id único por defecto
  palabra.save((err, eltoStored) => {
    if(err) res.status(500).send({message: 'Error al guardar una palabra'})

    res.status(200).send({palabra: eltoStored})
  })
}

function updatePalabra (req, res) {
  let palabraId = req.params.palabraId
  let update = req.body

  Palabra.findByIdAndUpdate(palabraId, update, (err, eltoUpdated) => {
    if(err) res.status(500).send({message: `Error al actualizar la palabra: ${err}`})

    res.status(200).send({palabra: eltoUpdated})
  })
}

function deletePalabra (req, res) {
  let palabraId = req.params.palabraId

  Palabra.findById(palabraId, (err, elto) => {
    if(err) res.status(500).send({message: `Error al borrar la palabra: ${err}`})

    elto.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la palabra: ${err}`})
      res.status(200).send({message: 'La palabra fue borrado con éxito'})
    })
  })
}

module.exports = {
  getPalabra,
  getPalabras,
  savePalabra,
  updatePalabra,
  deletePalabra
}
