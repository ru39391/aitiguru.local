export type TPositionData = Record<"id" | "price" | "rating", number> & Record<"img" | "name" | "category" | "vendor" | "article" | "createdAt" | "updatedAt", string>;

export type TPositionPayload = Omit<"id" | "img" | "createdAt" | "updatedAt", "TPositionData"> & Record<"price" | "rating", string>;
