import Sequelize from 'sequelize';
import Mongoose from 'mongoose';

import dataBaseConfig from '../config/database';
import User from '../app/models/UserModel';
import File from '../app/models/FileModel';
import Appointments from '../app/models/AppointmentModel';

const models = [User, File, Appointments];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }

  mongo() {
    this.mongoConnection = Mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      userFindAndModify: true,
    });
  }
}

export default new Database();
