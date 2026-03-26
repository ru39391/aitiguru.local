import { type TPositionData } from "@/shared/types";

export type TPositionsDir = "ASC" | "DESC" | null;

export type THandlePositions = {
  handleRemoveItem: (id: TPositionData["id"]) => Promise<void>;
}
