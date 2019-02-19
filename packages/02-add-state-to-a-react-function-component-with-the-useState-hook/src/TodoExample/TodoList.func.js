import React, { useState } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";

export default function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const [todos, updateTodos] = useState([]);
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
    </Container>
  );
}
