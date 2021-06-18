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
    userId: {
      type: DataTypes.INTEGER,
    },
    articleId: {
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