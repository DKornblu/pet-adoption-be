/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("savedPets", (table) => {
          table.increments("id").primary(); // auto-increment intgr primary key column
          table.integer('pet_id').unsigned().notNullable(); //unsigned- only positive values, notnullable- required column
          table.integer('user_id').unsigned().notNullable();
  
          // foreign key contraints- ensure values in pet/user_id exist as primary id's in the referenced tables
          table.foreign('pet_id').references('pets.id');
          table.foreign('user_id').references('users.id');
          
          table.timestamp("created_at").defaultTo(knex.fn.now());
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable("savedPets");
  };
  