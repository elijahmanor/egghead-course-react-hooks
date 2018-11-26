import React, { useState, useEffect, useRef } from "react";
import styled from "react-emotion";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import About from "./About";

const styles = {
  input: {
    border: "2px solid rgba(255, 255, 255, 0.5)",
    fontSize: "1.75em",
    padding: "0.25em 0.5em",
    color: "white",
    borderRadius: "0.25em",
    background: "transparent",
    transition: "all 0.1s"
  },
  button: {
    fontWeight: "400",
    color: "black",
    fontSize: "1.75em",
    padding: "0.25em 0.5em",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "0.25em",
    margin: "5px",
    cursor: "pointer"
  }
};

export function Playground() {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };
  return (
    <section>
      <input autoFocus ref={inputRef} style={styles.input} />
      <button onClick={handleClick} style={styles.button}>
        Focus
      </button>
    </section>
  );
}

export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const todoId = useRef(0);
  const initialTodos = () => {
    const valueFromStorage = JSON.parse(
      window.localStorage.getItem("todos") || "[]"
    );
    todoId.current = valueFromStorage.reduce(
      (memo, todo) => Math.max(memo, todo.id),
      0
    );
    return valueFromStorage;
  };
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
    todoId.current += 1;
    updateTodos(prevTodos => [
      ...prevTodos,
      {
        id: todoId.current,
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
