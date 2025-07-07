import {
  getFromLocalStorage,
  removeFromLocalStorage,
  setToLocalStorage,
} from "@/helpers";

import { useState } from "react";

export const useLocalStorage = <T>(key: string) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = getFromLocalStorage(key);

    return item ? JSON.parse(item) : null;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;

    setStoredValue(valueToStore);
    setToLocalStorage(key, JSON.stringify(valueToStore));
  };

  const removeValue = () => {
    removeFromLocalStorage(key);
  };

  return { storedValue, setValue, removeValue };
};
