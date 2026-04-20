"use client";

import { useState } from "react";
import "./styles.css";

export default function Exo6({ characterLimit = 20 }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.length > 20) {
      alert("The input exceeds the character limit. Please shorten your text.");
    } else {
      alert("Thanks for your submission");
    }
  };

  return (
    <>
      <div id="notice">
        <ul>
          <li>L'input doit afficher le texte que l'on écrit.</li>
          <li>
            Afficher de manière dynamique le nombre de caractères restants.
          </li>
          <li>
            Si le nombre de caractères restants passe sous 0, afficher le nombre
            de caractères restant en rouge (classe error).
          </li>
          <li>
            Au submit, afficher le message adéquat selon le nombre de caractères
            restant
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="limited-text-input">Limited Text Input:</label>
          <span
            className={
              characterLimit - inputValue.length > 0 ? "no-error" : "error"
            }
          >
            Characters remaining: {characterLimit - inputValue.length}
          </span>
        </div>
        <input
          type="text"
          placeholder="Enter some text"
          id="limited-text-input"
          value={inputValue}
          onChange={handleChange}
        />
        <div>
          <button type="submit" className="primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
