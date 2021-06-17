const User = require('./User');
const Article = require('./Article');
const Comment = require('./Comment');

/*
Article.belongsTo(User, {
 foreignKey: 'user_id'
});

Article.hasMany(Comment, {
 foreignKey: 'article_id'
});

Comment.belongsTo(User, {
 foreignKey: 'user_id'
});
*/

// One user to many articles
User.hasMany(Article, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Article.belongsTo(User, {
  foreignKey: 'user_id'
});

// One user to many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

// One article has many comments
Article.hasMany(Comment, {
  foreignKey: 'article_id',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Article, {
  foreignKey: 'article_id'
})


//post has many comments
/*
https://blog.agney.dev/sequelize-associations/
To create associations, we have to use combinations of these together:

To create a One-to-One relationship, the hasOne and belongsTo associations are used together.
To create a One-to-Many relationship, the hasMany and belongsTo associations are used together.
To create a Many-to-Many relationship, two belongsToMany calls are used together.
*/

module.exports = { User, Article, Comment };
