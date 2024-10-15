const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyToken = require("../verifyToken")



//Create Post
router.post("/tasks",verifyToken,taskController.createTask)

//Get Post
router.get("/tasks",verifyToken,taskController.getAllTasks)

//Get Post by ID
router.get("/tasks/:id",verifyToken,taskController.getById)

//Update Post
router.patch("/tasks/:id",verifyToken,taskController.updateTask)

//Delete Post
router.delete("/tasks/:id",verifyToken,taskController.deleteTask)


module.exports=router;