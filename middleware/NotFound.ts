import { Request, Response } from 'express';

const NotFound = (req: Request, res: Response) => {
  res.status(404).send('Route not found');
};

export default NotFound;
