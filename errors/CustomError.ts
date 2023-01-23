//@ts-nocheck
class CustomApiError extends Error {
  message: any;
  statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message);
  }
}
export default CustomApiError;
