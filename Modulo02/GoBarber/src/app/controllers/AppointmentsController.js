import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import File from '../models/FileModel';
import Appointments from '../models/AppointmentModel';
import User from '../models/UserModel';

class AppointmentsController {
  async index(req, res) {
    const { page = 1 } = req.query;
    try {
      const appointments = await Appointments.findAll({
        where: { user_id: req.userId, canceled_at: null },
        order: ['date'],
        attributes: ['id', 'date'],
        limit: 20,
        offset: (page - 1) * 20,
        include: [
          {
            model: User,
            as: 'provider',
            attributes: ['id', 'name'],
            include: [
              {
                model: File,
                as: 'avatar',
                attributes: ['id', 'path', 'url'],
              },
            ],
          },
        ],
      });
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(400).json({ Error: error.parent.detail });
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { provider_id, date } = req.body;

    /*
    Check if provider_id is a provider
    */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!isProvider) {
      return res
        .status(401)
        .json({ Error: 'You can only create appointments with providers' });
    }
    // Check for past dates
    const hourStart = await startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Post dates are not permitted' });
    }

    // Check date availibility
    const checkAvailability = await Appointments.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    });
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointments dates is not available' });
    }

    const appointments = await Appointments.create({
      user_id: req.userId,
      provider_id,
      date,
    });
    return res.status(200).json(appointments);
  }
}

export default new AppointmentsController();
