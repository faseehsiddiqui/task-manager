const Task = require("../models/Tasks/index");

const createTask = async (req, res) => {
  console.log(req.body, "body data");

  try {
    const { title, description, status } = req.body;

    // Validate required fields and check if they are non-empty
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

    // Check if status is either "pending" or "completed"
    if (!["pending", "completed"].includes(status)) {
      return res
        .status(400)
        .json({ message: 'Status must be either "pending" or "completed"' });
    }

    // Create a new task instance
    const newTask = new Task({
      title,
      description,
      status,
    });

    // Save the task to the database
    const task = await newTask.save();
    console.log(task, "task");

    // Return a success response
    res.status(201).json({
      message: "Task created successfully",
      id: task._id,
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

module.exports = createTask;
