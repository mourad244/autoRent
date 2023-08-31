import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TextInputProps } from "../types/FormElementTypes";
import PasswordStrengthMeter from "./PasswordStrenghtMeter";
import { useDirection } from "../context/DirectionContext";

function TextInput({
  name,
  type = "text",
  label,
  register,
  errors,
  handleFocus,
  isPasswordStrength = false,
  width = "w-full",
  labelInside = false,
}: TextInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { isRTL } = useDirection();

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const inputType =
    name === "password" || name === "confirmPassword"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="relative m-3">
      {!labelInside && (
        <label htmlFor={name} className="block mb-2">
          {label}
        </label>
      )}

      <input
        type={inputType}
        {...register(name)}
        onChange={
          name === "password" || name === "confirmPassword"
            ? handlePassword
            : undefined
        }
        onFocus={handleFocus}
        className={`p-2 ${width} border rounded ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } bg-gray-100`}
        placeholder={labelInside ? label : undefined}
      />
      {password &&
        !errors[name] &&
        (name === "password" || name === "confirmPassword") && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className={`password-toggle-icon absolute inset-y-0 ${
              isRTL ? "left-2.5" : "right-2.5"
            } top-1.6 flex items-center cursor-pointer`}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        )}
      {isPasswordStrength &&
        (name === "password" || name === "confirmPassword") && (
          <PasswordStrengthMeter password={password} />
        )}

      <div className="text-red-500 text-sm mt-1">{errors[name]?.message}</div>
    </div>
  );
}

export default TextInput;
