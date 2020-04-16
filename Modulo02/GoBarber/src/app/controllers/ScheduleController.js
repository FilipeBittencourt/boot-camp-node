import { endOfDay, parseISO, startOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Appointments from '../models/AppointmentModel';
import User from '../models/UserModel';

class ScheduleController {
  async index(req, res) {
    // Check date availibility
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });
    if (!checkUserProvider) {
      return res.status(400).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);
    // const appointments = await Appointments.findAll();

    const appointments = await Appointments.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.status(200).json(appointments);
  }
}

export default new ScheduleController();
