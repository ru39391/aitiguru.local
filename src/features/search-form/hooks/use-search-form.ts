import { useEffectEvent, useEffect, useState, type ChangeEvent } from "react";
import { StorageHandler } from "@/shared/utils";
import { QUERY_KEY } from "@/shared/constants";
import { useDebounce } from "@/shared/hooks";
import { usePositionStore, type TQueryData } from "@/entities/position";

export const useSearchForm = (): {
  searchValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
} => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { fetchPositions, data: positions } = usePositionStore();

  const handleStorageData = (): TQueryData => {
    const storageData = StorageHandler.getData(QUERY_KEY);

    if(!storageData) return {};

    const { sortby, sortdir } = storageData;

    return {
      ...( sortby && { sortby } ),
      ...( sortdir && { sortdir } )
    };
  }

  const updatePositionsList = () => {
    if(searchValue.length > 0) return;

    const queryData = handleStorageData();

    if(Object.values(queryData).length > 0) {
      StorageHandler.handleData<TQueryData>(queryData, QUERY_KEY);
    } else {
      StorageHandler.removeData(QUERY_KEY);
    }

    fetchPositions(null);
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    const queryData = handleStorageData();

    await StorageHandler.handleData({ ...queryData, search: query }, QUERY_KEY);

    await fetchPositions({ search: query });
  };

  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value } = event.target as HTMLInputElement;

    setSearchValue(value);
    debouncedSearch(value);
  };

  const resetSearchValue = useEffectEvent(() => {
    const queryData = StorageHandler.getData(QUERY_KEY);

    if(queryData === null) setSearchValue("");
  });

  useEffect(() => {
    updatePositionsList();
  }, [searchValue]);

  useEffect(() => {
    resetSearchValue();
  }, [positions]);

  return {
    searchValue,
    handleChange
  }
}
