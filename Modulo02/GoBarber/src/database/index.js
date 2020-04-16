import Sequelize from 'sequelize';

import dataBaseConfig from '../config/database';
import User from '../app/models/UserModel';
import File from '../app/models/FileModel';
import Appointments from '../app/models/AppointmentModel';

const models = [User, File, Appointments];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dataBaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
