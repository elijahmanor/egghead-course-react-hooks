import React, { useContext, memo, useMemo } from "react";
import Checkbox from "./Checkbox";
import ThemeContext from "../Theme/ThemeContext";
import { Item, Button } from "./Styled";
import Color from "color";
import styles from "./styles";

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
