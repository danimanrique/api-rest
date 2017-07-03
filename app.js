'use strict'
// framework de nodeJS
const express = require('express')
// librería que da varios middlewares para manejar datos de peticion
const bodyParser = require('body-parser')

const app = express()

const victimaCtrl = require('./controllers/victimas')

// middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// peticiones
app.get('/api/victima/', victimaCtrl.getVictimas)
app.get('/api/victima/:victimaId', victimaCtrl.getVictima)
app.post('/api/victima/', victimaCtrl.saveVictima)
app.put('/api/victima/:victimaId', victimaCtrl.updateVictima)
app.delete('/api/victima/:victimaId', victimaCtrl.deleteVictima)

module.exports = app
