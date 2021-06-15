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

    console.log("\n\narticles.Comments");
    console.log(articles[0].Comments[0].User.name);
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
//      include: [ {model: User, attributes: ['n]ame'}, {model: Comment, attributes: ['text'] }],
    //});

    /*
     include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    */

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

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Article }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/dashboard', async (req, res) => {
  console.log("dashboard req.session.user_id", req.session.user_id);
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
