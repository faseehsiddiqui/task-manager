import { ERROR_LOADING_TASKS, GET_ALL_TASKS, START_LOADING_TASKS, STOP_LOADING_TASKS } from "./taskActions";

// Initial state with a loading property
const initialState = {
  fields: [],
  tasks: [],
  totalItems: 0,
  stateIs: "Idle" | "Pending" | "Error", // To track loading state
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING_TASKS:
        return {
          ...state,
          stateIs: "Pending",
        };
  
      case ERROR_LOADING_TASKS:
        return {
          ...state,
          stateIs: "Error",
        };
  
      case STOP_LOADING_TASKS:
        return {
          ...state,
          stateIs: "Idle",
        };
    case GET_ALL_TASKS:
      return {
        ...state,
        fields: action.payload.fields,
        tasks: action.payload.tasks,
        totalItems: action.payload.totalItems,
      };
      
    default:
      return state;
  }
};

export default taskReducer;
