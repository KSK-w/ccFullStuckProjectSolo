import "./App.css";
import Navbar from "./components/Navbar";
import DetailPokemon from "./components/DetailPokemon";
import ListRegisteredPokemon from "./components/ListRegisteredPokemon";
import React, { useCallback, useState, useEffect } from "react";
import AddPokemon from "./components/AddPokemon";

function App() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  const [registeredPokemons, setRegisteredPokemons] = useState([]);
  const [currentView, setCurrentView] = useState("AllPokemons");
  const [selectedPokemon, setSelectedPokemon] = useState();

  //ポケモンデータをDBから取得する関数
  const fetchPokemons = useCallback(async () => {
    const res = await fetch(`${baseUrl}/pokemons`);
    if (!res.ok) {
      throw new Error("エラーが発生しました");
    }
    const data = await res.json();

    const tempPokemons = data.map((flatPokemon) =>
      flattenToNested(flatPokemon)
    );
    setRegisteredPokemons(tempPokemons);
  }, [baseUrl]);

  //ポケモンデータの初期取得
  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  //一覧からポケモンを選択すると、そのポケモンのViewに切り替え
  function selectPokemon(index) {
    const pokemon = registeredPokemons[index];
    setSelectedPokemon(pokemon);
    setCurrentView("DetailPokemon");
  }

  //各項目からポケモンのステータス実数値を計算
  function calculateStatus(pokemon) {
    let status = {};
    Object.keys(pokemon).map((key) => {
      if (key !== "ID" && key !== "level" && key !== "name") {
        if (key === "HP") {
          status[key] =
            Math.floor(
              ((pokemon[key]["base"] * 2 +
                pokemon[key]["IV"] +
                Math.floor(pokemon[key]["EV"]) / 4) *
                pokemon["level"]) /
                100
            ) +
            pokemon["level"] +
            10;
        } else {
          let natureRatio = 1;
          if (pokemon[key]["Nature"] === "+") {
            natureRatio = 1.1;
          } else if (pokemon[key]["Nature"] === "-") {
            natureRatio = 0.9;
          }
          status[key] = Math.floor(
            Math.floor(
              ((pokemon[key]["base"] * 2 +
                pokemon[key]["IV"] +
                Math.floor(pokemon[key]["EV"]) / 4) *
                pokemon["level"]) /
                100 +
                5
            ) * natureRatio
          );
        }
      }
    });
    return status;
  }

  //どの画面にいても初期画面に帰る
  function returnHome() {
    setCurrentView("AllPokemons");
  }

  //ポケモン追加の画面に切り替え
  function goAddPokemonPage() {
    setCurrentView("AddPokemons");
  }

  //現在画面に表示されているポケモンを情報として追加
  async function registerPokemon(pokemon) {
    //IDの採番
    pokemon.ID = registeredPokemons.length + 1;
    try {
      // バックエンドのAPIにポケモンデータを送信
      const res = await fetch(`${baseUrl}/pokemons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nestedToFlattened(pokemon)),
      });

      if (!res.ok) {
        throw new Error("ポケモンの登録に失敗しました");
      }
      //フロント側のstateに登録
      setRegisteredPokemons((currentRegisteredPokemons) => [
        ...currentRegisteredPokemons,
        pokemon,
      ]);
      returnHome();
    } catch (error) {
      console.error("登録エラー:", error);
    }
  }

  //バックで取得したflatな形式をフロント向けにnestedに加工
  function flattenToNested(flatObj) {
    const nestedObj = {
      ID: flatObj.id,
      name: flatObj.name,
      level: flatObj.level,
      HP: { base: flatObj.HP_base, EV: flatObj.HP_EV, IV: flatObj.HP_IV },
      Atk: {
        base: flatObj.Atk_base,
        EV: flatObj.Atk_EV,
        IV: flatObj.Atk_IV,
        Nature: flatObj.Atk_nature,
      },
      Def: {
        base: flatObj.Def_base,
        EV: flatObj.Def_EV,
        IV: flatObj.Def_IV,
        Nature: flatObj.Def_nature,
      },
      SpA: {
        base: flatObj.SpA_base,
        EV: flatObj.SpA_EV,
        IV: flatObj.SpA_IV,
        Nature: flatObj.SpA_nature,
      },
      SpD: {
        base: flatObj.SpD_base,
        EV: flatObj.SpD_EV,
        IV: flatObj.SpD_IV,
        Nature: flatObj.SpD_nature,
      },
      Spe: {
        base: flatObj.Spe_base,
        EV: flatObj.Spe_EV,
        IV: flatObj.Spe_IV,
        Nature: flatObj.Spe_nature,
      },
    };
    return nestedObj;
  }

  //フロントで入力されたnestedな形式をバック向けにflatに加工
  function nestedToFlattened(nestedObj) {
    const flatObj = {
      id: nestedObj.ID,
      name: nestedObj.name,
      level: nestedObj.level,
      HP_base: nestedObj.HP.base,
      HP_EV: nestedObj.HP.EV,
      HP_IV: nestedObj.HP.IV,
      Atk_base: nestedObj.Atk.base,
      Atk_EV: nestedObj.Atk.EV,
      Atk_IV: nestedObj.Atk.IV,
      Atk_nature: nestedObj.Atk.Nature,
      Def_base: nestedObj.Def.base,
      Def_EV: nestedObj.Def.EV,
      Def_IV: nestedObj.Def.IV,
      Def_nature: nestedObj.Def.Nature,
      SpA_base: nestedObj.SpA.base,
      SpA_EV: nestedObj.SpA.EV,
      SpA_IV: nestedObj.SpA.IV,
      SpA_nature: nestedObj.SpA.Nature,
      SpD_base: nestedObj.SpD.base,
      SpD_EV: nestedObj.SpD.EV,
      SpD_IV: nestedObj.SpD.IV,
      SpD_nature: nestedObj.SpD.Nature,
      Spe_base: nestedObj.Spe.base,
      Spe_EV: nestedObj.Spe.EV,
      Spe_IV: nestedObj.Spe.IV,
      Spe_nature: nestedObj.Spe.Nature,
    };
    return flatObj;
  }

  return (
    <div className="App">
      <Navbar returnHome={returnHome} goAddPokemonPage={goAddPokemonPage} />
      {currentView === "AllPokemons" ? (
        <ListRegisteredPokemon
          registeredPokemons={registeredPokemons}
          selectPokemon={selectPokemon}
        />
      ) : currentView === "DetailPokemon" ? (
        <DetailPokemon
          selectedPokemon={selectedPokemon}
          calculateStatus={calculateStatus}
        />
      ) : (
        <AddPokemon
          calculateStatus={calculateStatus}
          registerPokemon={registerPokemon}
        />
      )}
    </div>
  );
}

export default App;
