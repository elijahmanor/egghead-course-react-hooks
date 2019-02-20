import React, { Component } from "react";
import styled from "@emotion/styled";
import Checkbox from "./Checkbox";
import ThemeContext from "../Theme/ThemeContext";
import styles from "./styles";

const Button = styled("button")`
  font-weight: 400;
  color: ${props => styles[props.theme].todo.button.color};
  font-size: 0.75em;
  border: 1px solid transparent;
  background-color: transparent;
  margin: 5px;
  cursor: pointer;
`;
const Item = styled("li")`
  font-size: 1.75em;
  padding: 0.25em 0.25em 0.25em 0.5em;
  color: ${props => styles[props.theme].todo.item.color};
  border-bottom: 1px solid
    ${props => styles[props.theme].todo.item.borderBottom};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-of-type {
    border-bottom: none;
  }
`;

class TodoItem extends Component {
  render() {
    const { todo, onChange, onDelete } = this.props;
    return (
      <Item key={todo.id} theme={this.context}>
        <Checkbox
          id={todo.id}
          label={todo.text}
          checked={todo.completed}
          onChange={onChange.bind(this, todo.id)}
        />
        <Button onClick={onDelete.bind(this, todo.id)} theme={this.context}>
          x
        </Button>
      </Item>
    );
  }
}
TodoItem.contextType = ThemeContext;

export default TodoItem;
