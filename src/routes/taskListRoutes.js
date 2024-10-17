const express = require("express");
const router = express.Router()
const verifyToken = require("../verifyToken")
const taskListController = require("../controllers/taskListController") 

router.post("/lists",verifyToken,taskListController.createList)
router.get("/lists",verifyToken,taskListController.getLists)
router.get("/lists/:id",verifyToken,taskListController.getListById)
router.get("/lists/:id",verifyToken,taskListController.getListById)
router.post("/lists/:id/tasks",verifyToken,taskListController.addTask)
router.delete("/lists/:id/tasks",verifyToken,taskListController.deleteTask)




module.exports = router;