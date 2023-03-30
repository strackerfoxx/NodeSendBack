import multer from "multer"
import { randomString } from "../helpers/nombreHash.js"
import fs from "fs"

import Link from "../models/Link.js"
import bcrypt from "bcrypt"

const mb = 1000000
const random = randomString(12)

export const crearArchivo = async (req, res, next) => {

    const configuracionMulter = {
        limits : { fileSize : req.usuario ? mb * 10  : mb },
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${randomString(12)}${extension}` );
            }
        })
    }
    const upload = multer(configuracionMulter).single('archivo');

    const downloads = req.params.query.split("-")[1]
    const password = req.params.query.split("-")[3]

    upload(req, res, async (err) => {
        if(err){
            res.json({msg: err.message})
        }
        
        const link = new Link()
        link.nombreArchivo = req.file.originalname
        link.nombre =  req.file.filename
        link.url = randomString(12)
        
        if(req.usuario){
            link.autor = req.usuario.id
            link.descargas = downloads || 1
            if(password){
                const salt = await bcrypt.genSalt(10)
                const hash = await bcrypt.hash(password, salt)
                link.password = hash;
            }
        }
        try {
            await link.save()
            return res.status(200).json({msg: link.url})
        } catch (error) {
            return res.status(400).json({msg: error.message})
        }
    })
}
export const deleteArchivo = (req, res) => {
    try {
        fs.unlinkSync(`./uploads/${req.archivo}`);
    } catch (error) {
        console.log(error)
    }
}
export const downloadArchivo = async (req, res, next) => {
    const link = await Link.findOne({url: req.params.url})
    if(!link){
        return res.status(404).json({msg: 'No se encontro el archivo'})
    }
    const archivo = link.nombre
    res.download(`./uploads/${archivo}`)
    const descargas = link.descargas -= 1
    if(descargas === 0){
        link.deleteOne()
        // res.status(200).json({"archivo": link.nombre, "msg": "Ultima Descarga Hecha, ELIMINANDO..."})
    }else{
        link.descargas = descargas
        link.save()
        // res.status(200).json({"archivo": link.nombre, "msg": `Te queda${ descargas > 1 ? "n" : ""} ${descargas > 1 ? descargas : ""} ${descargas > 1 ? "descargas" : "la ultima descarga"}`})
    }
}