import type { ReactNode } from "react";

export interface IAuthForm {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}
