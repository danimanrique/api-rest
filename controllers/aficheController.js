'use strict'
// Modelos
const Afiche = require('../models/afiche')
const Seccion = require('../models/seccion')

const array_secc = [
    "599705a07820ca046beb08bd", //Estado Terrorista
    "5997063c7820ca046beb08be", //Nuestros Compañeros
    "599706527820ca046beb08bf", //Todos Contra la impunidad
    "599706c17820ca046beb08c1", //Juicios Bahía
    "599706b77820ca046beb08c0" //Juicios Neuquén
]

function getAfiche (req, res) {
  let aficheId = req.params.aficheId

  Afiche.findById(aficheId, (err, elto) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!elto) return res.status(404).send({message: 'El afiche no existe'})
    Seccion.populate(elto, {path: "seccion"},function(err, elto){
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
  afiche.seccion = req.body.seccion
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

/* ------------------------------------------------------------------------------- */
/*                           PETICIONES PARA GALERIAS                              */
/* --------------------------------------------------------------------------------*/

function getEstado (req, res) {
  Palabra.find({"seccion":array_secc[0]}, (err, afiches) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!afiches) return res.status(404).send({message: 'No existen afiches'})
    Seccion.populate(afiches, {path: "seccion"},function(err, elto){
        	res.status(200).send({afiches: afiches})
        });
}).select({name:1, big:1});
}

function getCompas (req, res) {
  Afiche.find({"seccion":array_secc[1]}, (err, afiches) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!afiches) return res.status(404).send({message: 'No existen afiches'})
    Seccion.populate(afiches, {path: "seccion"},function(err, elto){
        	res.status(200).send({afiches: afiches})
        });
}).select({small:1, big:1});
}

function getImpunidad (req, res) {
  Afiche.find({"seccion":array_secc[2]}, (err, afiches) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!afiches) return res.status(404).send({message: 'No existen afiches'})
    Seccion.populate(afiches, {path: "seccion"},function(err, elto){
        	res.status(200).send({afiches: afiches})
        });
}).select({name:1, big:1});
}

function getBahia (req, res) {
  Afiche.find({"seccion":array_secc[3]}, (err, afiches) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!afiches) return res.status(404).send({message: 'No existen afiches'})
    Seccion.populate(afiches, {path: "seccion"},function(err, elto){
        	res.status(200).send({afiches: afiches})
        });
}).select({small:1, big:1, medium: 1, name: 1});
}

function getNeuquen (req, res) {
  Afiche.find({"seccion":array_secc[4]}, (err, afiches) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!afiches) return res.status(404).send({message: 'No existen afiches'})
    Seccion.populate(afiches, {path: "seccion"},function(err, elto){
        	res.status(200).send({afiches: afiches})
        });
}).select({small:1, big:1, medium: 1, name: 1});
}

/* ------------------------------------------------------------------------------- */
/*                           PETICION SECCION BUSQUEDA                             */
/* --------------------------------------------------------------------------------*/
function getBusqueda (req, res) {
  var arreglo = (req.params.arreglo).split(',')
  var secciones = (req.params.secciones).split(',')
  var secId = []
  for(let i=0; i<5;i++){
      if(secciones[i]=="true"){
          secId.push(array_secc[i])
     }
  }
  Afiche.find({seccion: {$in: secId}}, (err, afiches) => {
        if(err) return res.status(500).send({message: 'Error al realizar la operación'})
        if(!afiches) return res.status(404).send({message: 'No existen afiches'})
        res.status(200).send({afiches: afiches})
    }).where('keys').in(arreglo);
}

module.exports = {
  getAfiche,
  getAfiches,
  saveAfiche,
  updateAfiche,
  deleteAfiche,
  getEstado,
  getCompas,
  getImpunidad,
  getNeuquen,
  getBahia,
  getBusqueda
}
