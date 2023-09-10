export interface TextInputProps {
  name: string;
  label: string;
  register: any;
  value: string | number | Date | null;
  type?: string;
  placeholder?: string;
  errors?: any;
  handleFocus?: () => void;
  isPasswordStrength?: boolean;
  width?: string;
  trigger?: any;
  labelInside?: boolean;
  setValue?: any;
}

// export interface DateInputProps {
//   name: string;
//   label: string;
//   register: any; // You might want to make this more specific
//   errors: Record<string, any>; // adjust the type as per your needs
//   handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
//   width?: string;
//   value: Date | null;
// }
export interface ButtonProps {
  type: "button" | "submit" | "reset";
  label: string;
  buttonType?: string;
}

export interface BooleanInputProps {
  label: string;
  checked: boolean;
}

export interface SelectInputProps {
  label: string;
  options: Array<
    | {
        id: number;
        name: string;
      }
    | string
  >;
  trigger?: any;
  width?: string;
  value: string;
  name: string;
  register: any;
  errors?: any;
  setValue?: any;
  // labelInside?: boolean;
}

export interface ListInputProps {
  label: string;
  value: string[];
}
