import Jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/authConfig';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provider' });
  }
  const [, token] = authHeader.split(' ');
  try {
    const user = await promisify(Jwt.verify)(token, authConfig.secret);
    req.userId = user.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
