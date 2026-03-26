import type { TPaginationData, TPositionData, TPositionPayload } from "@/shared/types";

export type TPaginationPayload = Pick<"page" | "perPage", TPaginationData> | null;

export type TPositionState = {
  data: TPositionData[];
  current: TPositionData | null;
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPositionStore = TPositionState & {
  fetchPositions: (data: TPaginationPayload) => Promise<void>;
  createPosition: (data: Omit<TPositionPayload, "price"> & { price: number }) => Promise<boolean>;
  updatePosition: (data: TPositionData) => Promise<boolean>;
  removePosition: (id: TPositionData["id"]) => Promise<boolean>;
  setCurrPosition: (id: TPositionData["id"] | null) => void;
}

export type TPositionApi = {
  fetchItems: (data: TPaginationPayload) => Promise<Omit<TPositionState, "isLoading" | "current">>;
  addItem: ({ item, arr, pagination }: { item: Omit<TPositionPayload, "price"> & { price: number }; arr: TPositionData[]; pagination: TPaginationData; }) => Promise<Omit<TPositionState, "isLoading" | "current"> & { success: boolean }>;
  updateItem: ({ item, arr }: { item: TPositionData; arr: TPositionData[]; }) => Promise<Pick<TPositionState, "data"> & { success: boolean }>;
  removeItem: ({ id, arr, pagination }: { id: TPositionData["id"]; arr: TPositionData[]; pagination: TPaginationData; }) => Promise<Omit<TPositionState, "isLoading" | "current"> & { success: boolean }>;
}

export type TQueryData = {
  sortby: Pick<"id" | "price" | "rating", TPositionData>;
  sortdir: "ASC" | "DESC";
}
