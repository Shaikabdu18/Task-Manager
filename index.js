const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const taskRoutes = require("./src/routes/taskRoutes")

app.use(express.json())
app.use("/api",taskRoutes)

//Connect MongoDB

mongoose.connect(process.env.DB_URL);

const database = mongoose.connection;

database.on("error",(err)=>{
  console.log("Connection Error",err);
})

database.on("connected",()=>{
  console.log("Successfully DB Connected");
  
})

app.listen(3000,()=>{
  console.log("Server Starts at Port 3000");
  
})