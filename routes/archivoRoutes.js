import express from "express";
const router = express.Router();
import { crearArchivo, deleteArchivo, downloadArchivo } from '../Controller/archivoController.js'
import autentication from "../middleware/auth.js"

router.post("/:query", autentication, crearArchivo);
router.get("/:url", downloadArchivo);
router.delete("/:id", deleteArchivo);

export default router