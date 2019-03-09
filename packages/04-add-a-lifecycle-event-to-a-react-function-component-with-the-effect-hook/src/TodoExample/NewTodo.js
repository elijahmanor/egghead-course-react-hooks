import React from "react";
import styled from "@emotion/styled";

const NEW_TODO_MAX_LENGTH = 42;
const NEW_TODO_WARNING_LENGTH = 25;

const Input = styled("input")`
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 1.75em;
  padding: 0.25em 0.5em;
  color: white;
  border-radius: 0.25em;
  background: transparent;
  transition: all 0.1s;
  position: relative;
  width: 50px;

  & + ul {
    border-radius: 0.25em 0.25em 0 0;
  }
`;
const Form = styled("form")`
  position: relative;
  display: flex;

  &:after {
    content: attr(data-remaining);
    display: block;
    position: absolute;
    right: 10px;
    top: 50%;
    padding: 6px;
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 3;
    text-align: center;
    min-width: 20px;
    color: ${props => {
      if (props["data-remaining"] === 0) {
        return "white";
      } else if (props["data-remaining"] <= NEW_TODO_WARNING_LENGTH) {
        return "black";
      } else {
        return "rgba(255, 255, 255, 0.75)";
      }
    }};
    background-color: ${props => {
      if (props["data-remaining"] === 0) {
        return "#F2545B";
      } else if (props["data-remaining"] <= NEW_TODO_WARNING_LENGTH) {
        return "#FFFDA1";
      } else {
        return "rgba(255, 255, 255, 0.25)";
      }
    }};
  }

  input {
    padding-right: 45px !important;
    width: 100%;
  }
`;

export default function NewTodo({ value, onChange, onSubmit }) {
  return (
    <Form
      onSubmit={onSubmit}
      data-remaining={NEW_TODO_MAX_LENGTH - value.length}
    >
      <Input
        type="text"
        autoFocusx
        placeholder="New Todo..."
        value={value}
        maxLength={NEW_TODO_MAX_LENGTH}
        onChange={onChange}
      />
    </Form>
  );
}
