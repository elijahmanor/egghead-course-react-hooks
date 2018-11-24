import React, {
  Component,
  PureComponent,
  Fragment,
  useContext,
  memo,
  useMemo,
  createRef
} from "react";
import styled from "react-emotion";
import Checkbox from "./Checkbox";
import ThemeContext from "./ThemeContext";
import Color from "color";
import differenceInDays from "date-fns/difference_in_days";
import differenceInMinutes from "date-fns/difference_in_minutes";
import styles from "./styles";
import randomColor from "randomcolor";

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
  background: ${props => props.ageColors.background};
  color: ${props => props.ageColors.color};
  // ${props => styles[props.theme].todo.item.color};
  border-bottom: 1px solid
    ${props => styles[props.theme].todo.item.borderBottom};
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-of-type {
    border-bottom: none;
  }
`;

const getColors = (text, theme) => {
  console.log("figuring...");
  const themeColor = styles[theme].todo.backgroundColor;
  const lengthPercentage = (text.length * 100) / 42;
  const darkenedColor = Color(themeColor).darken(lengthPercentage / 100);
  const background = `linear-gradient(90deg, ${themeColor} 0%, ${darkenedColor.hex()} 100%)`;
  const color = darkenedColor.isLight() ? "black" : "white";
  return { color, background };
};

export default memo(function TodoItem({ todo, onChange, onDelete }) {
  const theme = useContext(ThemeContext);
  console.log("calling...");
  // const ageColors = getColors(todo.text, theme);
  const ageColors = useMemo(() => getColors(todo.text, theme), [
    todo.text,
    theme
  ]);
  return (
    <Item key={todo.id} theme={theme} ageColors={ageColors}>
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
