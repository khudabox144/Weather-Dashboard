import { useEffect, useState } from "react";

const useLocalStorage = (storageKey, defaultValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(storageKey);
      return item && item !== "undefined" ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch {}
  }, [value, storageKey]);

  return [value, setValue];
};

export default useLocalStorage;
