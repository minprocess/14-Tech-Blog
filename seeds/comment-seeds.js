const { Comment } = require('../models');

const commentData = [
  {
    text: 'Yes, MVC is important',
    article_id: 1,
    user_id: 2
  },
  {
    text: 'I love authentication',
    article_id: 2,
    user_id: 4
  },
  {
    text: 'I love ORM',
    article_id: 3,
    user_id: 4
  }
];

const seedComments = () => Comment.bulkCreate(commentData);


module.exports = seedComments;
