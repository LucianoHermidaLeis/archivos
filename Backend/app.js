const express = require('express')
const cors = require('cors')
//Importando el CRUD de cada recurso
const recurso_usuarios = require('./CRUDs-recursos/usuarios.js')
const recurso_posteos = require('./CRUDs-recursos/posteos.js')
const recurso_comentarios = require('./CRUDs-recursos/comentarios.js')

const api = express()
const port = 5000

api.use(express.json())
api.use(cors())

api.use('/api/v1/usuarios', recurso_usuarios)
api.use('/api/v1/posteos', recurso_posteos)
api.use('/api/v1/comentarios', recurso_comentarios)

api.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`)
})