const express = require("express")
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");


const app = express()

const mongoURL= `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () =>{
    mongoose.connect(mongoURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=> console.log("successfully connected to database")).catch((e)=> console.log(e),
    setTimeout(connectWithRetry,5000)
    )    
}

app.get("/",(req,res)=>{
    res.send("<h2>Hello there!!</h2>")
})
const port = process.env.port || 3000;

app.listen(port,()=> console.log(`listening on port ${port}`))