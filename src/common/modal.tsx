import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-40">
      <div className="fixed bg-white p-5  overflow-auto rounded-lg shadow-lg transform translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] z-50">
        <span
          className="absolute top-2 right-2 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;
