import express from 'express';
import routes from '../routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json({ limit: '5mb' }));
    this.server.use(express.urlencoded({ limit: '5mb', extended: true }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server; // module.exports = new App().server;
