// @ts-nocheck
import AddressModel from '../models/address';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function createAddress(req: Request, res: Response) {
  const newAddress = await AddressModel.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(StatusCodes.CREATED).json({ address: newAddress });
}
export async function getAddress(req: Request, res: Response) {
  const addresses = await AddressModel.find({ user: req.user._id });
  res.status(StatusCodes.OK).json({ addresses: addresses });
}

export const removeAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const address = await AddressModel.findOneAndRemove({ _id: id });
  res.status(StatusCodes.OK).json({ address });
};

export const editAddress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const address = await AddressModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ address });
};
