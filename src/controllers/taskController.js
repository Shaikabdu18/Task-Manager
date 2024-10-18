const Task = require("../models/task")

//Create a new task
exports.createTask=async(req,res)=>{
  const {title,description,dueDate} = req.body;
  try {
    const task = await Task.create({
      user:req.user.id,
      title,
      description,
      dueDate
    })
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//Get all Task
exports.getAllTasks=async(req,res)=>{
  try {
    const tasks = await Task.find({user:req.user.id});
    if(tasks.length ===0) return res.status(200).json({msg:"No Task Created By You"})
    res.status(200).send(tasks);
    
  } catch (error) {
    res.status(400).send(error.message)
  }
}

//Get Task by ID
exports.getById=async(req,res)=>{
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if(!task|| task.user.toString()!== req.user.id){
      return res.status(404).send({error:"Task not Found"})
    }
    return res.status(200).send(task)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

//Update By ID
exports.updateTask=async(req,res)=>{
  try {
    const{id}=req.params;
    const task = await Task.findById(id)
    if(!task || task.user.toString()!==req.user.id){
      return res.status(404).json({msg:"No Task Found"})
    }
  
      task.title = req.body.title || task.title,
      task.description = req.body.description || task.description;
      task.completed = req.body.completed === undefined ? task.completed : req.body.completed;

    await task.save()

    res.status(201).json({msg:"Task Updated Successfully"})
    
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

//Delete task
exports.deleteTask=async(req,res)=>{
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if(!task || task.user.toString()!== req.user.id){
      return res.status(404).send({error:"Task Not Found"})
    }
    await task.deleteOne()
     return res.status(200).json({msg:"task Removed Successfully"})
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

// Search Task
exports.searchTasks = async (req, res) => {
  const { search } = req.query;

  try {
    const tasks = await Task.find({
      user: req.user.id,
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ "msg": error.message });
  }
};
