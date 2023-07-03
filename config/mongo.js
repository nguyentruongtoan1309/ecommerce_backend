module.exports = {
  mongo: {
    database: process.env.DB_CONNECTION_STRING || 'mongodb+srv://trinhphuongdev:xjJx9zdpdfLS2JCI@cluster0.xrdmevl.mongodb.net/batch-29-30-database',
    options: {
      useNewUrlParser: true,
    },
  },
};
