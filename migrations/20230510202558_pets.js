/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("pets", (table) => {
        table.increments("id").primary(); // auto-increment intgr primary key column
        table.string("type").notNull();
        table.string("name").notNull();
        table.string("adoptionStatus").notNull();
        table.string("picture").notNull();
        table.string("breed");
        table.float("height");
        table.float("weight");
        table.string("color");
        table.text("bio");
        table.boolean("hypoallergenic");
        table.string("dietary");
        table.string("ownerId");
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("pets");
};
