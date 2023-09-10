import React from "react";
import { DateInputProps } from "../types/FormElementTypes"; // You might need to create this type
import { useDirection } from "../context/DirectionContext";
import { Input } from "@material-tailwind/react";

function DateInput({
  name,
  label,
  register,
  errors,
  handleFocus,
  width = "w-full",
  value, // added a defaultValue prop for pre-selected date
}: DateInputProps) {
  const { isRTL } = useDirection();
  return (
    <div className="relative m-3 w-[200px] ">
      <Input
        type="date"
        {...register(name)}
        onFocus={handleFocus}
        label={label}
        variant="outlined"
        width={width}
        error={!!errors[name]}
        defaultValue={value}
      />

      <div className="text-red-500 text-sm mt-1">{errors[name]?.message}</div>
    </div>
  );
}

export default DateInput;
