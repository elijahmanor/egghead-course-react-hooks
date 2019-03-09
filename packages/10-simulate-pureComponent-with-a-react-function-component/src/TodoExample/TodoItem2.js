import React, { PureComponent } from "react";
import Checkbox from "./Checkbox";
import ThemeContext from "../Theme/ThemeContext";
import { Button, Item } from "./Styled";

class TodoItem extends PureComponent {
  render() {
    console.log( "TodoItem2", this.props );
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
