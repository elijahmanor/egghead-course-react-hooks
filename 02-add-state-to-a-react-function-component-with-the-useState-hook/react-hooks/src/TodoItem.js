import React from "react";
import styled from "react-emotion";
import Checkbox from "./Checkbox";

const Button = styled("button")`
  font-weight: 400;
  color: white;
  font-size: 0.75em;
  border: 1px solid transparent;
  background-color: transparent;
  margin: 5px;
  cursor: pointer;
`;
const Item = styled("li")`
  font-size: 1.75em;
  padding: 0.25em 0.25em 0.25em 0.5em;
  color: white;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-of-type {
    border-bottom: none;
  }
`;

export default function TodoItem({ todo, onChange, onDelete }) {
  return (
    <Item key={todo.id}>
      <Checkbox
        id={todo.id}
        label={todo.text}
        checked={todo.completed}
        onChange={onChange.bind(this, todo.id)}
      />
      <Button onClick={onDelete.bind(this, todo.id)}>x</Button>
    </Item>
  );
}
