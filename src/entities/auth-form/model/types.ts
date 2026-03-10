import type { ReactNode } from "react";

export interface IAuthForm {
  action: (data: FormData) => void;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}
