const express = require("express");
const router = express.Router();

const createTask = require("../controllers/task-controllers/task.post.js");
const allTasks = require("../controllers/task-controllers/task.get.js");
const changeTask = require("../controllers/task-controllers/task.patch.js");
const deleteTask = require("../controllers/task-controllers/task.delete.js");

router.post("/task", createTask);
router.get("/tasks", allTasks);
router.patch("/task/:id", changeTask);
router.delete("/task/:id", deleteTask);

module.exports = router;
