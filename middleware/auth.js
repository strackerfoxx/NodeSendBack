import jwt from "jsonwebtoken"

export default function autentication(req, res, next){
    const bearer = req.get("Authorization");
    if(bearer){
        const token = bearer.split(" ")[1]
        try {
            const usuario = jwt.verify(token, process.env.SECRET_KEY);
            req.usuario = usuario
        } catch (error) {
            res.status(400).json({msg: "JWT No Valido"})
        }
    }
    return next()
}