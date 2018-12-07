import React, { useContext, useRef, useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import ThemeContext from "../Theme/ThemeContext";
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

const useSize = defaultSize => {
  const wrapperRef = useRef(null);
  const [size, setSize] = useState(defaultSize);
  useEffect(() => {
    const updateSize = () => {
      const element = wrapperRef.current;
      setSize({ height: element.clientHeight, width: element.clientWidth });
    };
    const element = wrapperRef.current;
    updateSize();
    elementResizeEvent(element, updateSize);
    return () => elementResizeEvent.unbind(wrapperRef.current);
  }, []);
  return [size, wrapperRef];
};

export default function TodoItem({ todo, onChange, onDelete }) {
  const theme = useContext(ThemeContext);
  const ageColors = getColors(todo.text, theme);
  const [{ width, height }, wrapperRef] = useSize({
    width: 0,
    height: 0
  });
  return (
    <Item
      key={todo.id}
      innerRef={wrapperRef}
      theme={theme}
      striped={height > 53}
      animating={!todo.completed}
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
