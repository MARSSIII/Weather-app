import { useMemo } from "react";
import { useDebounce } from "./useDebounce";
import { useFetchJson } from "./useFetchJson";

export const useSearchSuggestions = (searchTerm) => {
  const API_KEY = import.meta.env.VITE_OWM_API_KEY;

  const debouncedTerm = useDebounce(searchTerm, 500);

  const isValidSearch = debouncedTerm && debouncedTerm.trim().length > 2;

  const requestUrl = useMemo(() => {
    if (!isValidSearch) return null;

    return `https://api.openweathermap.org/geo/1.0/direct?q=${debouncedTerm}&limit=10&appid=${API_KEY}`;
  }, [debouncedTerm, isValidSearch, API_KEY]);

  const { data, loading, error } = useFetchJson(requestUrl, [debouncedTerm]);

  const uniqueSuggestions = useMemo(() => {
    if (!data) return [];

    const seen = new Set();
    return data
      .filter((item) => {
        const key = `${item.name}-${item.country}-${item.state || ""}`;

        if (seen.has(key)) {
          return false;
        }

        seen.add(key);

        return true;
      })
      .slice(0, 5);
  }, [data]);

  return {
    suggestions: uniqueSuggestions,
    loading,
    error,
    shouldFetch: isValidSearch,
  };
};
