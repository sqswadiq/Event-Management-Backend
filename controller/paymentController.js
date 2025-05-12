const Razorpay = require("razorpay");
const payments = require('../model/paymentModel')
const crypto = require("crypto");
require('dotenv').config();
exports.createOrder = async (req, res) => {
    try {
        
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET
        });

        const options = req.body;
        
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send("Error creating order");
        }

        res.json(order);
    } catch (error) {
        res.status(500).send("Server error while creating order");
    }
};

exports.validatePayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
        return res.status(400).json({ msg: "Transaction is not legit!" });
    }

    res.status(200).json({
        msg: "Success",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
    });
};

exports.addPaymentDetails=async(req,res)=>{
    console.log("inside addPaymentDetails");

    const { userId, paymentId, amount, paymentMethod } = req.body

    try {
        // Validation
        if (!userId|| !paymentId || !amount || !paymentMethod) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newPayment=new payments({ userId, paymentId, amount, paymentMethod})

        await newPayment.save()

        res.status(200).json(newPayment)
        
    } 
    catch (error) {
        res.status(500).json(error)
    }
    
}

exports.getPaymentDetails=async(req,res)=>{
    console.log("inside getPaymentDetails");
    
    try {
        const result=await payments.find().populate('userId')

        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(500)
    }
}

exports.deletePaymentDetails=async(req,res)=>{
    console.log("inside deletePaymentDetails");


    const {id}=req.params
    try {
        const deletedPayment=await payments.findByIdAndDelete(id)

        res.status(200).json(deletedPayment)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}



