import type { TPaginationData, TPositionData } from "@/shared/types";

export type TPaginationPayload = Pick<"page" | "perPage", TPaginationData> | null;

export type TPositionState = {
  data: TPositionData[];
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPositionStore = TPositionState & {
  fetchPositions: (data: TPaginationPayload) => Promise<void>;
}

export type TPositionApi = {
  fetchItems: (data: TPaginationPayload) => Promise<Omit<TPositionState, "isLoading">>;
}
