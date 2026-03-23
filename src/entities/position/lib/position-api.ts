import { apiHandler } from "@/shared/api";
import { StorageHandler } from "@/shared/utils";
import { routes } from "@/shared/constants";
import { QUERY_KEY } from "@/shared/constants";
import type { TPositionApi } from "../model/types";
import type { TPositionData } from "@/shared/types";

export const positionApi: TPositionApi = {
  fetchItems: async (payload = null) => {
    const storageData = StorageHandler.getData(QUERY_KEY);
    const query = payload && storageData ? {...payload, ...storageData} : (payload || storageData);
    const url = `${routes.api.positions}${query
      ? Object.entries(query).reduce(
        (acc, [key, value], index) => {
          const str = `${index !== 0 ? "&" : ""}${key}=${value}`;

          return `${acc}${str}`;
        }
        , "?"
      )
      : ""
    }`;
    const { data: { data, ...pagination } } = await apiHandler.fetch<TPositionData[]>(url);

    return Array.isArray(data) ? { data, pagination } : { data: [], pagination: null };
  },
  addItem: async ({ item, arr, pagination }) => {
    const { data } = await apiHandler.create<Partial<TPositionData>, TPositionData>(routes.api.positions, item);
    const { success, ...position } = data as TPositionData & { success: boolean };

    return {
      data: success ? [position, ...arr] : arr,
      pagination: {
        ...pagination,
        perPage: success ? pagination.perPage + 1 : pagination.perPage,
        totalCount: success ? pagination.totalCount + 1 : pagination.totalCount
      },
      success
    };
  },
}
