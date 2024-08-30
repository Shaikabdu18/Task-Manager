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
exports.updateTask=async(req,res)=>{
  const {id}=req.params;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title","description","completed"];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
  if(!isValidOperation){
    res.status(404).send({error:"Invalid Updates"})
  }
  try {
    const task = await Task.findById(id)
    if(!task){
      res.status(404).send({error:"Task is not found"})
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(200).send(task)
    
  } catch (error) {
    res.status(400).send(error)
  }
}

//Delete task
exports.deleteTask=async(req,res)=>{
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if(!task){
      res.status(404).send({error:"Task Not Found"})
    }
      res.status(200).send(task)
  } catch (error) {
    res.status(500).send(error)
  }
}