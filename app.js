'use strict'
// framework de nodeJS
const express = require('express')
// librería que da varios middlewares para manejar datos de peticion
const bodyParser = require('body-parser')

const app = express()

const victimaCtrl = require('./controllers/victimas')
const palabraCtrl = require('./controllers/palabraController')
const aficheCtrl = require('./controllers/aficheController')
const seccionCtrl = require('./controllers/seccionController')

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Victimas
app.get('/api/victima/', victimaCtrl.getVictimas)
app.get('/api/victima/:victimaId', victimaCtrl.getVictima)
app.post('/api/victima/', victimaCtrl.saveVictima)
app.put('/api/victima/:victimaId', victimaCtrl.updateVictima)
app.delete('/api/victima/:victimaId', victimaCtrl.deleteVictima)

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

module.exports = app
