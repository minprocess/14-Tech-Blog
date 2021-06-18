const { Comment } = require('../models');

const commentData = [
  {
    text: 'Yes, MVC is important',
    articleId: 1,
    userId: 2
  },
  {
    text: 'I second that idea',
    articleId: 1,
    userId: 3
  },
  {
    text: 'I third that idea',
    articleId: 1,
    userId: 4
  },
  {
    text: 'I love authentication',
    articleId: 2,
    userId: 4
  },
  {
    text: 'I love ORM',
    articleId: 3,
    userId: 4
  }
];

const seedComments = () => Comment.bulkCreate(commentData);


module.exports = seedComments;
