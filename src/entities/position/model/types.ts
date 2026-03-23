import type { TPaginationData, TPositionData } from "@/shared/types";

export type TPaginationPayload = Pick<"page" | "perPage", TPaginationData> | null;

export type TPositionState = {
  data: TPositionData[];
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPositionStore = TPositionState & {
  fetchPositions: (data: TPaginationPayload) => Promise<void>;
  createPosition: (data: Partial<TPositionData>) => Promise<boolean>;
}

export type TPositionApi = {
  fetchItems: (data: TPaginationPayload) => Promise<Omit<TPositionState, "isLoading">>;
  addItem: ({ item, arr, pagination }: { item: Partial<TPositionData>; arr: TPositionData[]; pagination: TPaginationData; }) => Promise<Omit<TPositionState, "isLoading"> & { success: boolean }>;
}

export type TQueryData = {
  sortby: Pick<"id" | "price" | "rating", TPositionData>;
  sortdir: "ASC" | "DESC";
}
