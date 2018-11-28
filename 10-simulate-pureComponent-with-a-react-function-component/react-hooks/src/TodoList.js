import React, { useState, useContext } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem5";
import { Container, List } from "./Styled";
import About from "./About";
import { useTodosWithLocalStorage, useKeyDown } from "./hooks";
import { useTitle as useDocumentTitle } from "react-use";
import ThemeContext from "./ThemeContext";

const incompleteTodoCount = todos =>
  todos.reduce((memo, todo) => (!todo.completed ? memo + 1 : memo), 0);

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
  const theme = useContext(ThemeContext);

  // at end wrap onChange/onDelete with useCallback(....., [])

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
