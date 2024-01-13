import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { BodyCustomer } from '../interfaces/bodyCustomer';

export const authAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  
  const { authorization } = req.headers;

  const token = authorization?.split(' ')[1];

  const dataUser = jwt.decode(token as string);
  const { type } = dataUser as BodyCustomer;

  if (type !== "ADMIN") {
    return res.status(401).send('Not authorized');
  }

  next();
};

