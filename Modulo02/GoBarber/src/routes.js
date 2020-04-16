import { Router } from 'express';
import Multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentsController from './app/controllers/AppointmentsController';
import ScheduleController from './app/controllers/ScheduleController';
import AuthUser from './app/middlewares/AuthUser';

const routes = new Router();
const upload = new Multer(multerConfig);

routes.post('/users', UserController.create);
routes.post('/sessions', SessionController.create);

routes.use(AuthUser);

routes.post('/appointments', AppointmentsController.store);
routes.get('/appointments', AppointmentsController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/providers', ProviderController.index);

routes.put('/users/:id', UserController.update);
routes.get('/users', UserController.index);

routes.get('/schedule', ScheduleController.index);

export default routes;
