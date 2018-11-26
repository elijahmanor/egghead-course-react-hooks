import React, { useRef } from "react";

const styles = {
  input: {
    border: "2px solid rgba(255, 255, 255, 0.5)",
    fontSize: "1.75em",
    padding: "0.25em 0.5em",
    color: "white",
    borderRadius: "0.25em",
    background: "transparent",
    transition: "all 0.1s"
  },
  button: {
    fontWeight: "400",
    color: "black",
    fontSize: "1.75em",
    padding: "0.25em 0.5em",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "0.25em",
    margin: "5px",
    cursor: "pointer"
  }
};

export default function Playground() {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };
  return (
    <section>
      <input autoFocus ref={inputRef} style={styles.input} />
      <button onClick={handleClick} style={styles.button}>
        Focus
      </button>
    </section>
  );
}
