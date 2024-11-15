/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("pokemons").del();
  await knex("pokemons").insert([
    {
      id: 1,
      name: "Sinistcha",
      level: 50,
      HP_base: 71,
      HP_EV: 252,
      HP_IV: 31,

      Atk_base: 60,
      Atk_EV: 0,
      Atk_IV: 0,
      Atk_nature: "-",

      Def_base: 106,
      Def_EV: 100,
      Def_IV: 31,
      Def_nature: "",

      SpA_base: 121,
      SpA_EV: 0,
      SpA_IV: 31,
      SpA_nature: "",

      SpD_base: 80,
      SpD_EV: 156,
      SpD_IV: 31,
      SpD_nature: "+",

      Spe_base: 70,
      Spe_EV: 0,
      Spe_IV: 31,
      Spe_nature: "",
    },
    {
      id: 2,
      name: "Dragonite",
      level: 50,
      HP_base: 91,
      HP_EV: 4,
      HP_IV: 31,

      Atk_base: 134,
      Atk_EV: 252,
      Atk_IV: 31,
      Atk_nature: "+",

      Def_base: 95,
      Def_EV: 0,
      Def_IV: 31,
      Def_nature: "",

      SpA_base: 100,
      SpA_EV: 0,
      SpA_IV: 31,
      SpA_nature: "-",

      SpD_base: 100,
      SpD_EV: 0,
      SpD_IV: 31,
      SpD_nature: "",

      Spe_base: 80,
      Spe_EV: 252,
      Spe_IV: 31,
      Spe_nature: "",
    },
  ]);
};
