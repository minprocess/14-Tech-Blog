const User = require('./User');
const Project = require('./Project');
const Article = require('./Article');
const Comment = require('./Comment');

User.hasMany(Project, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

// One user to many articles
User.hasMany(Article, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Article.belongsTo(User, {
  foreignKey: 'userId'
});

// One user to many comments
User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
  foreignKey: 'userId'
});

// One article has many comments
Article.hasMany(Comment, {
  foreignKey: 'articleId',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Article, {
  foreignKey: 'articleId'
})


//post has many comments
/*
https://blog.agney.dev/sequelize-associations/
To create associations, we have to use combinations of these together:

To create a One-to-One relationship, the hasOne and belongsTo associations are used together.
To create a One-to-Many relationship, the hasMany and belongsTo associations are used together.
To create a Many-to-Many relationship, two belongsToMany calls are used together.
*/

module.exports = { User, Project };
