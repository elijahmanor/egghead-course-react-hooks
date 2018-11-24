import React, {
  Component,
  PureComponent,
  Fragment,
  useContext,
  memo
} from "react";
import styled from "react-emotion";
import Checkbox from "./Checkbox";
import ThemeContext from "./ThemeContext";
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

class TodoItem1 extends Component {
  render() {
    const { todo, onChange, onDelete } = this.props;
    console.log("TodoItem", { theme: this.context, ...todo });
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
TodoItem1.contextType = ThemeContext;

class TodoItem2 extends PureComponent {
  render() {
    const { todo, onChange, onDelete } = this.props;
    console.log("TodoItem", { theme: this.context, ...todo });
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
TodoItem2.contextType = ThemeContext;

class TodoItem3 extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.todo !== this.props.todo;
  }
  render() {
    const { todo, onChange, onDelete } = this.props;
    console.log("TodoItem", { theme: this.context, ...todo });
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
TodoItem3.contextType = ThemeContext;

function TodoItem4({ todo, onChange, onDelete }) {
  const theme = useContext(ThemeContext);
  console.log("TodoItem", { theme, ...todo });
  return (
    <Item key={todo.id} theme={theme}>
      <Checkbox
        id={todo.id}
        label={todo.text}
        checked={todo.completed}
        onChange={onChange.bind(this, todo.id)}
      />
      <Button onClick={onDelete.bind(this, todo.id)} theme={theme}>
        x
      </Button>
    </Item>
  );
}

const TodoItem5 = React.memo(({ todo, onChange, onDelete }) => {
  const theme = useContext(ThemeContext);
  console.log("TodoItem", { theme, ...todo });
  return (
    <Item key={todo.id} theme={theme}>
      <Checkbox
        id={todo.id}
        label={todo.text}
        checked={todo.completed}
        onChange={onChange.bind(this, todo.id)}
      />
      <Button onClick={onDelete.bind(this, todo.id)} theme={theme}>
        x
      </Button>
    </Item>
  );
});

const TodoItem6 = React.memo(
  ({ todo, onChange, onDelete }) => {
    const theme = useContext(ThemeContext);
    console.log("TodoItem", { theme, ...todo });
    return (
      <Item key={todo.id} theme={theme}>
        <Checkbox
          id={todo.id}
          label={todo.text}
          checked={todo.completed}
          onChange={onChange.bind(this, todo.id)}
        />
        <Button onClick={onDelete.bind(this, todo.id)} theme={theme}>
          x
        </Button>
      </Item>
    );
  },
  ({ prevTodo }, { nextTodo }) => prevTodo === nextTodo
);

export default TodoItem2;
