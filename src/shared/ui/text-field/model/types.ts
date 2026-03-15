import type { ReactNode } from "react";

export interface ITextField {
  children?: ReactNode;
  icon?: ReactNode;
  isRequired?: boolean;
  label?: string;
  defaultValue?: string;
  name: string;
  type: "text" | "email" | "password";
}
