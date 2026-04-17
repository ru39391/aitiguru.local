import type { ReactNode } from "react";
import type { ICard } from "@/shared/ui";

export interface IForm {
  action: (formData: FormData) => void | Promise<void>;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  isLogoVisible?: boolean;
  type?: "grid";
  mod?: ICard["type"];
}
