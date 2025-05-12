const multer=require('multer')

console.log("inside the middile ware");


const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'upload')
    },
    filename:(req,file,callback)=>{
        callback(null,`${Date.now()}_${file.originalname}`)
    }
})

const multerMiddileware=multer({storage})
module.exports=multerMiddileware
