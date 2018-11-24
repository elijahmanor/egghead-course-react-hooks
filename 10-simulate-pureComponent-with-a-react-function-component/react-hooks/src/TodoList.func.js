import React, {
  useState,
  useEffect,
  useRef,
  useReducer,
  useMemo,
  useCallback,
  useContext
} from "react";
import styled from "react-emotion";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import About from "./About";
import { useTitle as useDocumentTitle } from "react-use";
import ThemeContext from "./ThemeContext";
import styles from "./styles";

const Container = styled("div")`
  margin: 0 auto;
  width: 75%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  input[type="text"] {
    border-radius: ${props =>
      props.todos.length ? "0.25em 0.25em 0 0" : "0.25em"};
  }
  & > label {
    align-self: flex-end;
    margin-bottom: 10px;
  }
`;
const List = styled("ul")`
  list-style: none;
  border: 2px solid ${props => styles[props.theme].list.borderColor};
  border-top: none;
  margin: 0;
  padding-left: 0;
`;

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

export function TodoList2() {
  const [newTodo, updateNewTodo] = useState("");
  const [todos, dispatch] = useTodosWithLocalStorage([]);
  const inCompleteCount = incompleteTodoCount(todos);
  const theme = useContext(ThemeContext);
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
        <List theme={theme}>
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

export default function TodoList3() {
  const [newTodo, updateNewTodo] = useState("");
  const [todos, dispatch] = useTodosWithLocalStorage([]);
  const inCompleteCount = incompleteTodoCount(todos);
  const theme = useContext(ThemeContext);
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
  const handleTodoChange = useCallback(
    id => dispatch({ type: "TOGGLE_TODO", id }),
    []
  );
  const handleTodoDelete = useCallback(
    id => dispatch({ type: "DELETE_TODO", id }),
    []
  );
  // try inline...
  // onChange={useCallback(id => dispatch({ type: "TOGGLE_TODO", id }), [])}
  return (
    <Container todos={todos}>
      <NewTodo
        onSubmit={handleNewSubmit}
        value={newTodo}
        onChange={e => updateNewTodo(e.target.value)}
      />
      {!!todos.length && (
        <List theme={theme}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onChange={handleTodoChange}
              onDelete={handleTodoDelete}
            />
          ))}
        </List>
      )}
      <About isOpen={showAbout} onClose={() => setShowAbout(false)} />
    </Container>
  );
}
