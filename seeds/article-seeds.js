const { Article } = require('../models');

const articleData = [
  {
    title: "Why MVC is so important",
    text: 'MVC allows developers to maintain a true separation of concerns, devising their code betwen the Model layer for data, the View layer for design, and the Controller layer for application logic. by Xandromus',
    userId: 1
  },
  {
    title: "Authentication vs Authorization",
    text: 'There is a difference between authentication and authorization. Authenication means confirming your own identiity, whereas authorization means being allowed access to the system. by Xandromus',
    userId: 1
  },
  {
    title: "Object-Relational Mapping",
    text: "I have really loved learning about ORMS It's really simplified the way I create queries in SQL. by Lernantino",
    userId: 3
  }
];

const seedArticles = () => Article.bulkCreate(articleData);

module.exports = seedArticles;
