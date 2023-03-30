import multer from "multer"
const configuracionMulter = {
    limits : { fileSize : 1000000 },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype
        }
    })
}
const upload = multer(configuracionMulter).single("archivo")

export default upload(req, res, (err) => {
    console.log(req.file)
    if(!err){
        res.send("YEY")
    }else{
        res.json({err})
    }
    return next();
})