// @ts-nocheck
import { Request, Response } from 'express';
import User from '../models/user';
import { StatusCodes } from 'http-status-codes';
import {
  UnauthenticationError,
  BadRequestError,
  NotFoundError,
} from '../errors';

// login
export const login = async (req: Request, res: Response) => {
  const { password, email } = req.body;
  console.log(req.body);

  const user = await User.findOne({ email: email });
  if (!user) {
    throw new BadRequestError(
      "Sorry, we couldn't find an account with that email."
    );
  }

  const passwordIsCorrect = await user.comparePassword(password);
  if (!passwordIsCorrect) {
    throw new BadRequestErro("Sorry, that password isn't right");
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ success: true, user, token });
};

// register
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error('Please enter your email and password');
  }

  const usedEmail = await User.findOne({ email: email });
  if (usedEmail) {
    throw new Error('Email already in use');
  }
  const user = await User.create({ ...req.body });
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ success: true, user, token });
};

// get profile
export const getAccount = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    throw new NotFoundError('No user exists with this account');
  }
  res.status(StatusCodes.OK).json({ user });
};
