const router = require('express').Router();
const { User } = require('../../models');

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;

      res.redirect('/dashboard'); // Redirect after successful signup
    });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ message: 'Username or email already exists, please choose another.' });
    } else {
      res.status(500).json(err);
    }
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
      const userData = await User.findOne({ where: { username: req.body.username } });

      if (!userData) {
          res.status(400).json({ message: 'Incorrect username or password, please try again' });
          return;
      }

      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect username or password, please try again' });
          return;
      }

      req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.loggedIn = true;
          res.json({ user: userData, message: 'You are now logged in!' });
      });

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

