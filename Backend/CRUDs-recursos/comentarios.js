const express = require('express')
const {PrismaClient} = require('@prisma/client')

const recurso_comentarios = express()
const prisma = new PrismaClient()

recurso_comentarios.use(express.json())

recurso_comentarios.get('/', async (req, res) => {
    const comentarios = await prisma.comentarios.findMany()
    res.send(comentarios)
})

recurso_comentarios.get('/:id', async (req, res) => {
    const comentario_solicitado = await prisma.comentarios.findUnique({ //Devuelve null si no encuentra nada
        where:{
            id: parseInt(req.params.id),
        },
    })
    if(!comentario_solicitado){
        res.sendStatus(404)
        return
    }
    res.send(comentario_solicitado)
})

recurso_comentarios.post('/', async (req, res) => {
    if(!req.body.texto || !req.body.autorNickname || !req.body.posteoId || !req.body.asunto){
        res.sendStatus(400) //Status 400 bad request
        return
    }
    const nuevo_comentario = await prisma.comentarios.create({
        data:{
            texto: req.body.texto,
            autorNickname: req.body.autorNickname, //Nickname
            posteoId: req.body.posteoId,
            asunto: req.body.asunto
        },
    })
    console.log("Creando nuevo comentario...")
    res.status(201).send(nuevo_comentario)
}) 

recurso_comentarios.put('/:id', async (req, res) => {
    const campos_actualizar = [
        req.body.texto,
        req.body.posteoId,
        req.body.asunto
    ]
    if(campos_actualizar.every(campo => !campo)){ //No tiene sentido llamar a PUT si no hay nada a actualizar
        res.sendStatus(400)
        return
    }
    const comentario_modificar = await prisma.comentarios.findUnique({
        where:{
            id: parseInt(req.params.id),
        },
    })
    if(!comentario_modificar){
        res.sendStatus(404)
        return
    }
    const comentario_actualizar = await prisma.comentarios.update({
        where:{
            id: parseInt(req.params.id),
        },
        data:{
            texto: campos_actualizar[0] ?? comentario_modificar.texto,
            posteoId: campos_actualizar[1]?? comentario_modificar.posteoId,
            asunto: campos_actualizar[2]?? comentario_modificar.asunto
        },
    })
    console.log("Actualizando comentario...")
    res.status(200).send(comentario_actualizar)
})

recurso_comentarios.delete('/:id/me_gusta', async (req, res) => {
    const comentario_modificar = await prisma.comentarios.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    })

    if (!comentario_modificar) {
        res.sendStatus(404)
        return
    }
    let cant_restar = 1
    if (comentario_modificar.me_gustas === 0) {
        cant_restar = 0
    }
    const comentario_actualizar = await prisma.comentarios.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            me_gustas: comentario_modificar.me_gustas - cant_restar,
        },
    })
    console.log(`Borrando ${cant_restar} me gusta...`)
    res.status(200).send(comentario_actualizar) // Opcional: enviar el post actualizado
})

recurso_comentarios.put('/:id/me_gusta', async (req, res) => {
    const comentario_modificar = await prisma.comentarios.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    })

    if (!comentario_modificar) {
        res.sendStatus(404)
        return
    }
    const comentario_actualizar = await prisma.comentarios.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            me_gustas: comentario_modificar.me_gustas + 1,
        },
    })
    console.log("Sumando 1 me gusta")
    res.status(200).send(comentario_actualizar) // Opcional: enviar el post actualizado
})

recurso_comentarios.delete('/:id', async (req, res) => {
    const comentario_eliminar = await prisma.comentarios.findUnique({
        where:{
            id: parseInt(req.params.id),
        },
    })
    if(!comentario_eliminar){
        res.sendStatus(404)
        return
    }
    await prisma.comentarios.delete({
        where:{
            id: parseInt(req.params.id),
        },
    })
    res.status(200).send(comentario_eliminar)
})

module.exports = recurso_comentarios