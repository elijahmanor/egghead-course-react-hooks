import React, {
  Component,
  useContext,
  useState,
  useRef,
  memo,
  useMemo,
  createRef,
  useEffect
} from "react";
import styled, { keyframes } from "react-emotion";
import Checkbox from "./Checkbox";
import ThemeContext from "./ThemeContext";
import Color from "color";
import styles from "./styles";
import elementResizeEvent from "element-resize-event";

const moveAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
`;
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
  border-bottom: 1px solid
    ${props => styles[props.theme].todo.item.borderBottom};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:before {
    content: ${props => (props.striped ? `""` : "normal")};
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    z-index: 1;
    background-size: 53px 53px;
    animation: move 2s linear infinite;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
    animation: ${moveAnimation} 2s linear infinite;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

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

// export default memo(function TodoItem({ todo, onChange, onDelete }) {
//   const theme = useContext(ThemeContext);
//   const ageColors = useMemo(() => getColors(todo.text, theme), [
//     todo.text,
//     theme
//   ]);
//   return (
//     <Space>
//       {({ height, width }) => (
//         <Item key={todo.id} theme={theme} ageColors={ageColors}>
//           <Checkbox
//             id={todo.id}
//             label={todo.text}
//             checked={todo.completed}
//             onChange={onChange.bind(this, todo.id)}
//           />
//           <div>
//             {height}/ {width}
//           </div>
//           <Button onClick={onDelete.bind(this, todo.id)} theme={theme}>
//             x
//           </Button>
//         </Item>
//       )}
//     </Space>
//   );
// });

// export default memo(function TodoItem({ todo, onChange, onDelete }) {
//   const theme = useContext(ThemeContext);
//   const ageColors = useMemo(() => getColors(todo.text, theme), [
//     todo.text,
//     theme
//   ]);
//   const wrapperRef = useRef(null);
//   const [{ height, width }, setSize] = useState({ height: 0, width: 0 });
//   useEffect(() => {
//     const updateSize = () => {
//       // debugger;
//       const element = wrapperRef.current;
//       setSize({
//         height: element.clientHeight,
//         width: element.clientWidth
//       });
//     };
//     const element = wrapperRef.current;
//     updateSize();
//     elementResizeEvent(element, updateSize);
//     return () => elementResizeEvent.unbind(wrapperRef.current);
//   }, []);
//   return (
//     <Item
//       key={todo.id}
//       innerRef={wrapperRef}
//       theme={theme}
//       ageColors={ageColors}
//     >
//       <Checkbox
//         id={todo.id}
//         label={todo.text}
//         checked={todo.completed}
//         onChange={onChange.bind(this, todo.id)}
//       />
//       <div>
//         {height}/ {width}
//       </div>
//       <Button onClick={onDelete.bind(this, todo.id)} theme={theme}>
//         x
//       </Button>
//     </Item>
//   );
// });

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

export default memo(function TodoItem({ todo, onChange, onDelete }) {
  const theme = useContext(ThemeContext);
  const ageColors = useMemo(() => getColors(todo.text, theme), [
    todo.text,
    theme
  ]);
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
});
