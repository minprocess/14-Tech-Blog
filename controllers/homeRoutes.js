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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  console.log("homeroutes.js .get('/profile'");
/*
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });
    console.log("homeroutes.js .get('/profile' res.render('profile',")
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
  */
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

router.get('/dashboard', async (req, res) => {
  console.log("homeroutes.js .get('/dashboard' req.session.user_id", req.session.user_id);
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Article }],
    });
/*
    const userData = await User.findOne(
      {where: {id: req.session.user_id },
      include: [{ model: Article }],
    });
    */
    console.log("userData");
    console.log(userData);
    const user = userData.map((user) => user.get({ plain: true }));
    console.log("user");
    console.log(user);

/*
    let username = user.name
    console.log("user")
    console.log(username)

    // Get all projects and JOIN with user data
    //const project = await Project.findOne({ where: { title: 'My Title' } });
    const articleData = await Article.findAll({ where: { user_id: req.session.user_id }
    });

    // Serialize data so the template can read it
    const articles = articleData.map((article) => article.get({ plain: true }));
    
    console.log("\n");
    console.log("\n");
    console.log("articles")
    console.log(articles)
*/
    // Pass serialized data and session flag into template
    res.render('dashboard1');
    /*
    res.render('dashboard', { 
      articles, username
    });
    */
  } catch (err) {
    console.log("err");
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/yyydashboard', async (req, res) => {
  console.log("homeroutes.js .get('/dashboard' req.session.user_id", req.session.user_id);
  try {
    const user = await User.findOne({where: {id: req.session.user_id }
    });
    //const user = userData.map((user) => user.get({ plain: true }));

    let username = user.name
    console.log("user")
    console.log(username)

    // Get all projects and JOIN with user data
    //const project = await Project.findOne({ where: { title: 'My Title' } });
    const articleData = await Article.findAll({ where: { user_id: req.session.user_id }
    });

    // Serialize data so the template can read it
    const articles = articleData.map((article) => article.get({ plain: true }));
    
    console.log("\n");
    console.log("\n");
    console.log("articles")
    console.log(articles)

    // Pass serialized data and session flag into template
    res.render('dashboard1', { 
      articles, username
    });
    /*
    res.render('dashboard', { 
      articles, username
    });
    */
  } catch (err) {
    console.log("err");
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
