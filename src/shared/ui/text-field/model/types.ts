import type { ChangeEvent, FocusEvent, ReactNode } from "react";

export interface ITextFieldInput {
  defaultValue?: string;
  handleBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  name: string;
  type: "text" | "email" | "password";
}

export interface ITextField extends ITextFieldInput {
  handleFieldValue?: (input: HTMLInputElement | null) => void;
  children?: ReactNode;
  errorValue: string;
  icon?: ReactNode;
  isBtnVisible: boolean;
  label?: string;
}
