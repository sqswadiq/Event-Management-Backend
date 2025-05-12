const mongoose=require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    eventId: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 1
    },
    eventname: String,
    price: String,
    date: String,
    time: String,
    place: String,
    eventimage:String
});

const carts=mongoose.model("carts",cartSchema)
module.exports=carts