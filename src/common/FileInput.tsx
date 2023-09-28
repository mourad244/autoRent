import React, { useState } from "react";

interface FileInputProps {
  imageUrl?: string;
  label: string;
  register: any;
  // watch: any;
  name: string;
  trigger: any;
  width?: string;
  errors: any;
  setValue: any;
  value?: string; // 1. Add existingImage prop
}

function FileInput({
  imageUrl,
  label,
  register,
  // watch,
  value,
  name,
  trigger,
  width = "w-full",
  errors,
  setValue,
}: FileInputProps) {
  const [localImageUrl, setLocalImageUrl] = useState<string | undefined>(
    imageUrl
  ); // Use a local state
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      setLocalImageUrl(newImageUrl); // 2. Set the local state
      setValue(name, e.target.files[0]);
      trigger(name);
    }
  };
  return (
    <div className={`flex flex-col relative m-3 ${width} `}>
      {localImageUrl && (
        <img
          src={localImageUrl}
          alt="Preview"
          className={`w-${width} max-w-${width} block  mb-2`}
        />
      )}
      <input
        type="file"
        id="fileUpload"
        {...register(name)}
        accept=".png"
        className="hidden"
        onChange={handleUpload} // Add this for the handleChange effect
      />
      <label
        htmlFor="fileUpload"
        className="inline-block px-5 py-1 w-[200px] bg-[#598ed3] text-white rounded cursor-pointer text-lg transition duration-300 ease-in hover:bg-[#54749e]"
      >
        {label}
      </label>

      <div className="w-full text-red-500 text-sm mt-1">
        {errors[name]?.message}
      </div>
    </div>
  );
}

export default FileInput;
