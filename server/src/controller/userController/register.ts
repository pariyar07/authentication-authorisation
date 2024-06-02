import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import User from '../../models/User';

const userRegister = async (req: Request, res: Response) => {
  const { firstName, lastName, role, email, password } = req.body;

  try {
    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    const secretKey = process.env.JWT_SECRET_KEY as string;
    const token = jwt.sign({ email: email }, secretKey, {
      expiresIn: '1h',
    });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      firstName,
      lastName,
      role,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await User.create(newUser);

    // Response to user
    res.status(201).json({
      message: 'User registered successfully!',
      user: { firstName, lastName, role, email, token },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: 'An error occured!', error: errorMessage });
  }
};

export default userRegister;
