import express from "express";
const router = express.Router();
import { newUser, login, deleteUser, auth } from '../Controller/usuarioController.js'
import { check } from "express-validator";
import autentication from "../middleware/auth.js"

router.post("/", [
    check("nombre", "El Nombre es Obligatorio").not().isEmpty(),
    check("email", "El Email es Obligatorio").not().isEmpty(),
    check("email", "El Email no es valido").isEmail(),
    check("password", "La Contraseña Debe tener Al Menos 6 Caracteres").isLength(6)
], newUser)
router.post("/login", [
    check("email", "El Email es Obligatorio").not().isEmpty(),
    check("email", "El Email no es valido").isEmail(),
    check("password", "La Contraseña Debe tener Al Menos 6 Caracteres").isLength(6)
], login)
router.delete("/delete", deleteUser)
router.get("/auth", autentication, auth)

export default router