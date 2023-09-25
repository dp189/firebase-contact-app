import React from "react";
import { createPortal } from "react-dom";
import { AiFillCloseCircle } from "react-icons/ai";

const Modal = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="h-screen w-screen backdrop-blur absolute top-0 z-40 grid place-items-center">
          <div className="relative z-50 m-auto min-h-[200px] top-0 min-w-[50%] bg-white p-4">
            <div className="flex justify-end">
              <AiFillCloseCircle
                className="text-2xl self-end text-[#808080]"
                onClick={onClose}
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
