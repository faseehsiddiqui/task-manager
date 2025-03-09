const express = require("express");
const createTask = require("../controllers/createTask");
const getAllTasks = require("../controllers/getAllTasks");
const updateTask = require("../controllers/updateTask");
const deleteTask = require("../controllers/deleteTask");
const getTaskById = require("../controllers/getTaskById");

const router = express.Router();

// routes for handling task operations
router.post("/create/task", createTask);
router.put("/task/:id", updateTask);
router.delete("/task/:id", deleteTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);

module.exports = router;
