const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  console.log("connection.js jawsdb")
  console.log(process.env.JAWSDB_URL)
  console.log("\n\n");
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  console.log("new sequelize on local pc")
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
