import React, { useState } from "react";

const dontDoThis = () => {
  const [nope, setNope] = useState("");
};

const todos = ["one", "two", "three"];
export default function Playground() {
  const [text, setText] = useState("");
  if (new Date().getDay() === 1) {
    const [special, setSpecial] = useState(false);
  }
  return (
    <section>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <ul>
        {todos.map(item => {
          const [count, setCount] = useState(0);
          return (
            <li onClick={() => setCount(count + 1)}>
              {item}: {count}
            </li>
          );
        })}
        <li>{text}</li>
      </ul>
    </section>
  );
}
