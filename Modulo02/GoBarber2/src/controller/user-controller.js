const Base = require('./base');
const UserModel = require('../models/User');

class User {
  constructor(context) {
    this.base = new Base(User);
    this.context = context;
  }
}

module.exports = User;
