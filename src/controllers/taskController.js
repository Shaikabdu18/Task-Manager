const Task = require("../models/task")

//Create a new task
exports.createTask=async(req,res)=>{
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error);
  }
}

//Get all Task
exports.getAllTasks=async(req,res)=>{
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
    
  } catch (error) {
    res.status(400).send(error)
  }
}

//Get Task by ID
exports.getById=async(req,res)=>{
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if(!task){
      res.status(404).send({error:"Task not Found"})
    }
    res.status(200).send(task)
  } catch (error) {
    res.status(500).send(error)
  }
}

//Update By ID
