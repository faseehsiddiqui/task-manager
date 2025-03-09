import React, { useEffect, useState } from "react";
// Components
import { Toasts } from "../../components/Toasts";
import { TaskFormModal } from "../../components/Modal";
import { Header } from "../../../Components/TasksTable";
import { TaskPopover } from "../../components/TaskPopover";
// store
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../store/modal/modalActions";
import { getAllTasks } from "../../../store/task/taskActions";
// utils
import { formatDate, formatFieldName, useDebounce } from "../../../utils";
// services
import { deleteTask } from "../../../services";
// libs
import { FiMoreHorizontal } from "react-icons/fi";
import { TailSpin } from "react-loader-spinner";

export const TaskTable = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const {
    tasks = [],
    fields = [],
    totalItems = 0,
    stateIs,
  } = useSelector((state) => state.task || {});

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (event, taskId) => {
    setAnchorEl(event.currentTarget);
    setSelectedTaskId(taskId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedTaskId(null);
  };

  const handleEdit = (task) => {
    dispatch(openModal(task));
  };

  const handleDelete = async (task) => {
    try {
      const res = await deleteTask(task._id);
      Toasts.success(res.message);
      dispatch(getAllTasks());
    } catch (err) {
      Toasts.error(err.message);
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  useEffect(() => {
    dispatch(getAllTasks(debouncedSearchQuery, sortBy, sortOrder));
  }, [dispatch, debouncedSearchQuery, sortBy, sortOrder]);

  return (
    <div className="flex justify-center">
      <div className="w-11/12">
        <Header />
        <div className="mb-6 w-full flex justify-end">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search tasks..."
            className="border-2 border-[#005C89] p-2 rounded w-[300px]"
          />
        </div>
        <div>
          <p>
            {totalItems} {totalItems > 1 ? "tasks" : "task"}
          </p>
        </div>
        <div className="max-h-[80vh] overflow-y-auto overflow-hidden shadow-lg rounded-lg py-6">
          {stateIs === "Pending" ? (
            <div className="loader min-h-[45vh] justify-center items-center flex w-full">
              <TailSpin
                height="50"
                width="50"
                color="#005C89"
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                wrapperClass="tailspin-loader"
                visible={true}
              />
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-[#F1F1F1]">
                <tr>
                  {fields.map((field, index) => (
                    <th
                      key={index}
                      className="py-2 px-4 border-b text-left font-semibold text-[#333] capitalize cursor-pointer"
                      onClick={() => handleSort(field)}
                    >
                      {formatFieldName(field)}
                      {sortBy === field && (
                        <span
                          className={`ml-2 ${sortOrder === "asc" ? "↑" : "↓"}`}
                        ></span>
                      )}
                    </th>
                  ))}
                  <th className="py-2 px-4 border-b text-left"></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-[#f9f9f9]">
                    {fields.map((field, index) => {
                      if (field === "createdAt") {
                        return (
                          <td key={index} className="py-2 px-4 border-b">
                            {formatDate(task[field])}
                          </td>
                        );
                      } else {
                        return (
                          <td
                            key={index}
                            className={`py-2 px-4 border-b max-w-[200px] truncate overflow-hidden text-ellipsis whitespace-nowrap ${
                              field === "status" && "capitalize"
                            }`}
                          >
                            {task[field]}
                          </td>
                        );
                      }
                    })}
                    <td className="py-2 px-4 border-b">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={(event) => handleClick(event, task._id)}
                          className="bg-gray-200 text-black px-3 py-1 rounded-full focus:outline-none"
                        >
                          <FiMoreHorizontal />
                        </button>
                        <TaskPopover
                          anchorEl={anchorEl}
                          open={selectedTaskId === task._id}
                          task={task}
                          handleClose={handleClose}
                          handleEdit={handleEdit}
                          handleDelete={handleDelete}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {isOpen && <TaskFormModal />}
      </div>
    </div>
  );
};
