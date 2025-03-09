const Task = require("../models/Tasks/index");

// Function to get all tasks from the database
const getAllTasks = async (req, res) => {
  try {
    const { search, sortBy, sortOrder } = req.query; // Accept sortBy and sortOrder parameters
    let query = {};
    let sort = {}; // Default sorting

    // If there's a search query, search only in the 'title' field
    if (search && search !== "") {
      const regex = new RegExp(search, 'i'); // Create a case-insensitive regex pattern
      query = { title: { $regex: regex } }; // Search only in the 'title' field
    }

    // Default sorting by createdAt in descending order (newest first)
    if (sortBy && sortOrder) {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1; // Sorting in ascending or descending order
    } else {
      sort.createdAt = -1; // Default sort by createdAt if no sortBy is specified
    }

    // Fetch tasks from the database based on the query (search, status, and sort)
    const tasks = await Task.find(query).sort(sort); // Sort dynamically based on the provided sortBy

    const fields = ["title", "description", "status", "createdAt"];
    
    // Construct the response object
    const response = {
      fields: fields,
      tasks: tasks,
      totalItems: tasks.length,
    };

    // Return the data as a JSON response
    return res.status(200).json({ data: response, message: "Successfully retrieved data" });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching tasks: " + error.message });
  }
};

module.exports = getAllTasks;
