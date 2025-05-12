require('dotenv').config()
require('./db/dbconnection')
// const Razorpay = require('razorpay')
// const crypto=require("crypto")
const express=require('express')
const cors=require('cors')
const router=require('./routes/router')

const eventServer=express()
eventServer.use(cors())
eventServer.use(express.json());
eventServer.use(express.urlencoded({extended:false}))
eventServer.use(router)
eventServer.use('/upload',express.static('./upload'))
const PORT=3000 || process.env.PORT
eventServer.listen(PORT,()=>{
    console.log(`EventServer running successfully at Port :${PORT}`);
    
})
eventServer.get('/',(req,res)=>{
    res.status(200).send("<h1>Server Running, Waiting for client request</h1>")
})


