import React from "react";
import styled from "@emotion/styled";

const Label = styled("label")`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
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
  outline: none;

  &:checked + span {
    background-color: #37d8e6;
  }

  &:focus + span {
    box-shadow: 0 0 1px 1px #f1c40f;
  }

  &:checked:focus + span {
    box-shadow: 0 0 1px 1px #2c3e50;
  }

  &:checked + span:before {
    background-color: #ffdd00;
    border-color: #f1c40f;
    transform: translate(30px, -50%);
  }
`;
const Slider = styled("span")`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #2c3e50;
  border-radius: 34px;
  transition: 400ms;
  outline: none;

  &:before {
    position: absolute;
    content: "";
    height: 24px;
    width: 24px;
    top: 50%;
    transform: translate(4px, -50%);
    background-color: #bdc3c7;
    border: 2px solid #eaeff2;
    border-radius: 50%;
    transition: 400ms;
  }
`;

export default function Switch({ id, checked, onChange }) {
  return (
    <Label>
      <Input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <Slider />
    </Label>
  );
}
