import axios from "axios";

let API_URL = "http://localhost:5000";

// Fetch all tasks
export const fetchAllTasks = async (searchQuery, sortBy, sortOrder) => {
  // Construct params dynamically
  const params = {};

  if (searchQuery) {
    params.search = searchQuery; // Only include if searchQuery is not empty
  }
  if (sortBy) {
    params.sortBy = sortBy; // Only include if sortBy is not empty
  }
  if (sortOrder) {
    params.sortOrder = sortOrder; // Only include if sortOrder is not empty
  }

  // Send the request with dynamic params
  const res = await axios.get(`${API_URL}/tasks`, { params });
  return res.data;
};

// create new tasks
export const createTask = async (data) => {
  const res = await axios.post(`${API_URL}/create/task`, data);
  return res.data;
};

// update tasks
export const updateTask = async (id, data) => {
  const res = await axios.put(`${API_URL}/task/${id}`, data);
  return res.data;
};

// delete tasks
export const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/task/${id}`);
  return res.data;
};
