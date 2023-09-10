import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TextInputProps } from "../types/FormElementTypes";
import PasswordStrengthMeter from "./PasswordStrenghtMeter";
import { useDirection } from "../context/DirectionContext";
import { Input } from "@material-tailwind/react";

function formatDateToInput(dateString: string | Date) {
  let d = new Date(dateString);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [year, month, day].join("-");
}

function TextInput({
  name,
  type = "text",
  label,
  value,
  register,
  errors,
  setValue,
  trigger,
  handleFocus,
  isPasswordStrength = false,
  width = "w-full",
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { isRTL } = useDirection();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (name === "password" || name === "confirmPassword") {
      setPassword(e.target.value);
    }
    setValue(name, e.target.value);
    trigger(name);
  };

  let dateValue = "" as string | undefined;
  if (type === "date" && (typeof value === "string" || value instanceof Date))
    dateValue = formatDateToInput(value);
  const inputType =
    name === "password" || name === "confirmPassword"
      ? showPassword
        ? "text"
        : "password"
      : type;
  // Determine icon based on the input type
  let inputIcon = null;
  if (name === "password" || name === "confirmPassword") {
    inputIcon = showPassword ? <FiEyeOff /> : <FiEye />;
  }
  // if (name === "registryDate") console.log(dateValue);
  return (
    <div className="relative m-3 w-[200px] ">
      <Input
        type={inputType}
        {...register(name)}
        onChange={handleChange}
        onFocus={handleFocus}
        label={label}
        variant="outlined"
        width={width}
        error={!!errors[name]}
        icon={
          name === "password" || name === "confirmPassword" ? (
            <div
              onClick={() => setShowPassword(!showPassword)}
              className={`cursor-pointer`}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          ) : null
        }
      />

      {isPasswordStrength &&
        (name === "password" || name === "confirmPassword") && (
          <PasswordStrengthMeter password={password} />
        )}

      <div className="text-red-500 text-sm mt-1">{errors[name]?.message}</div>
    </div>
  );
}

export default TextInput;
