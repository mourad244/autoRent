import React from "react";

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const calculateStrength = (password: string) => {
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 7) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = calculateStrength(password);

  const barStyles = [
    { width: "0%", backgroundColor: "#f00" },
    { width: "20%", backgroundColor: "#f00" },
    { width: "40%", backgroundColor: "#ff8000" },
    { width: "60%", backgroundColor: "#ff8000" },
    { width: "80%", backgroundColor: "#ffd700" },
    { width: "100%", backgroundColor: "#4caf50" },
  ][strength];

  return (
    <div className="w-full h-1 bg-gray-300">
      <div
        style={barStyles}
        className="h-full transition-width duration-300 ease-in-out"
      />
    </div>
  );
};

export default PasswordStrengthMeter;
