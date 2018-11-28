import React, { Component, useContext, createRef } from "react";
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

class Space extends Component {
  state = { height: 0, width: 0 };
  wrapperRef = createRef();
  updateSize = () => {
    const element = this.wrapperRef.current;
    this.setState({
      height: element.clientHeight,
      width: element.clientWidth
    });
  };
  componentDidMount() {
    const element = this.wrapperRef.current;
    this.updateSize();
    elementResizeEvent(element, this.updateSize);
  }
  componentWillUnmount() {
    elementResizeEvent.unbind(this.wrapperRef.current);
  }
  render() {
    return <div ref={this.wrapperRef}>{this.props.children(this.state)}</div>;
  }
}

export default function TodoItem({ todo, onChange, onDelete }) {
  const theme = useContext(ThemeContext);
  const ageColors = getColors(todo.text, theme);
  return (
    <Space>
      {({ height, width }) => (
        <Item
          key={todo.id}
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
      )}
    </Space>
  );
}
