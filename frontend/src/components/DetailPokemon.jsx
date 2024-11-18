import React, { useState, useEffect } from "react";
import "../styles/DetailPokemon.css";

export default function DetailPokemon({
  selectedPokemon,
  calculateStatus,
  deletePokemon,
  updatePokemon,
}) {
  const [currentPokemon, setNewPokemon] = useState(selectedPokemon);
  const [currentStatus, setCurrentStatus] = useState(
    calculateStatus(currentPokemon)
  );

  useEffect(() => {
    setCurrentStatus(calculateStatus(currentPokemon));
  }, [currentPokemon, calculateStatus]);

  return (
    <>
      <div className="pokemonDetail">
        <div className="pokemonTitle">
          ID: {selectedPokemon.ID}の {selectedPokemon.name} （レベル:
          {selectedPokemon.level}）を表示しています
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
                      value={currentPokemon[status]}
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
              {Object.keys(currentPokemon).map((status) => {
                if (["ID", "name", "level"].includes(status)) return null;
                const { base, EV, IV, Nature } = currentPokemon[status];
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
          <button
            onClick={() => {
              const isConfirmed =
                window.confirm("本当に削除してもよろしいですか？");
              if (isConfirmed) {
                deletePokemon(selectedPokemon);
              }
            }}
          >
            このポケモンを削除する
          </button>
          <button
            onClick={() => {
              const isConfirmed = window.confirm(
                "入力された内容でこのポケモンを更新してもよろしいですか？"
              );
              if (isConfirmed) {
                updatePokemon(currentPokemon);
              }
            }}
          >
            現在の情報でこのポケモンを更新する
          </button>
        </div>
      </div>
    </>
  );
}
