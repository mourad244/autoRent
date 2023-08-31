import React from "react";
import { ButtonProps } from "../types/FormElementTypes";

const ButtonSubmit: React.FC<ButtonProps> = ({ type, label, buttonType }) => {
  let buttonClass = "";

  switch (buttonType) {
    case "button":
      buttonClass = "bg-blue-500 hover:bg-blue-600";
      break;
    case "submit":
      buttonClass = "bg-green-500 hover:bg-green-600";
      break;
    case "reset":
      buttonClass = "bg-red-500 hover:bg-red-600";
      break;
    default:
      break;
  }

  return (
    <div className="form-group mt-3 flex justify-center items-center">
      <button
        type={type}
        className={`px-4 py-2 rounded text-white focus:outline-none ${buttonClass}`}
      >
        {label}
      </button>
    </div>
  );
};

export default ButtonSubmit;
