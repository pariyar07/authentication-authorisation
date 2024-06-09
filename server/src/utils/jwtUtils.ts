import jwt from 'jsonwebtoken';
require('dotenv').config();

type JwtPayload = {
  email: string;
};

const { JWT_SECRET_KEY } = process.env;

const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET_KEY!, {
    expiresIn: '24h',
  });
};

export { signToken };
