import { useState } from "react";

export const useLocalStorage = (storageKey, initialValue) => {
  const [persistedValue, setPersistedValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;

    try {
      const item = window.localStorage.getItem(storageKey);

      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      console.warn(`Error reading localStorage key "${storageKey}":`, err);

      return initialValue;
    }
  });

  const setValue = (valueToStore) => {
    try {
      const valueToSave =
        valueToStore instanceof Function
          ? valueToStore(persistedValue)
          : valueToStore;

      setPersistedValue(valueToSave);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, JSON.stringify(valueToSave));
      }
    } catch (err) {
      console.error(`Error setting localStorage key "${storageKey}":`, err);
    }
  };

  return [persistedValue, setValue];
};
