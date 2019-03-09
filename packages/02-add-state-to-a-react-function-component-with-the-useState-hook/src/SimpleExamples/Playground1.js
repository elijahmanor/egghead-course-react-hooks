import React, { useState } from "react";

export function Playground1() {
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);
  return (
    <section>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />
      <ul>
        <li>{text}</li>
        <li>{checked.toString()}</li>
      </ul>
    </section>
  );
}
