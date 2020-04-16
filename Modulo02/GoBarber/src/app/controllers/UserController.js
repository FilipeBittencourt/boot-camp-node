import * as Yup from 'yup';
import User from '../models/UserModel';

class UserController {
  async index(req, res) {
    try {
      const user = await User.findAll();
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ Error: error.parent.detail });
    }
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    try {
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ Error: error.parent.detail });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldpassword: Yup.string().required().min(6),
      password: Yup.string()
        .required()
        .min(6)
        .when('oldpassword', (oldpassword, field) =>
          oldpassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldpassword } = req.body;
    const user = await User.findByPk(req.params.id);
    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
    }

    if (oldpassword && !(await user.checkPassword(oldpassword))) {
      return res.status(401).json({ error: 'Password  does not match' });
    }

    const newUser = await user.update(req.body);
    return res.json(newUser);
  }
}

export default new UserController();
