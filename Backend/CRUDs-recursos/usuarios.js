const express = require('express')
const {PrismaClient} = require('@prisma/client')

const recurso_usuarios = express()
const prisma = new PrismaClient()

recurso_usuarios.use(express.json())

recurso_usuarios.get('/', async (req, res) => {
    const usuarios = await prisma.usuario.findMany()
    res.send(usuarios)
})

recurso_usuarios.get('/:nickname', async (req, res) => {
    const usuario_solicitado = await prisma.usuario.findUnique({ //Devuelve null si no encuentra nada
        where:{
            nickname: req.params.nickname,
        },
    })
    if(!usuario_solicitado){
        res.sendStatus(404)
        return
    }
    res.send(usuario_solicitado)
})

recurso_usuarios.post('/', async (req, res) => {
    if(!(req.body.nickname) || !(req.body.email) || !(req.body.contrasena)){
        res.sendStatus(400); //Status 400 bad request
        return
    }
    const nuevo_usuario = await prisma.usuario.create({
        data:{
            nickname: req.body.nickname,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            signo_zodiacal: req.body.signo_zodiacal,
            carrera: req.body.carrera,
            profesor: req.body.profesor,
            email: req.body.email,
            contrasena: req.body.contrasena
        }
    })
    console.log("Creando usuario...")
    res.status(201).send(nuevo_usuario) 
})

recurso_usuarios.put('/:nickname', async (req, res) => {
    const campos_actualizar = [
        req.body.nickname,
        req.body.nombre,
        req.body.apellido,
        req.body.signo_zodiacal,
        req.body.carrera,
        req.body.profesor,
        req.body.email,
        req.body.contrasena
    ]
    if(campos_actualizar.every(campo => !campo)){ //No tiene sentido llamar a PUT si no hay nada a actualizar
        res.sendStatus(400)
        return
    }

    const usuario_modificar = await prisma.usuario.findUnique({
        where:{
            nickname: req.params.nickname,
        },
    })
    if(!usuario_modificar){
        res.sendStatus(404)
        return
    }
    const nuevo_usuario = await prisma.usuario.update({
        where:{
            nickname: req.params.nickname,
        },
        data:{
            nickname: campos_actualizar[0] ?? usuario_modificar.nickname,
            nombre: campos_actualizar[1] ?? usuario_modificar.nombre,
            apellido: campos_actualizar[2]?? usuario_modificar.apellido,
            signo_zodiacal: campos_actualizar[3] ?? usuario_modificar.signo_zodiacal,
            carrera: campos_actualizar[4] ?? usuario_modificar.carrera,
            profesor: campos_actualizar[5] ?? usuario_modificar.profesor,
            email: campos_actualizar[6] ?? usuario_modificar.email,
            contrasena: campos_actualizar[7] ?? usuario_modificar.contrasena
        },
    })
    console.log("Actualizando usuario...")
    res.status(200).send(nuevo_usuario)
})

recurso_usuarios.delete('/:nickname', async (req, res) => {
    const usuario_eliminar = await prisma.usuario.findUnique({
        where:{
            nickname: req.params.nickname,
        },
    })
    if(!usuario_eliminar){
        res.sendStatus(404)
        return
    }
    await prisma.usuario.delete({
        where:{
            nickname: req.params.nickname,
        },
    })
    console.log("Borrando usuario...")
    res.status(200).send(usuario_eliminar)
})

module.exports = recurso_usuarios