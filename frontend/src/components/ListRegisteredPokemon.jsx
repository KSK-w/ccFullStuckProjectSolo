import React from "react";
import "../styles/ListRegisteredPokemon.css";

export default function ListRegisteredPokemons({
  registeredPokemons,
  selectPokemon,
}) {
  return (
    <div className="ListRegisteredPokemon">
      {registeredPokemons.map((registeredPokemon, i) => {
        //登録されているポケモンの情報を一部表示
        //console.log(registeredPokemon);
        return (
          <div className="card" onClick={() => selectPokemon(i)} key={i}>
            <p>No.{registeredPokemon.ID}</p>
            <p>{registeredPokemon.name}</p>
          </div>
        );
      })}
    </div>
  );
}
