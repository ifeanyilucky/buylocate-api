import CustomApiError from './CustomError';

class NotFoundError extends CustomApiError {
  message: any;
  statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message, statusCode);
    this.message = message;
    this.statusCode = 404;
  }
}

export default NotFoundError;
