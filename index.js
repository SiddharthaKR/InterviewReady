const express = require("express")
const mongoose = require("mongoose");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");
const postRouter = require("./routes/postRoute")
const userRouter = require("./routes/userRoute")
const app = express()
app.use(express.json());

const mongoURL= `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () =>{
    mongoose.connect(mongoURL)
      .then(() => console.log("Successfully connected to the database"))
      .catch((e) => {
        console.error(e);
        setTimeout(connectWithRetry, 5000);
      });
};
connectWithRetry()

app.get("/",(req,res)=>{
    res.send("<h2>Hello there!!</h2>")
})
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users/",userRouter)
const port = process.env.port || 3000;

app.listen(port,()=> console.log(`listening on port ${port}`))