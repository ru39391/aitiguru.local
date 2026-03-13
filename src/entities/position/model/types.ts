import type { TPaginationData, TPositionData } from "@/shared/types";

export type TPositionState = {
  data: TPositionData[];
  pagination: TPaginationData | null;
  isLoading: boolean;
}

export type TPositionStore = TPositionState & {
  fetchPositions: () => Promise<void>;
}
