import React, { useState } from "react";
import { SelectInputProps } from "../types/FormElementTypes";

function SelectInput({
  name,
  label,
  register,
  errors,
  options = [],
  width = "w-full",
  labelInside = false,
}: SelectInputProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const [isPlaceholderSelected, setIsPlaceholderSelected] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentValue = e.target.value;

    setIsPlaceholderSelected(currentValue === "");
    setSelectedValue(currentValue);
    register(name).onChange(e);
  };

  return (
    <div className="relative m-3">
      {!labelInside && (
        <label htmlFor={name} className="block mb-2">
          {label}
        </label>
      )}

      <select
        {...register(name)}
        value={selectedValue}
        className={`p-2 ${width} border rounded ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } bg-gray-100
        ${isPlaceholderSelected ? "text-gray-500" : "text-black"}
        `}
        onChange={handleChange}
      >
        <option value="" className="hidden" disabled>
          {labelInside ? `Select ${label}...` : ""}
        </option>
        <option value=""></option>
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          }
          return (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>

      <div className="text-red-500 text-sm mt-1">{errors[name]?.message}</div>
    </div>
  );
}

export default SelectInput;
