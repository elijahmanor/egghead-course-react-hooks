import React, { Fragment, useState } from "react";
import styled from "react-emotion";
import NewTodo from "./NewTodo";
import TodoItem from "./TodoItem";

const Container = styled("div")`
  margin: 3em auto 0 auto;
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

/*
 * useState to capture input text (text)
 * useState to toggle input element (boolean)
 * Switch toggle boolean to use Functional Updater with prevState
 * Convert to combine the two values into an object useState
 * Demonstrate that it will not deep merge
 * Show simple work-around `setState(prevState => { return {...prevState, ...updatedValues}; });`
 * Explain React Team's recommendation to "split state into multiple state variables based on which values tend to change together" --[Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables)
 */

export function Playground1() {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <section>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
      <ul>
        <li>{text}</li>
        <li>{checked.toString()}</li>
      </ul>
    </section>
  );
}

export function Playground2() {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const handleCheckboxToggle = () => setChecked(!checked);
  return (
    <section>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxToggle}
      />
      <ul>
        <li>{text}</li>
        <li>{checked.toString()}</li>
      </ul>
    </section>
  );
}

export function Playground3() {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  const handleCheckboxToggle = () => setChecked(prevChecked => !prevChecked);
  return (
    <section>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxToggle}
      />
      <ul>
        <li>{text}</li>
        <li>{checked.toString()}</li>
      </ul>
    </section>
  );
}

export function Playground4() {
  // BOOM
  const [state, updateState] = useState({ text: "", checked: false });
  const handleCheckboxToggle = () =>
    updateState(prevState => ({ checked: !prevState.checked }));
  return (
    <section>
      <input
        type="text"
        value={state.text}
        onChange={e => updateState({ text: e.target.value })}
      />
      <input
        type="checkbox"
        checked={state.checked}
        onChange={handleCheckboxToggle}
      />
      <ul>
        <li>{state.text}</li>
        <li>{state.checked.toString()}</li>
      </ul>
    </section>
  );
}

export default function Playground5() {
  const [state, updateState] = useState({ text: "", checked: false });
  const mergeState = partialState =>
    updateState(prevState => ({
      ...prevState,
      ...partialState
    }));
  return (
    <section>
      <input
        type="text"
        value={state.text}
        onChange={e =>
          mergeState({
            text: e.target.value
          })
        }
      />
      <input
        type="checkbox"
        checked={state.checked}
        onChange={() => mergeState({ checked: !state.checked })}
      />
      <ul>
        <li>{state.text}</li>
        <li>{state.checked.toString()}</li>
      </ul>
    </section>
  );
}

export function TodoList() {
  const [newTodo, updateNewTodo] = useState("");
  const [todos, updateTodos] = useState([]);
  const handleNewSubmit = e => {
    e.preventDefault();
    updateTodos(prevTodos => [
      ...prevTodos,
      {
        id: prevTodos.length,
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
