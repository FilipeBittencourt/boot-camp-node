const express = require('express');

const router = express.Router();

router.route('/').get((req, res, next) => {
  res.status(200).send('vc chamou get');
  next();
});

router.route('/:id').get((req, res, next) => {
  res.status(200).send('vc chamou get com Id');
  next();
});

router.route('/').post((req, res, next) => {
  res.status(200).send('vc chamou post');
  next();
});

router.route('/:id').put((req, res, next) => {
  res.status(200).send('vc chamou put');
  next();
});

router.route('/:id').delete((req, res, next) => {
  res.status(200).send('vc chamou delete');
  next();
});

module.exports = router;
