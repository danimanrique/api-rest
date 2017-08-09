'use strict'
// framework de nodeJS
const express = require('express')
// librería que da varios middlewares para manejar datos de peticion
const bodyParser = require('body-parser')

const app = express()

const palabraCtrl = require('./controllers/palabraController')
const aficheCtrl = require('./controllers/aficheController')
const seccionCtrl = require('./controllers/seccionController')

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
/** Seting up server to accept cross-originn browser requests */
app.use(function(req, res, next) { //allow cross origin requests
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
                        /*      PETICIONES PARA ABM     */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// Afiches
app.get('/api/afiche/', aficheCtrl.getAfiches)
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
// Palabras claves
app.get('/api/palabra/', palabraCtrl.getPalabras)
app.get('/api/palabra/:palabraId', palabraCtrl.getPalabra)
app.post('/api/palabra/', palabraCtrl.savePalabra)
app.put('/api/palabra/:palabraId', palabraCtrl.updatePalabra)
app.delete('/api/palabra/:palabraId', palabraCtrl.deletePalabra)


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
                        /*      PETICIONES PARA APP    */
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
// app.get('/api/estado/', aficheCtrl.getEstado)
app.get('/api/compas/', aficheCtrl.getCompas)
// app.get('/api/impunidad/', aficheCtrl.getImpunidad)
// app.get('/api/bahia/', aficheCtrl.getBahia)
// app.get('/api/neuquen/', aficheCtrl.getNeuquen)


module.exports = app
