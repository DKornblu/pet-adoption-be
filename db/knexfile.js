const path = require("path");
const pathToMigrations = path.resolve(__dirname, "../migrations");

module.exports = {
  client: "mysql",
  connection: {
    database: "petsdb",
    user: "root",
    // password: "root",
    // host: "localhost",
    // don't need password and host yet, will ned for deployment
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: pathToMigrations,
  },
};

