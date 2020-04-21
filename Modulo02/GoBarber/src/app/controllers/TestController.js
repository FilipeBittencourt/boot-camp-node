import express from 'express';

const routerUser = express.Router();

/* GET users listing. */
routerUser.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

export default routerUser;
