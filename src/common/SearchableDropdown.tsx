import React from "react";
import Select from "react-select";

type SearchableDropdownProps = {
  name: string;
  label: string;
  options: Array<
    | {
        id: number;
        name: string;
      }
    | string
  >;
  value: string | null;
  onChange?: (
    /*value:  OptionType | null */
    name: string,
    value: string
  ) => void;
  error?: string;
  width?: string;
};
const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  width = "w-full",
}) => {
  const handleChange = (selectedOption: any) => {
    if (onChange && selectedOption) {
      onChange(name, selectedOption.value);
    }
  };
  let newOptions = options.map((option, index) => {
    if (typeof option === "string") {
      return {
        value: option,
        label: option,
      };
    } else {
      return {
        value: option.name,
        label: option.name,
      };
    }
  });
  const selectedValue = newOptions.find((opt) => opt.value === value);

  return (
    <div className={`${width} m-3 `}>
      <label htmlFor={name} className="block mb-2">
        {label}
      </label>
      <Select
        id={name}
        value={selectedValue}
        onChange={handleChange}
        isSearchable
        options={newOptions}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default SearchableDropdown;
