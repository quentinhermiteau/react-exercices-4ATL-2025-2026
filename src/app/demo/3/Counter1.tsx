"use client";

import { useReducer } from "react";

function reducer(state: CountState, action: string) {
  switch (action) {
    case "increment":
      return { ...state, value: state.value + state.step };
    case "decrement":
      return { ...state, value: state.value - state.step };
    case "stepIncrease":
      return { ...state, step: state.step + 1 };
    case "stepDecrease":
      return { ...state, step: state.step - 1 };
    case "reset":
      return { value: 0, step: 1 };
  }
}

type CountState = {
  value: number;
  step: number;
};

const initialCountState: CountState = {
  value: 0,
  step: 1,
};

export default function Counter1() {
  const [count, dispatch] = useReducer<CountState, any>(
    reducer,
    initialCountState,
  );

  const handleIncrement = () => dispatch("increment");
  const handleDecrement = () => dispatch("decrement");
  const handleIncreaseStep = () => dispatch("stepIncrease");
  const handleDecreaseStep = () => dispatch("stepDecrease");

  return (
    <main>
      <h1>{count.value}</h1>
      <h2>{count.step}</h2>
      <div>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </div>
      <div>
        <button onClick={handleDecreaseStep}>-</button>
        <button onClick={handleIncreaseStep}>+</button>
      </div>
    </main>
  );
}
