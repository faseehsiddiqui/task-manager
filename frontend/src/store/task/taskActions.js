import { fetchAllTasks } from "../../services";

// Action types
export const GET_ALL_TASKS = "GET_ALL_TASKS";
export const START_LOADING_TASKS = "START_LOADING_TASKS";
export const ERROR_LOADING_TASKS = "ERROR_LOADING_TASKS";
export const STOP_LOADING_TASKS = "STOP_LOADING_TASKS";

// Action creator for fetching tasks
export const getAllTasks = (searchQuery = "",sortBy, sortOrder) => {
  return async (dispatch) => {
    // Dispatch a loading action to indicate that data is being fetched
    dispatch({ type: START_LOADING_TASKS });

    try {
      const tasks = await fetchAllTasks(searchQuery,sortBy, sortOrder);

      // Dispatch the tasks data once it's fetched
      dispatch({
        type: GET_ALL_TASKS,
        payload: tasks.data, // Set the payload with the fetched tasks
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      // Handle any errors if necessary
      dispatch({ type: ERROR_LOADING_TASKS });
    } finally {
      dispatch({ type: STOP_LOADING_TASKS });
    }
  };
};
