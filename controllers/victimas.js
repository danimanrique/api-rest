'use strict'
// Modelos
const Victima = require('../models/victimas')

function getVictima (req, res) {
  let victimaId = req.params.victimaId

  Victima.findById(victimaId, (err, victima) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!victima) return res.status(404).send({message: 'La victima no existe'})

    res.status(200).send({victima: victima})
  })
}

function getVictimas (req, res) {
  Victima.find({}, (err, victimas) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!victimas) return res.status(404).send({message: 'No existen victimas'})
    res.status(200).send({victimas: victimas})
  })
}

function saveVictima(req, res){
  console.log('POST /api/victima')
  /* gracias al middleware body-parser se puede acceder
  al cuerpo de la petición fácilmente con req.body-parser
  como si fuera un elemento JSON*/
  console.log(req.body)

  let victima = new Victima()
  victima.nombre = req.body.nombre
  victima.apellido = req.body.apellido
  victima.picture = req.body.picture
  victima.estado = req.body.estado
  // Si no se recibe un elemento del enum, no se almacena

  // mongodb le asigna un id único por defecto
  victima.save((err, victimaStored) => {
    if(err) res.status(500).send({message: 'Error al guardar una víctima'})

    res.status(200).send({victima: victimaStored})
  })
}

function updateVictima (req, res) {
  let victimaId = req.params.victimaId
  let update = req.body

  Victima.findByIdAndUpdate(victimaId, update, (err, victimaUpdated) => {
    if(err) res.status(500).send({message: `Error al actualizar la victima: ${err}`})

    res.status(200).send({victima: victimaUpdated})
  })
}

function deleteVictima (req, res) {
  let victimaId = req.params.victimaId

  Victima.findById(victimaId, (err, victima) => {
    if(err) res.status(500).send({message: `Error al borrar la víctima: ${err}`})

    victima.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la victima: ${err}`})
      res.status(200).send({message: 'La víctima fue borrada con éxito'})
    })
  })
}

module.exports = {
  getVictima,
  getVictimas,
  saveVictima,
  updateVictima,
  deleteVictima
}
