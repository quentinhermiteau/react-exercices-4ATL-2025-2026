"use client";

import { useReducer } from "react";

const initialState = {
  fields: {
    name: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
  },
  step: 1,
};

const reducer = (state, { action, name, value }) => {
  switch (action) {
    case "incrementStep":
      return { ...state, step: state.step + 1 };
    case "decrementStep":
      return { ...state, step: state.step - 1 };
    case "updateField":
      return { ...state, fields: { ...state.fields, [name]: value } };
    case "reset":
      return initialState;
  }
};

export default function MultistepFormReducer() {
  const [form, dispatch] = useReducer(reducer, initialState);

  const handleNextStep = () => dispatch({ action: "incrementStep" });

  const handlePrevStep = () => dispatch({ action: "decrementStep" });

  const handleChange = (e) =>
    dispatch({
      action: "updateField",
      name: e.target.name,
      value: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your submission");
    dispatch({ action: "reset" });
  };

  if (form.step === 1) {
    return (
      <form onSubmit={handleSubmit}>
        <div id="notice">Refacto ce formulaire en utilisant useReducer</div>
        <h2>Personal Information</h2>
        <div>
          <label>Step {form.step} of 3</label>
          <progress value={form.step} max={3} />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            id="name"
            placeholder="Enter your name"
            value={form.fields.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={form.fields.email}
            onChange={handleChange}
          />
        </div>
        <button type="button" className="secondary" onClick={handleNextStep}>
          Next
        </button>
      </form>
    );
  } else if (form.step === 2) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Address</h2>
        <div>
          <label>Step {form.step} of 3</label>
          <progress value={form.step} max={3} />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            required
            name="address"
            id="address"
            type="address"
            placeholder="What is your address?"
            value={form.fields.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            required
            name="city"
            id="city"
            placeholder="What city do you live in?"
            value={form.fields.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode</label>
          <input
            required
            name="zipcode"
            id="zipcode"
            type="number"
            placeholder="What is your zipcode?"
            value={form.fields.zipcode}
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="secondary" type="button" onClick={handleNextStep}>
            Next
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else if (form.step === 3) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Confirm your information:</h2>
        <div>
          <label>Step {form.step} of 3</label>
          <progress value={form.step} max={3} />
        </div>
        <table>
          <tbody>
            {Object.keys(form.fields).map((key) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{form.fields[key]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          <button className="primary" type="submit">
            Submit
          </button>
          <button type="button" className="link" onClick={handlePrevStep}>
            Previous
          </button>
        </div>
      </form>
    );
  } else {
    return null;
  }
}
