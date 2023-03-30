import Usuario from "../models/Usuario.js"
import bcrypt from "bcrypt"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"

export async function newUser(req, res){
    const {nombre, email, password} = req.body
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).send({errores: errores.array()})
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        await Usuario.create({ nombre, email, password: hash })
        return res.status(200).json({msg: "Usuario Creado Correctamente"})
    } catch (error) {
        return res.status(400).json({msg: "Este Usuario Ya Existe"})
    }
}

export async function login(req, res){
    const {email,  password} = req.body
    const usuario = await Usuario.findOne({email})
    
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).send({errores: errores.array()})
    }

    if(usuario){
        if(await usuario.compararPassword(password)){
            const token = jwt.sign({ id: usuario._id },
            process.env.SECRET_KEY, {expiresIn: "90d"})
            res.status(200).json({token, "nombre": usuario.nombre})

        }else{
            res.status(401).json({msg: "La Contraseña no Coincide O El Usuario No Existe"})
        }
    }else{
        res.status(401).json({msg: "El Usuario No Existe"})
    }
}
export async function deleteUser(req, res){
    const {email} = req.body
    
    if(await Usuario.findOneAndDelete({email})){
        res.status(200).json({msg: "Usuario Borrado Correctamente"})
    }else{
        res.status(400).json({msg: "El Usuario No Existe"})
    }
}

export function auth(req, res){
    return res.json({usuario: req.usuario})
}