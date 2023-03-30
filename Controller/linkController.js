import Link from "../models/Link.js"
import { validationResult } from "express-validator"
import { randomString } from "../helpers/nombreHash.js"
import bcrypt from "bcrypt"

export const crearLink = async (req, res) => {

    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).send({errores: errores.array()})
    }

    const link = new Link()
    link.nombreArchivo = req.body.nombreArchivo
    link.nombre = randomString(12)
    link.url = randomString(12)
    
    if(req.usuario){
        link.autor = req.usuario.id
        link.descargas = req.body?.descargas || 1
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(req.body.password, salt)
            link.password = hash;
        }
    }
    req.link = link
    try {
        await link.save()
        return res.status(200).json({msg: link.url})
    } catch (error) {
        return res.status(400).json({msg: error.message})
    }
}

export const obtenerLink = async (req, res, next) => {
    const link = await Link.findOne({url: req.params.url})
    if(link){
        const descargas = link.descargas -= 1
        if(descargas === 0){
            req.archivo = link?.nombre
            link.deleteOne()
            
            next()
            res.status(200).json({"archivo": link.nombre, "msg": "Ultima Descarga Hecha, ELIMINANDO..."})
        }else{
            link.descargas = descargas
            link.save()
            res.status(200).json({"archivo": link.nombre, "msg": `Te queda${ descargas > 1 ? "n" : ""} ${descargas > 1 ? descargas : ""} ${descargas > 1 ? "descargas" : "la ultima descarga"}`})
        }
    }else{
        return res.status(401).json({msg: "Ese enlace no existe"})
    }
}
export const listado = async (req, res) => {
    const url = req.params.url
    if(url){
        const link = await Link.findOne({url})
        return res.send(link.url)
    }
    const enlaces = await Link.find()
    const urls = []
    enlaces.map(enlace => (
        urls.push(enlace.url)
    ))
    return res.send(urls)
}