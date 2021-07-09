const router = require('express').Router();
const { User } = require('../../models');

// Add a new user to database using name and password from signin.hbs
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User login from login.hbs
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
    const user = userData.get({ plain: true });

    if (!user) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    // Use this function because req.body.password is encrypted
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      return;
    }

    // expression-session is going to keep our login id
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log("err in login.js", err)
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
