// @ts-nocheck

import { Request, Response } from 'express';
import Orders from '../models/orders';
import { StatusCodes } from 'http-status-codes';

export const createOrder = async (req: Request, res: Response) => {
  console.log(req.body);
    const order = await Orders.create({ ...req.body, user: req.user._id });
    res.status(StatusCodes.CREATED).json({ order });
};

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Orders.find({ user: req.user._id });
  res.status(StatusCodes.OK).json({ orders });
};
