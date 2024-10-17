const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors')
const app = express();
const taskRoutes = require("./src/routes/taskRoutes")
const authRoutes = require("./src/routes/authRoutes")
const taskListRoutes = require("./src/routes/taskListRoutes")


app.use(express.json())
app.use(cors());
app.use("/api",taskRoutes)
app.use("/api",authRoutes)
app.use("/api",taskListRoutes)



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