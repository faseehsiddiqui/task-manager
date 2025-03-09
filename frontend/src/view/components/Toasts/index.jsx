import React from "react";
import { toast } from "react-toastify";
import { FiInfo } from "react-icons/fi"; // Importing icons from react-icons

const Success = ({ message }) => {
  const handleCloseToast = () => {
    toast.dismiss();
  };

  return (
    <div
      id="successToast"
      className="flex justify-start items-center w-full relative gap-4 px-2 py-5 bg-tertiaryLight"
      style={{ boxShadow: "0px 1px 0px 0 rgba(2,13,36,0.12)" }}
    >
      <div className="flex justify-start items-center px-2 flex-grow relative py-0.5">
        <p
          id="successToastMessage"
          className="flex-grow w-24 text-[15px] text-left text-secondaryMid toaster_messages_be capitalize"
        >
          {message}
        </p>
      </div>
    </div>
  );
};

const Error = ({ message }) => {
  const handleCloseToast = () => {
    toast.dismiss();
  };
  return (
    <div
      id="errorToast"
      className="flex justify-start items-center w-full relative gap-4 px-2 py-5 bg-accent_1Light"
      style={{ boxShadow: "0px 1px 0px 0 rgba(2,13,36,0.12)" }}
    >
      <FiInfo size={24} fill="#BF200B" />
      <div className="flex justify-start items-center px-2 flex-grow relative py-0.5">
        <p
          id="errorToastMessage"
          className="flex-grow w-24 text-[15px] text-left text-secondaryMid toaster_messages_be capitalize"
        >
          {message}
        </p>
      </div>
    </div>
  );
};

const showToast = (Component, message, position) => {
  toast(<Component message={message} />, { position: position || "top-right" });
};

const toasts = {
  success: (message, position) => showToast(Success, message, position),
  error: (message, position) => showToast(Error, message, position),
};

export { toasts as Toasts };
