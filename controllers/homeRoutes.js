const router = require('express').Router();
const { Article, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const articleData = await Article.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const articles = articleData.map((project) => project.get({ plain: true }));

    console.log("\n");
    console.log("controllers/api/homeRoutes.js .get('/'");
    console.log("\n");

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
    console.log("controllers/homeRoutes.js .get('/article/:id'");    
    const articleData = await Article.findByPk(req.params.id, {
        include: [{ model: Comment, attributes: ['text'] }],
    });
    console.log("articleData"); 
    console.log(articleData); 

    const article = articleData.get({ plain: true });

    console.log("\n");
    console.log("controllers/homeRoutes.js .get('article/:id'");
    console.log(article);
    console.log("\n");    

    res.render('article', {
      ...article,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
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

module.exports = router;
