import React, { Component, Fragment } from "react";
import styled from "react-emotion";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";

const Container = styled("div")`
  margin: 3em auto 0 auto;
  padding: 0 1em;
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

export default class TodoList extends Component {
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
          {
            id: prevState.todos.length,
            text: prevState.newTodo,
            completed: false
          }
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
          <List>
            {todos.map(todo => (
              <TodoItem
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
