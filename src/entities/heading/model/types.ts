import type { ReactNode } from "react";

export interface IHeading {
  aside?: ReactNode;
  title: string;
  children: ReactNode;
}
