'use strict'
// framework de nodeJS
const express = require('express')
// librería que da varios middlewares para manejar datos de peticion
const bodyParser = require('body-parser')

const app = express()

const aficheCtrl = require('./controllers/aficheController')
const seccionCtrl = require('./controllers/seccionController')

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
/** Seting up server to accept cross-originn browser requests */
app.use(function(req, res, next) { //allow cross origin requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/home', function home(req, res){
  console.log("Existe conexion con API")
  res.status(200).send({message: "Hay conexión con API"})
})

function home (req, res) {
  let aficheId = req.params.aficheId

  Afiche.findById(aficheId, (err, elto) => {
    if(err) return res.status(500).send({message: 'Error al realizar la operación'})
    if(!elto) return res.status(404).send({message: 'El afiche no existe'})
    Seccion.populate(elto, {path: "seccion"},function(err, elto){
        	res.status(200).send({afiche: elto})
        });
  })
}
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
                        /*      PETICIONES PARA ABM     */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Afiches
app.get('/api/afiche/', aficheCtrl.getAfiches)
//app.get('/api/afiche/', aficheCtrl.getCompas)
app.get('/api/afiche/:aficheId', aficheCtrl.getAfiche)
app.post('/api/afiche/', aficheCtrl.saveAfiche)
app.put('/api/afiche/:aficheId', aficheCtrl.updateAfiche)
app.delete('/api/afiche/:aficheId', aficheCtrl.deleteAfiche)
// Seccion
app.get('/api/seccion/', seccionCtrl.getSecciones)
app.get('/api/seccion/:victimaId', seccionCtrl.getSeccion)
app.post('/api/seccion/', seccionCtrl.saveSeccion)
app.put('/api/seccion/:victimaId', seccionCtrl.updateSeccion)
app.delete('/api/seccion/:victimaId', seccionCtrl.deleteSeccion)


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
                        /*      PETICIONES PARA APP    */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
app.get('/api/estado/', aficheCtrl.getEstado)
app.get('/api/compas/', aficheCtrl.getCompas)
app.get('/api/impunidad/', aficheCtrl.getImpunidad)
app.get('/api/bahia/', aficheCtrl.getBahia)
app.get('/api/neuquen/', aficheCtrl.getNeuquen)
app.get('/api/busqueda/:arreglo/:secciones', aficheCtrl.getBusqueda)



module.exports = app
