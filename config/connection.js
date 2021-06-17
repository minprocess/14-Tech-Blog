const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  console.log("connection.js jawsdb")
  console.log(process.env.JAWSDB_URL)
  console.log("\n\n");
//  sequelize = new Sequelize(process.env.JAWSDB_URL);
  sequelize = new Sequelize(
    'q8d1de789dtvy7lq',
    'dgb7xflqhb3s0vzp',
    'dmhg77tj26k52y1j',
    {
      host: 'y5svr1t2r5xudqeq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mysql',
      port: 3306
    }
  );

/*
Host	y5svr1t2r5xudqeq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	
Username	dgb7xflqhb3s0vzp
Password	dmhg77tj26k52y1j
Port	3306
Database	q8d1de789dtvy7lq
*/

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
