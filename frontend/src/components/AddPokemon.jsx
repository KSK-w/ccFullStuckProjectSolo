import React, { useState, useEffect } from "react";
import "../styles/AddPokemon.css";

export default function AddPokemon({ calculateStatus, registerPokemon }) {
  const [newPokemon, setNewPokemon] = useState({
    ID: 0,
    name: "Garchomp",
    level: 50,
    HP: {
      base: 108,
      EV: 0,
      IV: 31,
    },
    Atk: {
      base: 130,
      EV: 252,
      IV: 31,
      Nature: "",
    },
    Def: {
      base: 95,
      EV: 0,
      IV: 31,
      Nature: "",
    },
    SpA: {
      base: 80,
      EV: 0,
      IV: 31,
      Nature: "-",
    },
    SpD: {
      base: 85,
      EV: 0,
      IV: 31,
      Nature: "",
    },
    Spe: {
      base: 102,
      EV: 252,
      IV: 31,
      Nature: "+",
    },
  });
  const [currentStatus, setCurrentStatus] = useState(
    calculateStatus(newPokemon)
  );

  useEffect(() => {
    setCurrentStatus(calculateStatus(newPokemon));
  }, [newPokemon, calculateStatus]);

  return (
    <div className="pokemonDetail">
      <div className="pokemonTitle">
        追加するポケモンの情報を入力してください！
      </div>

      <div>基本情報</div>
      <table className="table">
        <thead>
          <tr>
            <th>ポケモン名</th>
            <th>レベル</th>
          </tr>
        </thead>
        <tbody>
          <tr key="basicInfo">
            {["name", "level"].map((status, index) => (
              <td key={status}>
                <input
                  className="inputBasicInfo "
                  type="text"
                  value={newPokemon[status]}
                  onChange={(e) => {
                    setNewPokemon((prev) => ({
                      ...prev,
                      [status]:
                        status === "level"
                          ? Number(e.target.value)
                          : e.target.value,
                    }));
                  }}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div>詳細ステータス</div>
      <table className="table">
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
          {Object.keys(newPokemon).map((status) => {
            if (["ID", "name", "level"].includes(status)) return null;
            const { base, EV, IV, Nature } = newPokemon[status];
            return (
              <tr key={status}>
                <td>{status}</td>
                <td>
                  <input
                    className="inputStatus"
                    type="number"
                    value={base}
                    onChange={(e) => {
                      setNewPokemon((prev) => ({
                        ...prev,
                        [status]: {
                          ...prev[status],
                          base: Number(e.target.value),
                        },
                      }));
                    }}
                  />
                </td>
                <td>
                  <input
                    className="inputStatus"
                    type="number"
                    value={EV}
                    onChange={(e) => {
                      setNewPokemon((prev) => ({
                        ...prev,
                        [status]: {
                          ...prev[status],
                          EV: Number(e.target.value),
                        },
                      }));
                    }}
                  />
                </td>
                <td>
                  <input
                    className="inputStatus"
                    type="number"
                    value={IV}
                    onChange={(e) => {
                      setNewPokemon((prev) => ({
                        ...prev,
                        [status]: {
                          ...prev[status],
                          IV: Number(e.target.value),
                        },
                      }));
                    }}
                  />
                </td>
                <td>
                  {status !== "HP" ? (
                    <input
                      className="inputStatus"
                      type="text"
                      value={Nature}
                      onChange={(e) => {
                        setNewPokemon((prev) => ({
                          ...prev,
                          [status]: {
                            ...prev[status],
                            Nature: e.target.value,
                          },
                        }));
                      }}
                    />
                  ) : (
                    <p>性格補正なし</p>
                  )}
                </td>
                <td>{currentStatus[status]}</td>
              </tr>
            );
          })}
          <tr className="footer" key="constraints">
            <td>制約</td>
            <td>-</td>
            <td>0～255</td>
            <td>0～31</td>
            <td>
              上方：+ <br /> 下方：- <br /> その他：空欄
            </td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => registerPokemon(newPokemon)}>
        この情報で登録する
      </button>
    </div>
  );
}
