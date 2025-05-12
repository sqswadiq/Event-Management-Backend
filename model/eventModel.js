const mongoose=require('mongoose')
const eventSchema=new mongoose.Schema({
    eventname:{
        type:String,
        required:true,
    },
    place:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    time:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    eventimage:{
        type:String,
        required:true,
    },
})

const events=mongoose.model("events",eventSchema)
module.exports=events