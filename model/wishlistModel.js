const mongoose=require('mongoose')

const wishlistSchema=new mongoose.Schema({
    userId:{
        type:String,
        ref:"users",
        required:true
    },
    eventId:{
        type:String,
        ref:"events",
        required:true
    }
})

const wishlists=mongoose.model('wishlists',wishlistSchema)
module.exports=wishlists