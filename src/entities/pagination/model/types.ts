import type { TPaginationData } from "@/shared/types";

export interface IPagination {
  handleClick: (data: Pick<"page" | "perPage", TPaginationData>) => void;
  page: TPaginationData["page"];
  perPage: TPaginationData["perPage"];
  totalCount: TPaginationData["totalCount"];
  totalPages: TPaginationData["totalPages"];
}
