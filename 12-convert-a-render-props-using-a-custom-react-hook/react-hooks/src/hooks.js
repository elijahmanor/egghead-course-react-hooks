import { useState, useEffect, useMemo, useRef, useReducer } from "react";

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

export const useTodosWithLocalStorage = defaultValue => {
  const todoId = useRef(0);
  const initialValue = () => {
    const valueFromStorage = JSON.parse(
      window.localStorage.getItem("todos") || JSON.stringify(defaultValue)
    );
    todoId.current = valueFromStorage.reduce(
      (memo, todo) => Math.max(memo, todo.id),
      0
    );
    return valueFromStorage;
  };
  const [todos, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        todoId.current += 1;
        return [
          ...state,
          { id: todoId.current, text: action.text, completed: false }
        ];
      case "DELETE_TODO":
        return state.filter(todo => todo.id !== action.id);
      case "TOGGLE_TODO":
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      default:
        return state;
    }
  }, useMemo(initialValue, []));
  useEffect(
    () => {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos]
  );
  return [todos, dispatch];
};
