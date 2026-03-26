export type TPositionData = Record<"id" | "price" | "rating", number> & Record<"img" | "name" | "category" | "vendor" | "article" | "createdAt" | "updatedAt", string>;

export type TPositionPayload = Omit<TPositionData, "id" | "img" | "price" | "rating" | "createdAt" | "updatedAt"> & Record<"price" | "rating", string>;
