import React, { useState } from "react";

export default function Playground() {
  const [state, updateState] = useState({ text: "", checked: false });
  const mergeState = partialState =>
    updateState(prevState => ({
      ...prevState,
      ...partialState
    }));
  let iFeelLikeIt = true;
  if (iFeelLikeIt) {
    let [feelz, setFeelz] = useState();
  }
  return (
    <section>
      <input
        type="text"
        value={state.text}
        onChange={e =>
          mergeState({
            text: e.target.value
          })
        }
      />
      <input
        type="checkbox"
        checked={state.checked}
        onChange={() => mergeState({ checked: !state.checked })}
      />
      <ul>
        <li>{state.text}</li>
        <li>{state.checked.toString()}</li>
      </ul>
    </section>
  );
}
