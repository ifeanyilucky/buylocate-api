// @ts-nocheck
import CustomApiError from './CustomError';

class BadRequestError extends CustomApiError {
  message: any;
  constructor(message: any) {
    super(message);
    this.message = message;
    this.statusCode = 500;
  }
}

export default BadRequestError;
