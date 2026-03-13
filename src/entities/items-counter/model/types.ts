import type { TPaginationData } from "@/shared/types";

export interface IItemsCounter {
  page: TPaginationData["page"];
  perPage: TPaginationData["perPage"];
  totalCount: TPaginationData["totalCount"];
  totalPages: TPaginationData["totalPages"];
}
