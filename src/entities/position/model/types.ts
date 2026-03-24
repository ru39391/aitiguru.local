import type { TPaginationData, TPositionData } from "@/shared/types";

export type TPaginationPayload = Pick<"page" | "perPage", TPaginationData> | null;

export type TPositionState = {
  data: TPositionData[];
  current: TPositionData | null;
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPositionStore = TPositionState & {
  fetchPositions: (data: TPaginationPayload) => Promise<void>;
  createPosition: (data: Partial<TPositionData>) => Promise<boolean>;
  removePosition: (id: TPositionData["id"]) => Promise<boolean>;
  setCurrPosition: (id: TPositionData["id"] | null) => void;
}

export type TPositionApi = {
  fetchItems: (data: TPaginationPayload) => Promise<Omit<TPositionState, "isLoading">>;
  addItem: ({ item, arr, pagination }: { item: Partial<TPositionData>; arr: TPositionData[]; pagination: TPaginationData; }) => Promise<Omit<TPositionState, "isLoading" | "current"> & { success: boolean }>;
  removeItem: ({ id, arr, pagination }: { id: TPositionData["id"]; arr: TPositionData[]; pagination: TPaginationData; }) => Promise<Omit<TPositionState, "isLoading" | "current"> & { success: boolean }>;
}

export type TQueryData = {
  sortby: Pick<"id" | "price" | "rating", TPositionData>;
  sortdir: "ASC" | "DESC";
}
