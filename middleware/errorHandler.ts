// @ts-nocheck
import { ErrorRequestHandler, Request, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorHandlingMiddlewareFunction } from 'mongoose';
import { CustomApiError } from '../errors';

const errorHandlerMiddleware = (
  err: ErrorHandlingMiddlewareFunction,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'Something went wrong try again later',
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ message: err.message });
  // }

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ');

    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  // check for existing email
  if (err.code && err.code === 11000) {
    customError.message = `${Object.keys(err.keyValue)} is already taken`;
    customError.statusCode = 400;
  }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

export default errorHandlerMiddleware;
