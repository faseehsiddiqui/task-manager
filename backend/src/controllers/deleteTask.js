const Task = require("../models/Tasks/index");
const mongoose = require("mongoose");

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Task not found with the given id" });
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found with the given id" });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = deleteTask;
