const Task = require("../models/Tasks/index");
const mongoose = require("mongoose");

const updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Extract task ID from params
    const { title, description, status } = req.body; // Extract updated fields from body

    // Validate required fields
    if (!title || title.trim() === "") {
      return res
        .status(400)
        .json({ message: "Title is required and cannot be empty" });
    }
    if (!description || description.trim() === "") {
      return res
        .status(400)
        .json({ message: "Description is required and cannot be empty" });
    }
    if (!status || status.trim() === "") {
      return res
        .status(400)
        .json({ message: "Status is required and cannot be empty" });
    }

    // Validate status value
    if (!["pending", "completed"].includes(status)) {
      return res
        .status(400)
        .json({ message: 'Status must be either "pending" or "completed"' });
    }

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Task not found with the given id" });
    }

    // Update task by ID
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true } // Return the updated task
    );

    // If the task doesn't exist
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Return the updated task
    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask, // Optionally include the updated task in the response
    });
  } catch (error) {
    // Catch any errors and handle them
    console.error(error); // Log error for debugging
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = updateTask;
