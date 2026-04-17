import type { ReactNode } from "react";

export interface IWrapper {
  aside?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  title: string;
}
