import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { TaskTable } from "./view/pages/TasksTable";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Provider store={store}>
      <TaskTable />
      <ToastContainer />
    </Provider>
  );
};

export default App;
