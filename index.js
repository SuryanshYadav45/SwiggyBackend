const express= require('express')
const mongoose = require("mongoose");
const cors=require("cors")
const app=express();
const path =require("path")
const authRouter= require('./router/authRouter')
const restaurantRouter = require('./router/restaurantRouter')
require("dotenv").config({path:'./.env'})
const bodyParser = require('body-parser');
const http = require('http');

app.use(cors());
app.use(express.json())
app.use(bodyParser.json());

mongoose.connect(process.env.CONNECTSTRING).then(()=>
{
    console.log("database connected")
}).catch((error)=>
{
    console.log("error making connection",error)
})

app.use('/auth',authRouter)
app.use('/restuarant',restaurantRouter)

const server = http.createServer(app);
server.listen(4000, () => {
    console.log("server started at the specified port ");
});