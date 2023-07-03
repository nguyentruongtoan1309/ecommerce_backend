module.exports = {
  mongo: {
    database: process.env.DB_CONNECTION_STRING || 'mongodb://localhost/shop',
    options: {
      useNewUrlParser: true,
    },
  },
};
