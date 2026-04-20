"use client";

import "./styles.css";

export default function Exo1() {
  const name = "Tyler McGinnis";
  const handle = "tylermcginnis";
  const img = "https://avatars0.githubusercontent.com/u/2933430";

  const getDate = () => {
    return new Date().toLocaleDateString("FR-fr");
  };

  return (
    <>
      <div id="notice">
        Modifie ce code pour qu'il fonctionne correctement et que les
        informations de l'utilisateur soit affichées dans la div badge
      </div>
      <div className="badge">
        <img alt={name} src={img} />
        <div>
          <h4>{name}</h4>
          <p>@{handle}</p>
        </div>
      </div>
      <div>Date du jour: {getDate()}</div>
    </>
  );
}
