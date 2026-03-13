import type { TPaginationData } from "@/shared/types";

export interface IItemsCounter {
  isHidden: boolean;
  page: TPaginationData["page"];
  perPage: TPaginationData["perPage"];
  totalCount: TPaginationData["totalCount"];
  totalPages: TPaginationData["totalPages"];
}
