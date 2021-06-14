const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    text: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    article_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize
  }
);

module.exports = Comment;

/*
      references: {
        model: 'article',
        key: 'id',
      },
*/