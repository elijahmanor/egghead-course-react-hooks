import React, { useState, useEffect } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import About from "./About";
import { Container, List } from "./Styled";

export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const initialTodos = () =>
    JSON.parse(window.localStorage.getItem("todos") || "[]");
  const [todos, updateTodos] = useState(initialTodos);
  useEffect(
    () => {
      window.localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos]
  );
  useEffect(() => {
    const inCompleteTodos = todos.reduce(
      (memo, todo) => (!todo.completed ? memo + 1 : memo),
      0
    );
    document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
  });
  let [showAbout, setShowAbout] = useState(false);
  useEffect(() => {
    const handleKey = ({ key }) => {
      setShowAbout(show =>
        key === "?" ? true : key === "Escape" ? false : show
      );
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  const handleNewSubmit = e => {
    e.preventDefault();
    updateTodos(prevTodos => [
      ...prevTodos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false
      }
    ]);
    updateNewTodo("");
  };
  const handleNewChange = e => updateNewTodo(e.target.value);
  const handleDelete = (id, e) => {
    updateTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  const handleCompletedToggle = (id, e) => {
    updateTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit={handleNewSubmit}
        value={newTodo}
        onChange={handleNewChange}
      />
      {!!todos.length && (
        <List>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={handleCompletedToggle}
              onDelete={handleDelete}
            />
          ))}
        </List>
      )}
      <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </Container>
  );
}
