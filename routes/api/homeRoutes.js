const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth'); // Import the middleware

// Login Route
router.get('/login', (req, res) => {
    try {
      res.render('login');
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Signup Route
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Dashboard Route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const postData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        include: [{ model: User, attributes: ['username'] }],
      });
  
      const posts = postData.map(post => post.get({ plain: true }));
  
      res.render('dashboard', { 
        posts, 
        loggedIn: req.session.loggedIn 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/posts/new', withAuth, (req, res) => {
    res.render('post', {
      loggedIn: req.session.loggedIn,
    });
  });

// Route to get all posts
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [{ model: User, attributes: ['username'] }],
      });
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Route to get a single post by ID
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ['username'] },
          {
            model: Comment,
            include: [{ model: User, attributes: ['username'] }],
          },
        ],
      });
      if (postData) {
        const post = postData.get({ plain: true });
        res.render('post', { post, loggedIn: req.session.loggedIn });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });


// **Protect the dashboard route with withAuth middleware**
router.get('/dashboard', withAuth, async (req, res) => {
    try {
      // Your code to fetch dashboard data
      res.render('dashboard');
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;
