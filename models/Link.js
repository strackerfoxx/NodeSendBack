import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt"

const linkSchema = new Schema({
    nombreArchivo: {
        type: String,
        required: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    descargas: {
        type: Number,
        default: 1
    },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        default: null
    },
    password: {
        type: String,
        default: null
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})

linkSchema.methods.compararPassword = async function(passwordState){
    return await bcrypt.compare(passwordState, this.password)
}

export default mongoose.model("Link", linkSchema)