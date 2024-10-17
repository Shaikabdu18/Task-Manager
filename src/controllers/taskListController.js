const TaskList = require("../models/taskList")
const Task = require("../models/task")




exports.createList=async(req,res)=>{
  const{name}=req.body;
  try {
    const taskList = new TaskList ({
      name,
      user:req.user.id
    })
    await taskList.save()
    res.status(201).json({msg:"Task List Created"})
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

exports.getLists=async(req,res)=>{
  try {
    const taskList = await TaskList.find({user:req.user.id}).populate("user","username -_id")
    res.json({taskList})
  } catch (error) {
    res.status(500).json({msg:error.message})
    
  }
}

exports.getListById=async(req,res)=>{
  try {
    const {id} = req.params
    const list = await TaskList.findById(id)
    if(!list || list.user.toString() !== req.user.id){
      return res.status(404).json({msg:"Task Not found"})
    }
    res.status(200).json({list})
  } catch (error) {
    res.status(500).json({msg:error.message})
    
  }
}

exports.addTask=async(req,res)=>{
  try {
    const{id}=req.body;
    const taskList = await TaskList.findById(req.params.id);
    const task = await Task.findById(id)

    if(!taskList || taskList.user.toString()!== req.user.id){
      return res.status(404).json({msg:"TaskList Not Found"})
    }
    if(!task || task.user.toString()!== req.user.id){
      return res.status(404).json({msg:"Task Not Found"})
    }
    const taskExists = taskList.tasks.includes(id);
    if (taskExists) {
      return res.status(400).json({ msg: 'Task already exists in the list' });
    }
    taskList.tasks.push(task)
    await taskList.save()
    return res.status(201).json({taskList})
  } catch (error) {
    res.status(500).json({msg:error.message})
    
  }
}

exports.deleteTask = async (req, res) => {
  const { id } = req.body;
  
  try {
    const taskList = await TaskList.findById(req.params.id);

    if (!taskList || taskList.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Task list not found' });
    }

    const taskIndex = taskList.tasks.indexOf(id);
    if (taskIndex === -1) {
      return res.status(404).json({ msg: 'Task not found in the task list' });
    }

    taskList.tasks.splice(taskIndex, 1);
    await taskList.save();

    res.json({ msg: 'Task removed successfully', taskList });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
