// Migrations are like version control for db, allows for tracking changes made to db tables

// These are comments describing the params and return of the up/down funcs. The param is the knex object used to interact with the db, and the return value is a Promise that resolves when the migration is complete
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Up func is called when migration is run, this is where you create/modify db tables or other schema changes
exports.up = function(knex) {
    return knex.schema.createTable("users2", (table) => {
        table.increments("id").primary(); // auto-increment int primary key column
        table.string("first_name");
        table.string("last_name");
        table.string("email").unique();
        table.string("password");
        table.string("phone");
        table.boolean("isAdmin").defaultTo(false);
        table.text("bio");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// down func is called when migration is rolled back, this is to undo changes made by up func
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
