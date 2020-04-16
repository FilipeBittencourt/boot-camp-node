const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const port = 3333;

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use((req, res, next) => {
  console.time('Request');
  console.log(`Metodo: ${req.method}, URL: ${req.url} `);
  next();
  console.timeEnd('Request');
});

app.listen(port, () => {
  console.log(`Server online... port ${port}`);
});

app.use(routes);

module.exports = app;
