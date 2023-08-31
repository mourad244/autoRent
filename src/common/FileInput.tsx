import React from "react";
interface FileInputProps {
  label: string;
  register: any;
  watch: any;
  name: string;
}
const FileInput: React.FC<FileInputProps> = ({
  label,
  register,
  watch,
  name,
}) => {
  const files = watch(name);
  let imageUrl: string | undefined = undefined;
  if (files && files.length > 0) {
    imageUrl = URL.createObjectURL(files[0]);
  }
  return (
    <div className="form-group">
      <input
        type="file"
        id="fileUpload" // add an id to link with the label
        {...register(name)}
        accept=".png"
        className="hidden" // hide the default file input
      />
      <label
        htmlFor="fileUpload"
        className="inline-block px-5 py-1 bg-[#598ed3] text-white rounded cursor-pointer text-lg transition duration-300 ease-in hover:bg-[#54749e]"
      >
        {label}
      </label>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Preview"
          className="max-h-[100px] max-w-[180px] block mx-auto mt-2"
        />
      )}
    </div>
  );
};

export default FileInput;
