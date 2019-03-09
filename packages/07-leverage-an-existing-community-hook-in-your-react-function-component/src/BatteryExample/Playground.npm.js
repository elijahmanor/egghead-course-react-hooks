import React from "react";
import Battery from "./Battery";
import { useBattery } from "react-use";

export default function Playground() {
  const battery = useBattery();
  return (
    <section>
      <Battery {...battery} />
    </section>
  );
}
