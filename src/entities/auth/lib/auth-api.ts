/*
import { apiHandler } from "@/shared/api";
import { routes } from "@/shared/constants";
import type { TPositionApi } from "../model/types";
import type { TPositionData } from "@/shared/types";

export const positionApi: TPositionApi = {
  fetchItems: async (payload = null) => {
    const url = `${routes.api.positions}${payload
      ? Object.entries(payload).reduce(
        (acc, [key, value], index) => {
          const str = `${index !== 0 ? "&" : ""}${key}=${value}`;

          return `${acc}${str}`;
        }
        , "?"
      )
      : ""
    }`;
    const { data: { data, ...pagination } } = await apiHandler.fetch<TPositionData[]>(url);

    return { data, pagination };
  }
}
*/
