const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:String,
        
    },
    role:{
        type:String,
        default:'user'
    }
})

const users=mongoose.model("users",userSchema)
module.exports=users