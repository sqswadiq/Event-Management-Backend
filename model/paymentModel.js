const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'users',
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

payments = mongoose.model('payments', paymentSchema);
module.exports=payments
