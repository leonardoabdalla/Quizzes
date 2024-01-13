import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { BodyCustomer } from '../interfaces/bodyCustomer';
import { UnauthorizedError } from '../helpers/api-errors';

export const authRegularMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  
  const { authorization } = req.headers;

  const token = authorization?.split(' ')[1];

  const dataUser = jwt.decode(token as string);
  const { type } = dataUser as BodyCustomer;

  if (type !== "ADMIN" && type !== "REGULAR") {
    throw new UnauthorizedError('Not authorized')
  }

  next();
};

