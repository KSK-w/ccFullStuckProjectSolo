import React from "react";
import "../styles/navbar.css";
import _ from "lodash";

export default function Navbar({ returnHome, goAddPokemonPage }) {
  return (
    <div className="navbar">
      <button onClick={returnHome} className="navbar-header">
        ホーム
      </button>
      <button onClick={goAddPokemonPage} className="navbar-header">
        ポケモンの追加
      </button>
    </div>
  );
}
