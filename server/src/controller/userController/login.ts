import { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import { signToken } from '../../utils/jwtUtils';

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Invalid password!' });
    }

    const token = signToken({ email: email });
    res.status(201).json({
      message: 'User logged successfully!',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email,
        token,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res
      .status(500)
      .json({ message: 'An error occurred!', error: errorMessage });
  }
};

export default loginUser;
