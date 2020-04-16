const { Router } = require('express');

const routes = new Router();

const checkTest = (req, res, next) => {
  next();
};

routes.use('/teste', checkTest, require('./src/api/teste-api'));
routes.use('/users', require('./src/api/user-api'));

module.exports = routes;
