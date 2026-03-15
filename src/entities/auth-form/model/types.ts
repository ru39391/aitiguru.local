import type { ReactNode } from "react";

export interface IAuthForm {
  action: (formData: FormData) => void | Promise<void>;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}
