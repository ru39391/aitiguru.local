import type { TPaginationData } from "@/shared/types";

export interface IPagination {
  handleClick: (data: Pick<TPaginationData, "page" | "perPage">) => void;
  isHidden?: boolean;
  page: TPaginationData["page"];
  perPage: TPaginationData["perPage"];
  totalCount: TPaginationData["totalCount"];
  totalPages: TPaginationData["totalPages"];
}
