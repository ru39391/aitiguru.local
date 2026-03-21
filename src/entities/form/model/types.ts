import type { ReactNode } from "react";

export interface IForm {
  action: (formData: FormData) => void | Promise<void>;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  isLogoVisible?: boolean;
}
