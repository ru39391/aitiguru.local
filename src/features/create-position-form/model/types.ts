import type { TPositionPayload } from "@/shared/types";

export type TPositionTextValues = Omit<TPositionPayload, "price" | "rating">;
