// Define action types
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

// Action creators for opening and closing the modal
export const openModal = (task) => ({
  type: OPEN_MODAL,
  payload: task,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});
