import React from "react";
import "../styles/navbar.css";

export default function Navbar({ returnHome, goAddPokemonPage }) {
  return (
    <div className="navbar">
      <img
        src="/header.png"
        alt="homeimage"
        width="150"
        onClick={returnHome}
        className="home-image"
      />
      <button onClick={goAddPokemonPage} className="add-button">
        <img src="/logo192.png" className="button-icon" alt="monsterball" />
        ポケモンの追加
      </button>
    </div>
  );
}
