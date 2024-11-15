/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pokemons", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("level").notNullable();
    table.integer("HP_base").notNullable();
    table.integer("HP_EV").notNullable();
    table.integer("HP_IV").notNullable();
    table.integer("Atk_base").notNullable();
    table.integer("Atk_EV").notNullable();
    table.integer("Atk_IV").notNullable();
    table.string("Atk_nature").notNullable();
    table.integer("Def_base").notNullable();
    table.integer("Def_EV").notNullable();
    table.integer("Def_IV").notNullable();
    table.string("Def_nature").notNullable();
    table.integer("SpA_base").notNullable();
    table.integer("SpA_EV").notNullable();
    table.integer("SpA_IV").notNullable();
    table.string("SpA_nature").notNullable();
    table.integer("SpD_base").notNullable();
    table.integer("SpD_EV").notNullable();
    table.integer("SpD_IV").notNullable();
    table.string("SpD_nature").notNullable();
    table.integer("Spe_base").notNullable();
    table.integer("Spe_EV").notNullable();
    table.integer("Spe_IV").notNullable();
    table.string("Spe_nature").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pokemons");
};
