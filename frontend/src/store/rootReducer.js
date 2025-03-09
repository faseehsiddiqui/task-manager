import { combineReducers } from "redux";
import modalReducer from "./modal/modalReducer";
import taskReducer from "./task/taskReducer";

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  modal: modalReducer,
  task: taskReducer, // Add modalReducer to the root reducer
});

export default rootReducer;
