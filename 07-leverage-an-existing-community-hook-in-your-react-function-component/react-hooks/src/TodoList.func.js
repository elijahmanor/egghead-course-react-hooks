import React, { Fragment, useState, useEffect, useRef } from "react";
import styled from "react-emotion";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import About from "./About";
import uniqueId from "lodash.uniqueid";

import {
  useBattery,
  useTitle as useDocumentTitle,
  useLocalStorage
} from "react-use";

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

// https://thenounproject.com/term/battery/14009/
const Battery = ({ level, charging }) => {
  return (
    <svg viewBox="0 0 34 98">
      <defs>
        <linearGradient id="progress" x1="0" y1="1" x2="0" y2="0">
          <stop id="stop1" offset={level} stopColor="#37F53B" />
          <stop
            id="stop2"
            offset={level}
            stopColor="#ffffff"
            stopOpacity="0.3"
          />
        </linearGradient>
      </defs>
      <path
        fill="url(#progress)"
        d="M32.016,4.813 L24.102,4.813 L24.102,1.127 C24.102,0.689 23.746,0.333 23.307,0.333 L11.142,0.333 C10.703,0.333 10.347,0.69 10.347,1.127 L10.347,4.813 L2.432,4.813 C1.364,4.813 0.498,5.677 0.498,6.745 L0.498,96.066 C0.498,97.131 1.364,98 2.432,98 L32.015,98 C33.082,98 33.949,97.136 33.949,96.066 L33.949,6.745 C33.949,5.677 33.084,4.813 32.016,4.813 Z"
      />
      {charging && (
        <polygon
          fill="yellow"
          points="16.96 75.677 16.96 55.544 13.156 58.984 16.96 30.246 16.96 50.953 21.291 48.207"
        />
      )}
      <text
        x="17"
        y="88"
        alignmentBaseline="middle"
        fontSize="11"
        fill="#333"
        textAnchor="middle"
        style={{
          fontFamily:
            "-apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'"
        }}
      >
        {level * 100}%
      </text>
    </svg>
  );
};

export function Playground1() {
  const [battery, setBattery] = useState({ level: 0, charging: false });
  const handleChange = ({ target: { level, charging } }) =>
    setBattery({ level, charging });

  useEffect(() => {
    let battery;
    navigator.getBattery().then(bat => {
      battery = bat;
      battery.addEventListener("levelchange", handleChange);
      battery.addEventListener("chargingchange", handleChange);
      handleChange({ target: battery });
    });
    return () => {
      battery.removeEventListener("levelchange", handleChange);
      battery.removeEventListener("chargingchange", handleChange);
    };
  }, []);

  return (
    <section>
      <Battery {...battery} />
    </section>
  );
}

// const useBattery = () => {
//   const [battery, setBattery] = useState({ level: 0, charging: false });
//   const handleChange = ({ target: { level, charging } }) =>
//     setBattery({
//       level,
//       charging
//     });

//   useEffect(() => {
//     let battery;
//     navigator.getBattery().then(bat => {
//       battery = bat;
//       battery.addEventListener("levelchange", handleChange);
//       battery.addEventListener("chargingchange", handleChange);
//       handleChange({ target: battery });
//     });
//     return () => {
//       battery.removeEventListener("levelchange", handleChange);
//       battery.removeEventListener("chargingchange", handleChange);
//     };
//   }, []);
//   return battery;
// };

export default function Playground2() {
  const battery = useBattery();
  return (
    <section>
      <Battery {...battery} />
    </section>
  );
}
// import { useTitle, useLocalStorage as useStorage } from "react-use";

// const useLocalStorage = (key, defaultValue) => {
//   const initialValue = () =>
//     JSON.parse(
//       window.localStorage.getItem(key) || JSON.stringify(defaultValue)
//     );
//   const [storage, updateStorage] = useState(initialValue);
//   useEffect(
//     () => {
//       window.localStorage.setItem(key, JSON.stringify(storage));
//     },
//     [storage]
//   );
//   return [storage, updateStorage];
// };

// const useDocumentTitle = title => {
//   useEffect(
//     () => {
//       document.title = title;
//     },
//     [title]
//   );
// };

const useKeyDown = (map, defaultValue) => {
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

const incompleteTodoCount = todos =>
  todos.reduce((memo, todo) => (!todo.completed ? memo + 1 : memo), 0);

export function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const todoId = useRef(0);
  const [todos, updateTodos] = useLocalStorage("todos", []);
  const inCompleteCount = incompleteTodoCount(todos);
  const title = inCompleteCount ? `Todos (${inCompleteCount})` : "Todos";
  useDocumentTitle(title);
  let [showAbout, setShowAbout] = useKeyDown(
    { "?": true, Escape: false },
    false
  );
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
