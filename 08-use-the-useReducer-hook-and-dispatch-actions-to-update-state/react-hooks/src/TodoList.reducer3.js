import React, { useState, useRef, useEffect, useReducer, useMemo } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import About from "./About";
import { useKeyDown } from "./hooks";
import { useTitle as useDocumentTitle } from "react-use";

const incompleteTodoCount = todos =>
  todos.reduce((memo, todo) => (!todo.completed ? memo + 1 : memo), 0);

const useTodosWithLocalStorage = defaultValue => {
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

export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const [todos, dispatch] = useTodosWithLocalStorage([]);
  const inCompleteCount = incompleteTodoCount(todos);
  const title = inCompleteCount ? `Todos (${inCompleteCount})` : "Todos";
  useDocumentTitle(title);
  let [showAbout, setShowAbout] = useKeyDown(
    { "?": true, Escape: false },
    false
  );
  const handleNewSubmit = e => {
    e.preventDefault();
    dispatch({ type: "ADD_TODO", text: newTodo });
    updateNewTodo("");
  };

  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit={handleNewSubmit}
        value={newTodo}
        onChange={e => updateNewTodo(e.target.value)}
      />
      {!!todos.length && (
        <List>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={id => dispatch({ type: "TOGGLE_TODO", id })}
              onDelete={id => dispatch({ type: "DELETE_TODO", id })}
            />
          ))}
        </List>
      )}
      <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </Container>
  );
}
