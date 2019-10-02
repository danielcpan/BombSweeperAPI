module.exports = {
  development: {
    database: 'bomb_sweeper_development',
  },
  test: {
    database: 'bomb_sweeper_test',
  },
  production: {
    database: 'mongodb://heroku_k6vch9wx:2gmi26n2u4eq4bo1vf7b7sp4da@ds229068.mlab.com:29068/heroku_k6vch9wx',
  },
  PORT: process.env.PORT || 5000,
  PUBLIC_URL: process.env.PUBLIC_URL,
};
