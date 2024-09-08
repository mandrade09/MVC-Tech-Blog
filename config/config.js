module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'blog_db',
    host: '127.0.0.1',
    dialect: 'postgres', // Make sure this is correct
  },
  test: {
    username: 'root',
    password: null,
    database: 'blog_db_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'blog_db_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};


