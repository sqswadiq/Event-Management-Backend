const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "User"
    },
    eventId: {
        type: String,
        ref: "Event"
    },
    userName: String,
    eventName: String,
    eventDate: String,
    eventTime: String,
    eventPlace: String,

    ticketNo: String,
});

 bookings= mongoose.model("bookings", bookingSchema);
 module.exports=bookings
