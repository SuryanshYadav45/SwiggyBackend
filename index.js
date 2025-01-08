const express= require('express')
const mongoose = require("mongoose");
const cors=require("cors")
const app=express();
const path =require("path")
require("dotenv").config({path:'./.env'})


app.use(cors());
app.use(express.json())

mongoose.connect(process.env.CONNECTSTRING).then(()=>
{
    console.log("database connected")
}).catch((error)=>
{
    console.log("error making connection",error)
})