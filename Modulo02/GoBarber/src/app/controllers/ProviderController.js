import User from '../models/UserModel';
import File from '../models/FileModel';

class ProviderController {
  async index(req, res) {
    try {
      const user = await User.findAll({
        where: { provider: true },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'name', 'path', 'url'],
          },
        ],
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ Error: error.parent.detail });
    }
  }
}

export default new ProviderController();
