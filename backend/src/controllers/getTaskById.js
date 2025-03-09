const Task = require("../models/Tasks/index");
const mongoose = require("mongoose");

// Function to get a task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from request params

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Task not found with the given id" });
    }

    // Find the task by ID
    const task = await Task.findById(id);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Return the task data as JSON
    return res
      .status(200)
      .json({ data: task, message: "Successfully retrieved task" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching task: " + error.message });
  }
};

module.exports = getTaskById;
