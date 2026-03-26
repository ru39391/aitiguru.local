import { useEffect, useState, type ChangeEvent } from "react";
import { useDebounce } from "@/shared/hooks";
import { usePositionStore } from "@/entities/position";

export const useSearchForm = (): {
  searchValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
} => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { fetchPositions } = usePositionStore();

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    await fetchPositions({ search: query });
  };

  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value } = event.target as HTMLInputElement;

    setSearchValue(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if(!searchValue) fetchPositions(null);
  }, [searchValue]);

  return {
    searchValue,
    handleChange
  }
}
