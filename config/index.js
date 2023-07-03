const server = require('./server');
const mongo = require('./mongo');

module.exports = {
  ...server,
  ...mongo,
};
