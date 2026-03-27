import { StorageHandler } from "@/shared/utils";
import { QUERY_KEY } from "@/shared/constants";
import { usePositionStore, type TQueryData } from "@/entities/position";

export const sortPositions = async (sortby: TQueryData["sortby"]): Promise<TQueryData | null> => {
  const storageData = StorageHandler.getData<TQueryData>(QUERY_KEY);
  const { sortdir } = storageData || { sortdir: "DESC" };
  const { data: positions } = usePositionStore.getState();
  const currSortdir = sortdir === "DESC" ? "ASC" : "DESC";

  const { success, data } = await StorageHandler.handleData({
    sortby,
    sortdir: storageData ? currSortdir : sortdir
  }, QUERY_KEY);

  if(!success || !data) {
    return null;
  }

  const sortedPositions = [...positions].sort((a, b) => {
    const aValue = a[sortby];
    const bValue = b[sortby];

    return data.sortdir === "ASC" ? aValue - bValue : bValue - aValue;
  });

  usePositionStore.setState({ data: sortedPositions  });

  return data;
}
