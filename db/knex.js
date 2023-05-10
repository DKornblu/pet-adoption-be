// Knex.js is an SQL builder, instead of writing raw SQL queries
// import knex and config, then initialize knex and save to variable dbConnection to communicate with our db
const knex = require("knex");
const knexConfig = require("./knexfile");
const dbConnection = knex(knexConfig);

// With dbConnection I can query and perform migrations through my app
module.exports = dbConnection; 