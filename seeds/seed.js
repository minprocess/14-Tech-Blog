const seedArticles = require('./article-seeds');
const seedComments = require('./comment-seeds');
const seedUsers = require('./user-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');  
  }
  catch (err) {
    console.log("sequelize.sync err");
    console.log(err);
    return;
  }

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');  

  await seedArticles();
  console.log('\n----- ARTICLES SEEDED -----\n');  
  

  await seedComments();
  console.log('\n----- COMMENTS SEEDED -----\n');
};

seedAll();
