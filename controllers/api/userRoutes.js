const router = require('express').Router();
const { User } = require('../../models');

// Add a new user to database
router.post('/', async (req, res) => {
  console.log("\n\nuserroutes .post('/'")
  console.log("req.body")
  console.log(req.body)
  try {
    const userData = await User.create(req.body);
    console.log("\nuserroutes userData")
    console.log(userData)

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log("\n login req")
  console.log(req.body)
  try {
    const userData = await User.findOne({ where: { name: req.body.name } });
    const user = userData.get({ plain: true });

    if (!user) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      return;
    }
    console.log("user.password", user.password)
    console.log("req.body.password", req.body.password)
    //let validPassword = false;
    //if (user.password === req.body.password) { validPassword = true; }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect name or password, please try again' });
      return;
    }

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
