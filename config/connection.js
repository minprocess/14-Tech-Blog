const Sequelize = require('sequelize');
require('dotenv').config();

console.log("name ",process.env.DB_NAME, ",  user ",
  process.env.DB_USER, ",  pwd  ",
  process.env.DB_PASSWORD,)

  let sequelize;
  if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
      },
    );
  }

  module.exports = sequelize;
  
