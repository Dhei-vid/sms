import { useState, useMemo } from "react";

interface UsePaginationOptions<T> {
  data: T[];
  initialItemsPerPage?: number;
  itemsPerPage?: number; // Items to load per "Load More" click
}

export function usePagination<T>({
  data,
  initialItemsPerPage = 5,
  itemsPerPage = 5,
}: UsePaginationOptions<T>) {
  const [displayCount, setDisplayCount] = useState(initialItemsPerPage);

  const displayedData = useMemo(() => {
    return data.slice(0, displayCount);
  }, [data, displayCount]);

  const hasMore = displayCount < data.length;

  const loadMore = () => {
    setDisplayCount((prev) => Math.min(prev + itemsPerPage, data.length));
  };

  const reset = () => {
    setDisplayCount(initialItemsPerPage);
  };

  return {
    displayedData,
    hasMore,
    loadMore,
    reset,
    totalItems: data.length,
    displayedCount: displayedData.length,
  };
}

