import React, { Component } from "react";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";
import { Container, List } from "./Styled";
import About from "./About";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: "",
      showAbout: false
    };
    this.handleNewChange = this.handleNewChange.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCompletedToggle = this.handleCompletedToggle.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.todoId = 0;
  }
  handleKey({ key }) {
    this.setState(prevState => {
      return {
        showAbout:
          key === "?" ? true : key === "Escape" ? false : prevState.showAbout
      };
    });
  }
  update(todos) {
    const inCompleteTodos = todos.reduce(
      (memo, todo) => (!todo.completed ? memo + 1 : memo),
      0
    );
    document.title = inCompleteTodos ? `Todos (${inCompleteTodos})` : "Todos";
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }
  componentDidMount() {
    const todos = JSON.parse(window.localStorage.getItem("todos") || "[]");
    this.todoId = todos.reduce((memo, todo) => Math.max(memo, todo.id), 0);
    document.addEventListener("keydown", this.handleKey);
    this.update(todos);
    this.setState({ todos });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.update(this.state.todos);
    }
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
  }
  handleNewChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }
  handleNewSubmit(e) {
    e.preventDefault();
    this.todoId += 1;
    this.setState(prevState => {
      return {
        todos: [
          ...prevState.todos,
          { id: this.todoId, text: prevState.newTodo, completed: false }
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
    const { newTodo, todos, showAbout } = this.state;
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
                key={todo.id}
                todo={todo}
                onChange={this.handleCompletedToggle}
                onDelete={this.handleDelete}
              />
            ))}
          </List>
        )}
        <About
          isOpen={showAbout}
          onClose={() => this.setState({ showAbout: false })}
        />
      </Container>
    );
  }
}
