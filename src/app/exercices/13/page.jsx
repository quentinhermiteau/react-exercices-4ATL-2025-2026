"use client";

import { useReducer } from "react";

const initialState = {
  past: [],
  count: 0,
  future: [],
};

function reducer(state, action) {
  const { past, count, future } = state;

  switch (action) {
    // [] 0 []
    // [0] 1 []
    // [0, 1] 2 []
    case "increment":
      return {
        past: [...past, count],
        count: count + 1,
        future,
      };
    case "decrement":
      // [0, 1] 2 []
      // [0, 1, 2] 1 []
      // [0, 1, 2, 1] 0 []
      return {
        past: [...past, count],
        count: count - 1,
        future,
      };
    // [0, 1] 2 []
    // [0] 1 [2]
    case "undo":
      const undoCount = past.at(-1);

      return {
        past: past.slice(0, -1),
        count: undoCount,
        future: [...future, count],
      };
    // [0] 1 [2]
    // [0, 1] 2 [0]
    case "redo":
      const redoCount = future.at(-1);
      return {
        past: [...past, count],
        count: redoCount,
        future: future.slice(0, -1),
      };
  }
}

export default function CounterWithUndoRedo() {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state);

  const handleIncrement = () => dispatch("increment");
  const handleDecrement = () => dispatch("decrement");
  const handleUndo = () => dispatch("undo");
  const handleRedo = () => dispatch("redo");

  return (
    <div>
      <div id="notice">
        <p>
          Gère toute la gestion de ce compteur avec useReducer, on doit pouvoir
          incrémenter et décrémenter.
        </p>
        <p>
          Mais aussi, on doit pouvoir faire un undo ou un redo et donc revenir à
          la valeur précédente du compteur.
        </p>
      </div>
      <h1>Counter: {state.count}</h1>
      <button className="link" onClick={handleIncrement}>
        Increment
      </button>
      <button className="link" onClick={handleDecrement}>
        Decrement
      </button>
      <button
        className="link"
        onClick={handleUndo}
        disabled={!state.past.length}
      >
        Undo
      </button>
      <button
        className="link"
        onClick={handleRedo}
        disabled={!state.future.length}
      >
        Redo
      </button>
    </div>
  );
}
