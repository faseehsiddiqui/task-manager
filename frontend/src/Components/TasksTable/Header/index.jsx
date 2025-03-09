import React from "react";
// store
import { openModal } from "../../../store/modal/modalActions";
// libs
import { useDispatch } from "react-redux";

export const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex w-full justify-center">
      <div className="w-full flex justify-between items-center py-6">
        <p className="text-2xl font-bold">Task Management</p>
        <div>
          <button
            onClick={() => dispatch(openModal())} // Open modal to create a task
            className="border-[#005C89] rounded-lg border-2 text-[#005C89] px-4 py-2 rounded mb-6 hover:bg-[#005C89] hover:text-white transition-colors duration-300"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};
