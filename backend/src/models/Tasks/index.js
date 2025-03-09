const mongoose = require("mongoose");

// Define the user schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model based on the schema
const Task = mongoose.model("Tasks", taskSchema);

module.exports = Task;
