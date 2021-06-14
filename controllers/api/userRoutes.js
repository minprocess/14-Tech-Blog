const router = require('express').Router();
const { User } = require('../../models');

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

router.post('/login', async (req, res) => {
  try {
    console.log("req.body.email", req.body.email)
    const userData = await User.findOne({ where: { email: req.body.email } });
    const user = userData.get({ plain: true });
    console.log("router.post('/login',");
    console.log("user");
    console.log (user);
    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    console.log("req.body.password", req.body.password)
    console.log("user.id", user.id);
    let validPassword = false;
    if (user.password === req.body.password) { validPassword = true; }
    //const validPassword = await userData.checkPassword(req.body.password);
    console.log("validPassword", validPassword);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log("before session.save")
    req.session.save(() => {
      console.log("in session.save")
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
