import { OPEN_MODAL, CLOSE_MODAL } from "./modalActions";

// Initial state of modal (task is null initially)
const initialState = {
  isOpen: false,
  task: null,
};

// Modal reducer to handle the opening and closing of the modal
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        task: action.payload, // Set the task to be edited
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        task: null, // Reset the task when closing
      };
    default:
      return state;
  }
};

export default modalReducer;
