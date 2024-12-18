const express = require('express')
const {PrismaClient} = require('@prisma/client')

const recurso_posteos = express()
const prisma = new PrismaClient()

recurso_posteos.use(express.json())

recurso_posteos.get('/', async (req, res) => {
    const posteos = await prisma.posteos.findMany()
    res.send(posteos)
})

recurso_posteos.get('/:id', async (req, res) => {
    const posteo_solicitado = await prisma.posteos.findUnique({ //Devuelve null si no encuentra nada
        where:{
            id: parseInt(req.params.id),
        },
    })
    if(!posteo_solicitado){
        res.sendStatus(404)
        return
    }
    res.send(posteo_solicitado)
})

recurso_posteos.post('/', async (req, res) => {
    if(!(req.body.asunto) || !(req.body.texto) || !(req.body.autorNickname) || !(req.body.topico)){
        res.sendStatus(400) //Status 400 bad request
        return
    }
    const nuevo_posteo = await prisma.posteos.create({
        data:{
            asunto: req.body.asunto,
            texto: req.body.texto,
            autorNickname: req.body.autorNickname, //Nickname
            topico: req.body.topico,
        },
    })
    console.log("Creando nuevo posteo...")
    res.status(201).send(nuevo_posteo)
}) 

recurso_posteos.put('/:id', async (req, res) => {
    const campos_actualizar = [
        req.body.asunto,
        req.body.texto,
        req.body.topico,
    ]
    if(campos_actualizar.every(campo => !campo)){ //No tiene sentido llamar a PUT si no hay nada a actualizar
        res.sendStatus(400)
        return
    }
    const posteo_modificar = await prisma.posteos.findUnique({
        where:{
            id: parseInt(req.params.id),
        },
    })
    if(!posteo_modificar){
        res.sendStatus(404)
        return
    }
    const posteo_modificado = await prisma.posteos.update({
        where:{
            id: parseInt(req.params.id),
        },
        data:{
            asunto: campos_actualizar[0] ?? posteo_modificar.asunto,
            texto: campos_actualizar[1] ?? posteo_modificar.texto,
            topico: campos_actualizar[2]?? posteo_modificar.topico,
        },
    })
    console.log("Actualizando posteo...")
    res.status(200).send(posteo_modificado)
})

recurso_posteos.delete('/:id/me_gusta', async (req, res) => {
    const posteo_modificar = await prisma.posteos.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    })

    if (!posteo_modificar) {
        res.sendStatus(404)
        return
    }
    let cant_restar = 1
    if (posteo_modificar.me_gustas === 0) {
        cant_restar = 0
    }
    const posteo_actualizar = await prisma.posteos.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            me_gustas: posteo_modificar.me_gustas - cant_restar,
        },
    })
    console.log(`Borrando ${cant_restar} me gusta...`)
    res.status(200).send(posteo_actualizar) // Opcional: enviar el post actualizado
})

recurso_posteos.put('/:id/me_gusta', async (req, res) => {
    const posteo_modificar = await prisma.posteos.findUnique({
        where: {
            id: parseInt(req.params.id),
        },
    })

    if (!posteo_modificar) {
        res.sendStatus(404)
        return
    }
    const posteo_actualizar = await prisma.posteos.update({
        where: {
            id: parseInt(req.params.id),
        },
        data: {
            me_gustas: posteo_modificar.me_gustas + 1,
        },
    })

    res.status(200).send(posteo_actualizar) // Opcional: enviar el post actualizado
})

recurso_posteos.delete('/:id', async (req, res) => {
    const posteo_eliminar = await prisma.posteos.findUnique({
        where:{
            id: parseInt(req.params.id),
        },
    })
    if(!posteo_eliminar){
        res.sendStatus(404)
        return
    }
    await prisma.posteos.delete({
        where:{
            id: parseInt(req.params.id),
        },
    })
    res.status(200).send(posteo_eliminar)
})

module.exports = recurso_posteos