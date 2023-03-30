import express from "express";
const router = express.Router();
import { crearLink, obtenerLink, listado } from '../Controller/linkController.js'
import { crearArchivo, deleteArchivo } from '../Controller/archivoController.js'
import { check } from "express-validator";
import autentication from "../middleware/auth.js"

router.post("/", [
    check("nombreArchivo", "Sube Un Archivo").not().isEmpty()
], autentication, crearLink)

// router.get("/:url", obtenerLink, deleteArchivo)
router.get("/", listado)
router.get("/:url", listado)


export default router
// localhost:4000/api/link 