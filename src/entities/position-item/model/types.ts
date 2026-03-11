import type { ReactNode } from "react";
import type { TPositionData } from "@/shared/types";

export interface IPositionItem {
  id: string;
  img: TPositionData["img"];
  name: TPositionData["name"];
  category: TPositionData["category"];
  children: ReactNode;
  classNames: Record<string, string>;
  vendor: TPositionData["vendor"];
  article: TPositionData["article"];
  rating: TPositionData["rating"];
  price: TPositionData["price"];
}
