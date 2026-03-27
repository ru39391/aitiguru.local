import type { TPaginationData, TPositionData, TPositionPayload } from "@/shared/types";

export type TPositionQuery = Partial<Pick<TPaginationData, "page" | "perPage">> & { search?: string; } | null;

export type TPositionState = {
  data: TPositionData[];
  current: TPositionData | null;
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPositionStore = TPositionState & {
  fetchPositions: (data: TPositionQuery) => Promise<void>;
  createPosition: (data: Omit<TPositionPayload, "price"> & { price: number }) => Promise<boolean>;
  updatePosition: (data: TPositionData) => Promise<boolean>;
  removePosition: (id: TPositionData["id"]) => Promise<boolean>;
  setCurrPosition: (id: TPositionData["id"] | null) => void;
}

export type TPositionApi = {
  fetchItems: (data: TPositionQuery) => Promise<Omit<TPositionState, "isLoading" | "current">>;
  addItem: ({ item, arr, pagination }: {
    item: Omit<TPositionPayload, "price"> & { price: number };
    arr: TPositionData[];
    pagination: TPositionState["pagination"];
  }) => Promise<Omit<TPositionState, "isLoading" | "current"> & { success: boolean }>;
  updateItem: ({ item, arr }: {
    item: TPositionData;
    arr: TPositionData[];
  }) => Promise<Pick<TPositionState, "data"> & { success: boolean }>;
  removeItem: ({ id, arr, pagination }: {
    id: TPositionData["id"];
    arr: TPositionData[];
    pagination: TPositionState["pagination"];
  }) => Promise<Omit<TPositionState, "isLoading" | "current"> & { success: boolean }>;
}

export type TQueryData = {
  sortby: keyof Pick<TPositionData, "id" | "price" | "rating">;
  sortdir: "ASC" | "DESC";
}
