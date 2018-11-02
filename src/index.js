import React, { Fragment, useState, useReducer, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const useTodoList = () => {
  const nextTodoId = useRef(0);
  return useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        return [
          ...state,
          {
            id: nextTodoId.current++,
            text: action.data
          }
        ];
      default:
        return state;
    }
  }, []);
};

function TodoList() {
  const inputRef = useRef();
  const [todos, dispatch] = useTodoList([]);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: "ADD_TODO",
      data: inputRef.current.value
    });
    inputRef.current.value = "";
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <input type="checkbox" />
              <span>
                {todo.id} - {todo.text}
              </span>
              <button onClick={() => dispatch("TOGGLE_TODO")}>x</button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
