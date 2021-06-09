const { Comment } = require('../models');

const commentData = [
  {
    id: 1,
    text: 'Yes, MVC is important',
    articleId: 1,
    userID: 2
  },
  {
    id: 2,
    text: 'I love authentication',
    articleId: 2,
    userID: 4
  },
  {
    id: 3,
    text: 'I love ORM',
    articleId: 3,
    userID: 4
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
