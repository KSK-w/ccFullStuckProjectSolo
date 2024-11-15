const pokemonModel = require("../models/pokemonModel");

exports.getAllPokemons = async (req, res) => {
  try {
    const pokemons = await pokemonModel.findAll();
    res.status(200).json(pokemons);
  } catch (err) {
    res.status(500).json({ error: "Failed to get pokemons" });
  }
};
