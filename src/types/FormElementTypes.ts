export interface TextInputProps {
  name: string;
  label: string;
  register: any;
  type?: string;
  placeholder?: string;
  errors?: any;
  handleFocus?: () => void;
  isPasswordStrength?: boolean;
  width?: string;
  labelInside?: boolean;
}

export interface ButtonProps {
  type: "button" | "submit" | "reset";
  label: string;
  buttonType?: string;
}

export interface BooleanInputProps {
  label: string;
  checked: boolean;
}

export interface DateInputProps {
  label: string;
  value: string;
}

export interface SelectInputProps {
  label: string;
  name: string;
  register: any;
  errors?: any;
  width?: string;
  options: Array<
    | {
        id: number;
        name: string;
      }
    | string
  >;
  labelInside?: boolean;
}

export interface ListInputProps {
  label: string;
  value: string[];
}
