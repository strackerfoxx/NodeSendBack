import mongoose from 'mongoose'

export default async function conectarDb(){
    try {
        await mongoose.connect(process.env.CONNECT_DB,
        { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit(1);
    }
}