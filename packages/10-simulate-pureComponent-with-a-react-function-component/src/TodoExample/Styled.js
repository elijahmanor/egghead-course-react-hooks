import styled from "@emotion/styled";
import styles from "./styles";

export const Container = styled("div")`
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

export const List = styled("ul")`
  list-style: none;
  border: 2px solid ${props => styles[props.theme].list.borderColor};
  border-top: none;
  margin: 0;
  padding-left: 0;
`;

export const Button = styled("button")`
  font-weight: 400;
  color: ${props => styles[props.theme].todo.button.color};
  font-size: 0.75em;
  border: 1px solid transparent;
  background-color: transparent;
  margin: 5px;
  cursor: pointer;
`;

export const Item = styled("li")`
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
