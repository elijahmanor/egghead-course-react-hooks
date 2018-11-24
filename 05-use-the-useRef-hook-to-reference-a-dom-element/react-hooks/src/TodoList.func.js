import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "react-emotion";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import About from "./About";
import uniqueId from "lodash.uniqueid";

const Container = styled("div")`
  margin: 3em auto 0 auto;
  width: 75%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  input[type="text"] {
    border-radius: ${props =>
      props.todos.length ? "0.25em 0.25em 0 0" : "0.25em"};
  }
`;
const List = styled("ul")`
  list-style: none;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-top: none;
  margin: 0;
  padding-left: 0;
`;

/*
Although we have `autofocus` on the input element, add a ref to the input text element so that we can focus the element when the user types the `f` code on the document
 */

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
