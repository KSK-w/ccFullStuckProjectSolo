const express = require("express");
const morgan = require("morgan");
const app = express();
const healthCheckRoutes = require("./routes/healthCheckRoutes");
const todoRoutes = require("./routes/pokemonRoutes");
const knex = require("./db/knex");
const logger = require("./middleware/logger");
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
app.use(logger);
app.use(cors());

// /api/health
app.use("/api/health", healthCheckRoutes);

// /api/todos
// app.use('/api/todos', todoRoutes)

//getでポケモンの情報を返す
app.get("/api/pokemons", async (req, res) => {
  try {
    const pokemons = await knex("pokemons").select("*");
    console.log(pokemons);
    res.status(200).json(pokemons);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ error: "Failed to get pokemons" });
  }
});

//postでポケモンの情報を登録する
app.post("/api/pokemons", async (req, res) => {
  try {
    const result = await knex("pokemons").insert(req.body);
    const pokemons = await knex("pokemons").select("*");
    console.log(pokemons);
    res.status(200).json({ message: "Succeed to register pokemon" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ error: "Failed to register pokemon" });
  }
});

module.exports = app;
