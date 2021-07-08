// homeRoutes.js
// These routines are responsible for rendering the handlebar pages such
// as homepage.hbs, newpost.hbs, dashboard.hbs and so on

const router = require('express').Router();
const { Article, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
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

    const article = articleData.get({ plain: true });

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

  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
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

router.get('/newarticle', withAuth, async (req, res) => {
  res.render('newarticle')
});

router.get('/editarticle/:id', withAuth, async (req, res) => {
  try {
    const articleData = await Article.findByPk(req.params.id, {
      include: [ User, { model: Comment, include: [User]} ]
    });

    const article = articleData.get({ plain: true });

    const id = article.id;
    const title = article.title;
    const text = article.text;
    res.render('editarticle', {
      id, title, text, logged_in: true
     });
  } catch(err) {
    console.log("err");
    console.log(err)
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID

    const userData = await User.findOne(
      {where: {id: req.session.user_id }
    });

    const user = userData.get({ plain: true });
    let username = user.name

    const articleData = await Article.findAll(
      {where: { user_id: req.session.user_id }
    });

    // Serialize data so the template can read it
    const articles = articleData.map((article) => article.get({ plain: true }));
    
    // Pass serialized data and session flag into template
    res.render('dashboard', { 
      articles, username, logged_in: true
    });

  } catch (err) {
    console.log("err");
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
