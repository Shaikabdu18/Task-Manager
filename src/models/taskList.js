const mongoose = require("mongoose")

const taskList = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  tasks:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Task",
  }],
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }
})

module.exports = mongoose.model("TaskList",taskList)