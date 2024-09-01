const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const userRoutes = require('./routes/api/userRoutes');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

const sessionStore = new SequelizeStore({
  db: sequelize,
});
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
}));

app.use(express.static('public'));

// Set up Handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use(require('./routes/api/homeRoutes'));
app.use('/api/users', require('./routes/api/userRoutes'));
app.use('/api/posts', require('./routes/api/postRoutes'));
app.use('/api/comments', require('./routes/api/commentRoutes'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
