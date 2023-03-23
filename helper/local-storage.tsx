import { useState, useEffect } from "react";

//TODO: fix me, currentlly not using

function getStorageValue(key: string, defaultValue: string) {
  // getting stored value
  useEffect(() => {
    const saved = localStorage.getItem(key);
    const initial = JSON.parse(saved || "");
    return initial;
  }, [key]);
  return defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
