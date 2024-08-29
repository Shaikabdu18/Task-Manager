const express = require("express");
const router = express.Router();
const taskController = require('../controllers/taskController');



//Create Post
router.post("/task",taskController.createTask)

//Get Post
router.get("/tasks",taskController.getAllTasks)


//Get Post by ID
router.get("/tasks/:id",taskController.getById)
/*
//Update Post
router.patch("/tasks:id",taskController)

//Delete Post
router.delete("/tasks:id",taskCotroller)
 */

module.exports=router;