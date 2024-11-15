import React from "react";
import _ from "lodash";
import "../styles/DetailPokemon.css";

export default function DetailPokemon({ selectedPokemon, calculateStatus }) {
  let realStatus = calculateStatus(selectedPokemon);
  return (
    <>
      <div className="pokemonDetail">
        <div className="pokemonTitle">
          ID: {selectedPokemon.ID}の {selectedPokemon.name} （レベル:{" "}
          {selectedPokemon.level}）を表示しています
        </div>
        <table className="table" />
        <thead>
          <tr>
            <th>能力</th>
            <th>種族値</th>
            <th>努力値</th>
            <th>個体値</th>
            <th>性格補正</th>
            <th>実数値</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(selectedPokemon).map((status) => {
            if (["ID", "name", "level"].includes(status)) return null;
            const { base, EV, IV, Nature } = selectedPokemon[status];
            return (
              <tr key={status}>
                <td>{status}</td>
                <td>{base}</td>
                <td>{EV}</td>
                <td>{IV}</td>
                <td>{Nature ? `性格補正 ${Nature}` : "性格補正なし"}</td>
                <td>{realStatus[status]}</td>
              </tr>
            );
          })}
        </tbody>
      </div>
    </>
  );
}
