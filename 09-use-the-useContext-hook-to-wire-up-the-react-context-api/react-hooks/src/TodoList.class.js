import React, { Component, Fragment, createContext } from "react";
import styled from "react-emotion";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import uniqueId from "lodash.uniqueid";
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
`;
const List = styled("ul")`
  list-style: none;
  border: 2px solid ${props => styles[props.theme].list.borderColor};
  border-top: none;
  margin: 0;
  padding-left: 0;
`;

class TodoList1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ""
    };
    this.handleNewChange = this.handleNewChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompletedToggle = this.handleCompletedToggle.bind(this);
  }
  handleNewChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }
  handleNewSubmit(e) {
    e.preventDefault();
    this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos,
          { id: uniqueId(), text: prevState.newTodo, completed: false }
        ],
        newTodo: ""
      };
    });
  }
  handleDelete(id, e) {
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => todo.id !== id)
      };
    });
  }
  handleCompletedToggle(id, e) {
    this.setState(prevState => {
      return {
        todos: prevState.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    });
  }
  render() {
    const { newTodo, todos } = this.state;
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Container todos={todos}>
            <NewTodo
              onSubmit={this.handleNewSubmit}
              value={newTodo}
              onChange={this.handleNewChange}
            />
            {!!todos.length && (
              <List theme={theme}>
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onChange={this.handleCompletedToggle}
                    onDelete={this.handleDelete}
                  />
                ))}
              </List>
            )}
          </Container>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class TodoList2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ""
    };
    this.handleNewChange = this.handleNewChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompletedToggle = this.handleCompletedToggle.bind(this);
  }
  handleNewChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }
  handleNewSubmit(e) {
    e.preventDefault();
    this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos,
          { id: uniqueId(), text: prevState.newTodo, completed: false }
        ],
        newTodo: ""
      };
    });
  }
  handleDelete(id, e) {
    this.setState(prevState => {
      return {
        todos: prevState.todos.filter(todo => todo.id !== id)
      };
    });
  }
  handleCompletedToggle(id, e) {
    this.setState(prevState => {
      return {
        todos: prevState.todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    });
  }
  render() {
    const { newTodo, todos } = this.state;
    return (
      <Container todos={todos}>
        <NewTodo
          onSubmit={this.handleNewSubmit}
          value={newTodo}
          onChange={this.handleNewChange}
        />
        {!!todos.length && (
          <List theme={this.context}>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChange={this.handleCompletedToggle}
                onDelete={this.handleDelete}
              />
            ))}
          </List>
        )}
      </Container>
    );
  }
}
TodoList2.contextType = ThemeContext;

export default TodoList2;
