"use client";

import { useReducer } from "react";

const reducer = (state, { action, payload }) => {
  switch (action) {
    case "editField":
      return {
        ...state,
        fields: { ...state.fields, [payload.name]: payload.value },
      };
    case "setSubmit":
      return { ...state, submitting: payload };
    case "setError":
      return { ...state, error: payload };
    case "setSuccess":
      return { ...state, success: payload };
    default:
      break;
  }
};

const initialState = {
  fields: {
    name: "",
    email: "",
    cgu: false,
  },
  submitting: false,
  error: null,
  success: false,
};

export default function App() {
  // Gérer l'état du formulaire avec useState puis refacto avec useReducer
  const [form, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ action: "setSubmit", payload: true });
    window.setTimeout(() => {
      dispatch({ action: "setSubmit", payload: false });
      dispatch({ action: "setSuccess", payload: false });
    }, 1000);
  };

  return (
    <div>
      <h1>Formulaire d'inscription</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={(e) =>
              dispatch({
                action: "editField",
                payload: { name: e.target.name, value: e.target.value },
              })
            }
            value={form.fields.name}
            required
            placeholder="Your name"
          />
          <label htmlFor="email-address">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            onChange={(e) =>
              dispatch({
                action: "editField",
                payload: { name: e.target.name, value: e.target.value },
              })
            }
            value={form.fields.email}
            autoComplete="email"
            required
            placeholder="Email Address"
          />
          <button type="submit">Submit</button>
        </div>
        <div>
          <label htmlFor="cgu">CGU</label>
          <input
            id="cgu"
            name="cgu"
            type="checkbox"
            onChange={(e) =>
              dispatch({
                action: "editField",
                payload: { name: e.target.name, value: e.target.checked },
              })
            }
            checked={form.fields.cgu}
          />
          <p>I agree to everything.</p>
        </div>
      </form>
      {form.submitting && <p>Submitting...</p>}
      {form.error && <p>{form.error}</p>}
      {form.success && <p>Success!</p>}
    </div>
  );
}
