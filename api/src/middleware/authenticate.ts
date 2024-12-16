import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config/config';

export interface AuthRequest extends Request {
  Id: string;
}
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    res.status(401).json({ message: 'Authorization token is required' });
    return;
  }
  try {
    const parsedText = token.split(' ')[1];
    const decoded = verify(parsedText, config.jwtSecret as string);
    const _request = req as AuthRequest;
    _request.Id = decoded.sub as string;

    return next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
};

export default authenticate;
