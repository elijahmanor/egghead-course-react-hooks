import React, { Component } from "react";
import styled from "@emotion/styled";
import ThemeContext from "../Theme/ThemeContext";
import styles from "./styles";

const Wrapper = styled("div")`
  position: relative;
  flex-grow: 1;
`;
const Input = styled("input")`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;
const Label = styled("label")`
  display: inline-block;
  padding-left: 1.5em;
  text-decoration: ${props => (props.completed ? "line-through" : "initial")};
  color: ${props =>
    props.completed
      ? styles[props.theme].checkbox.labelColorComplete
      : styles[props.theme].checkbox.labelColorIncomplete};

  &:before {
    content: "";
    background-color: ${props => styles[props.theme].checkbox.backgroundColor};
    background-repeat: no-repeat;
    background-position: center;
    background-size: 50% auto;
    border: 2px solid ${props => styles[props.theme].checkbox.borderColor};
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1em;
    height: 1em;
    cursor: pointer;
  }

  input[type="checkbox"]:focus + &:before {
    border-color: ${props => styles[props.theme].checkbox.borderColorFocus};
  }

  input[type="checkbox"]:checked + &:before {
    background-color: ${props =>
      styles[props.theme].checkbox.backgroundColorChecked};
    opacity: 1;
    background-image: url('data:image/svg+xml,\
      <svg viewBox="0 0 127 132" xmlns="http://www.w3.org/2000/svg">\
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="square">\
          <polyline id="Line" stroke="white" stroke-width="30" points="7.58190835 74.8644228 49.1900368 123.50333 119.645623 7.6658546"></polyline>\
        </g>\
      </svg>');
  }
`;

class Checkbox extends Component {
  render() {
    const { id, label, checked, onChange } = this.props;
    return (
      <Wrapper>
        <Input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={onChange}
        />
        <Label
          htmlFor={id}
          aria-hidden="true"
          completed={checked}
          theme={this.context}
        >
          {label}
        </Label>
      </Wrapper>
    );
  }
}
Checkbox.contextType = ThemeContext;

export default Checkbox;
