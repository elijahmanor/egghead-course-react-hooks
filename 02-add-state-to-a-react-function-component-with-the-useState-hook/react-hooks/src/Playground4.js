import React, { useState } from "react";

export function Playground4() {
  // BOOM
  const [state, updateState] = useState({ text: "", checked: false });
  const handleCheckboxToggle = () =>
    updateState(prevState => ({ checked: !prevState.checked }));
  return (
    <section>
      <input
        type="text"
        value={state.text}
        onChange={e => updateState({ text: e.target.value })}
      />
      <input
        type="checkbox"
        checked={state.checked}
        onChange={handleCheckboxToggle}
      />
      <ul>
        <li>{state.text}</li>
        <li>{state.checked.toString()}</li>
      </ul>
    </section>
  );
}
