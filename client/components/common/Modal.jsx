import React from "react";
import { MdClose } from "react-icons/md";

export const Modal = ({ isVisible, onClose, children, message }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center sm:top-1/2 sm:left-1/3 sm:-translate-x-1/4 sm:-translate-y-1/2"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="sm:w-[800px] mx-auto flex flex-col">
        <button
          onClick={() => onClose()}
          className="bg-[#292D33] flex justify-end rounded-t-lg w-full pr-12"
        >
          <div className="text-black font-bold p-1 m-4 bg-white hover:bg-white/80 rounded-full text-2xl transition-colors">
            <MdClose />
          </div>
        </button>
        <div className="bg-[#292D33] text-white pt-4 pb-12 px-16 rounded-b-lg">
          {message}
          {children}
        </div>
      </div>
    </div>
  );
};
