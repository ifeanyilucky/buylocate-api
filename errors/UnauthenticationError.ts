import CustomApiError from './CustomError';
import { StatusCodes } from 'http-status-codes';

class UnAuthError extends CustomApiError {
  message: any;
  statusCode: number;
  constructor(message: any, statusCode: number) {
    super(message, statusCode);
    this.message = message;
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthError;
