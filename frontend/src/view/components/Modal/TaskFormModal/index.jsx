import React, { useEffect } from "react";
// Components
import { Toasts } from "../../Toasts";
// store
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../../store/modal/modalActions";
import { getAllTasks } from "../../../../store/task/taskActions";
// services
import { createTask, updateTask } from "../../../../services";
// libs
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";

export const TaskFormModal = () => {
  const { task } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      status: task ? task.status : "pending",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      status: Yup.string()
        .oneOf(["pending", "completed"], "Invalid status")
        .required("Status is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (task) {
          const res = await updateTask(task._id, values);
          Toasts.success(res.message);
        } else {
          const res = await createTask(values);
          Toasts.success(res.message);
        }
        dispatch(getAllTasks());
      } catch (err) {
        Toasts.error(err.message);
      }
      handleClose();
    },
  });

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px] relative">
        <button className="absolute top-2 right-2" onClick={handleClose}>
          <AiOutlineClose size={24} color="black" />
        </button>
        <h2 className="text-2xl mb-4">{task ? "Edit Task" : "Create Task"}</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Task Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={!task}
              className="px-4 py-2 border border-gray-300 rounded-md w-full"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-red-500 text-sm">{formik.errors.status}</div>
            ) : null}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
