import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const bearer = authToken?.split(' ');
  if (bearer[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format' });
  }

  const jwtToken = bearer[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const decoded = jwt.verify(jwtToken, secretKey!) as JwtPayload;
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(403).json({ message: 'User not found!' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized', error: error });
  }
};

export default verifyAuthToken;
