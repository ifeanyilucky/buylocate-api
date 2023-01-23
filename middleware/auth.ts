// @ts-nocheck
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthenticationError } from '../errors';
import User from '../models/user';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticationError('Authentication Error');
  }
  try {
    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(
      token,
      process.env.USER_VERIFICATION_SECRET_TOKEN
    );
    const user = await User.findById(payload.userId).select('-password');
    req.user = user;

    next();
  } catch (error) {
    throw new UnauthenticationError('Not authorized to access this route');
  }
};

export default auth;
