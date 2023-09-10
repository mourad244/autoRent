import React, { useState, useEffect } from "react";
import { SelectInputProps } from "../types/FormElementTypes";
import { Select, Option } from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
function SelectInput({
  name,
  label,
  register,
  errors,
  setValue,
  value,
  trigger,
  options = [],
  width = "w-full",
}: SelectInputProps) {
  const handleChange = (e: string) => {
    setValue(name, e);
    trigger(name);
  };
  const { countries } = useCountries();
  if (name === "country")
    options = countries.map((country: any) => country.name).sort();

  return (
    <div className={`relative m-3 ${width} `}>
      <Select
        {...register(name)}
        value={value}
        label={label}
        error={!!errors[name]}
        onChange={handleChange}
      >
        {options.map((option, index) => {
          if (typeof option === "string") {
            return (
              <Option key={index} value={option}>
                {option}
              </Option>
            );
          }

          return (
            <Option key={option.id} value={option.name}>
              {option.name}
            </Option>
          );
        })}
      </Select>
      {errors && errors[name] && (
        <div className="text-red-500 text-sm mt-1">{errors[name].message}</div>
      )}
    </div>
  );
}

/* function SelectInput({
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
    <div className="relative w-full min-w-[200px] h-10">
      {!labelInside && (
        <label htmlFor={name} className="block mb-2">
          {label}
        </label>
      )}

      <select
        {...register(name)}
        value={selectedValue}
        
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
 */
export default SelectInput;
