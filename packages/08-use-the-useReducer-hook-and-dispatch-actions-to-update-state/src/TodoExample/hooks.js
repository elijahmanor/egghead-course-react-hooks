import { useState, useEffect } from "react";

export const useKeyDown = (map, defaultValue) => {
  let [match, setMatch] = useState(defaultValue);
  useEffect(() => {
    const handleKey = ({ key }) => {
      setMatch(prevMatch =>
        Object.keys(map).some(k => k === key) ? map[key] : prevMatch
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  return [match, setMatch];
};

export const useLocalStorage = (key, defaultValue, callback) => {
  const initialValue = () => {
    const valueFromStorage = JSON.parse(
      window.localStorage.getItem(key) || JSON.stringify(defaultValue)
    );
    if (callback) {
      callback(valueFromStorage);
    }
    return valueFromStorage;
  };
  const [storage, updateStorage] = useState(initialValue);
  useEffect(
    () => {
      window.localStorage.setItem(key, JSON.stringify(storage));
    },
    [storage]
  );
  return [storage, updateStorage];
};
