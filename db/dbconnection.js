const mongoose=require('mongoose')
const connectionString=process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Atlas Connected ");
    
}).catch(err=>{
    console.log(err);
    
})