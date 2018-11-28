import React, { useContext, useRef, useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import ThemeContext from "./ThemeContext";
import Color from "color";
import { Item, Button } from "./Styled";
import styles from "./styles";
import elementResizeEvent from "element-resize-event";

const getColors = (text, theme) => {
  const themeColor = styles[theme].todo.backgroundColor;
  const lengthPercentage = (text.length * 100) / 42;
  const darkenedColor = Color(themeColor).darken(lengthPercentage / 100);
  const background = `linear-gradient(90deg, ${themeColor} 0%, ${darkenedColor.hex()} 100%)`;
  const color = darkenedColor.isLight() ? "black" : "white";
  return { color, background };
};

export default function TodoItem({ todo, onChange, onDelete }) {
  const theme = useContext(ThemeContext);
  const ageColors = getColors(todo.text, theme);
  const wrapperRef = useRef(null);
  const [{ height, width }, setSize] = useState({ height: 0, width: 0 });
  useEffect(() => {
    const updateSize = () => {
      const element = wrapperRef.current;
      setSize({
        height: element.clientHeight,
        width: element.clientWidth
      });
    };
    const element = wrapperRef.current;
    updateSize();
    elementResizeEvent(element, updateSize);
    return () => elementResizeEvent.unbind(wrapperRef.current);
  }, []);
  return (
    <Item
      key={todo.id}
      innerRef={wrapperRef}
      theme={theme}
      striped={height > 53}
      ageColors={ageColors}
    >
      <Checkbox
        id={todo.id}
        label={todo.text}
        checked={todo.completed}
        onChange={onChange.bind(this, todo.id)}
      />
      <code style={{ flex: "0 0 50px", margin: "0 5px" }}>
        {width}×{height}
      </code>
      <Button onClick={onDelete.bind(this, todo.id)} theme={theme}>
        x
      </Button>
    </Item>
  );
}
