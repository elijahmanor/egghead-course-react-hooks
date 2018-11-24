import React from "react";

export default function Playground() {
  return (
    <section>
      <input type="text" value={""} onChange={e => {}} />
      <input type="checkbox" checked={false} onChange={e => {}} />
      <ul>
        <li>{""}</li>
        <li>{""}</li>
      </ul>
    </section>
  );
}
