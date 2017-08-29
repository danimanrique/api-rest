'use strict'
// Modelos
const Afiche = require('../models/afiche')
const Seccion = require('../models/seccion')

function getAfiche (req, res) {
  let aficheId = req.params.aficheId

  Afiche.findById(aficheId, (err, elto) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!elto) return res.status(404).send({message: 'El afiche no existe'})
    Seccion.populate(elto, {path: "section"},function(err, elto){
        	res.status(200).send({afiche: elto})
        });
  })
}

function getAfiches (req, res) {
  Afiche.find({}, (err, afiches) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!afiches) return res.status(404).send({message: 'No existen afiches'})
    res.status(200).send({afiches: afiches})
  })
}

function saveAfiche(req, res){
  console.log('POST /api/afiche')
  /* gracias al middleware body-parser se puede acceder
  al cuerpo de la petición fácilmente con req.body-parser
  como si fuera un elemento JSON*/
  console.log(req.body)

  let afiche = new Afiche()
  afiche.name = req.body.name
  afiche.description = req.body.description
  afiche.small = req.body.small
  afiche.medium = req.body.medium
  afiche.big = req.body.big
  afiche.section = req.body.section
  afiche.keys = req.body.palabras

  // mongodb le asigna un id único por defecto
  afiche.save((err, eltoStored) => {
    if(err) res.status(500).send({message: 'Error al guardar un afiche'})

    res.status(200).send({afiche: eltoStored})
  })
}

function updateAfiche (req, res) {
  let aficheId = req.params.aficheId
  let update = req.body

  Afiche.findByIdAndUpdate(aficheId, update, (err, eltoUpdated) => {
    if(err) res.status(500).send({message: `Error al actualizar el afiche: ${err}`})

    res.status(200).send({afiche: eltoUpdated})
  })
}

function deleteAfiche (req, res) {
  let aficheId = req.params.aficheId

  Afiche.findById(aficheId, (err, elto) => {
    if(err) res.status(500).send({message: `Error al borrar el afiche: ${err}`})

    elto.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el afiche: ${err}`})
      res.status(200).send({message: 'El afiche fue borrado con éxito'})
    })
  })
}

function getCompas (req, res) {
  Afiche.find({"seccion":"5997063c7820ca046beb08be"}, (err, afiches) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!afiches) return res.status(404).send({message: 'No existen afiches'})
    Seccion.populate(afiches, {path: "seccion"},function(err, libros){
        	res.status(200).send({afiches: afiches})
        });
}).select({small:1, big:1});
}

module.exports = {
  getAfiche,
  getAfiches,
  saveAfiche,
  updateAfiche,
  deleteAfiche,
  getCompas
}
