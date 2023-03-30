import express from "express"
import conectarDB from "./config/db.js"
import dotenv from "dotenv";
import routerUser from "./routes/usuarioRoutes.js";
import routerLink from "./routes/linkRoutes.js";
import routerArchivo from "./routes/archivoRoutes.js";
import cors from "cors"

// crear el servidor
const app = express()
dotenv.config()
//Conectar a la DB
conectarDB()

// // *******************Configurar CORS   Comentar esta zona para usar postman*******************

// Habilitar Cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(opcionesCors) );

// // *******************Comentar esta zona para usar postman*******************

app.use(express.static("uploads"))

//Habilitar leer los valores de un  body
app.use(express.json())

// Rutas de la app
app.use('/api/usuarios', routerUser)
app.use('/api/link', routerLink)
app.use('/api/archivo', routerArchivo)

//Puerto de la app
const port  = process.env.PUERTO || 4000;

//Arrancar la app
app.listen("https://meek-shortbread-4d7c94.netlify.app/", "0.0.0.0",  () => {
})
