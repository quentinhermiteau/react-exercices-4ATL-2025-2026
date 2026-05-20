"use client";

import { useReducer } from "react";
import Slider from "./Slider";

const initialState = {
  value: 0,
  step: 1,
};

const reducer = (state, { action, payload }) => {
  switch (action) {
    case "increment":
      return { ...state, value: state.value + state.step };
    case "decrement":
      return { ...state, value: state.value - state.step };
    case "reset":
      return initialState;
    case "updateStep":
      return { ...state, step: payload };
  }
};

export default function Counter() {
  const [count, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => dispatch({ action: "increment" });
  const handleDecrement = () => dispatch({ action: "decrement" });
  const handleReset = () => dispatch({ action: "reset" });
  const handleUpdateStep = (step) =>
    dispatch({ action: "updateStep", payload: step });

  return (
    <main>
      <div id="notice">
        À l'aide de useReducer et setInterval, faire en sorte que le compteur
        s'incrémente automatiquement toutes les secondes.
      </div>
      <h1>{count.value}</h1>
      <div>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleReset}>0</button>
      </div>
      <Slider min={1} max={10} value={count.step} onChange={handleUpdateStep} />
    </main>
  );
}
