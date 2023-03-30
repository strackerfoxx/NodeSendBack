import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt"

const usuariosSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
})

usuariosSchema.methods.compararPassword = async function(passwordState){
    return await bcrypt.compare(passwordState, this.password)
}

export default mongoose.model("Usuario", usuariosSchema)