const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log("homeroutes.js get('/'")
    // Get all projects and JOIN with user data
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        },
        { model: Comment,
          attributes:['text'], 
          include: [
            {
              model:User, 
              attributes:['name']
            }
          ]
        }
      ],
    });

    // Serialize data so the template can read it
    const articles = articleData.map((article) => article.get({ plain: true }));

    console.log("\n\nhomeroutes.js  req.session.logged_in")
    console.log(articles)

    //consoln.log("\n\narticles.Comments");
    //console.log(articles[0].Comments[0].User.name);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      articles, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log("err");
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/article/:id', async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [ User, { model: Comment, include: [User]} ]
    });
/*
    // Get all projects and JOIN with user data
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        },
        { model: Comment,
          attributes:['text'], 
          include: [
            {
              model:User, 
              attributes:['name']
            }
          ]
        }
      ],
    });

*/
    const article = articleData.get({ plain: true });

    console.log("...article");
    console.log(article);

    res.render('article', {
      ...article,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log("err");
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  console.log("homeroutes.js .get('/login'");

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    console.log("homeroutes.js .get('/login' res.redirect('/dashboard',")
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// Can only get here from login dialog
router.get('/signup', (req, res) => {
  console.log("homeroutes.js .get('/signup'");

  res.render('signup');
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  console.log("homeroutes.js .get('/dashboard' req.session.user_id", req.session.user_id);
  try {
    // Find the logged in user based on the session ID
/*    
    const userData2 = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Article }],
    });
    console.log("/n/n .get('/dashboard' userData");
    console.log(userData2);
*/
    const userData = await User.findOne(
      {where: {id: req.session.user_id },
    });
    console.log("/n/n .get('/dashboard' userData");
    console.log(userData);

    const user = userData.get({ plain: true });
    //const user = userData.map((user) => user.get({ plain: true }));
    console.log("/n/n user");
    console.log(user);
    let username = user.name
/*

    console.log("user")
    console.log(username)

    // Get all projects and JOIN with user data
    //const project = await Project.findOne({ where: { title: 'My Title' } });
    
    console.log("\n");
    console.log("\n");
    console.log("articles")
    console.log(articles)
*/
    const articleData = await Article.findAll({ where: { user_id: req.session.user_id }
    });

    // Serialize data so the template can read it
    const articles = articleData.map((article) => article.get({ plain: true }));
    console.log(articles);
    
    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      articles, username
    });

  } catch (err) {
    console.log("err");
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
