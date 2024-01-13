import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { CustomerService } from '../services/CustomerService';
import { UnauthorizedError } from '../helpers/api-errors';

type JwtToken = {
    id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).send('Not authorized');
    }

    const token = authorization?.split(' ')[1];
    const { id } = jwt.verify(token as string, process.env.JWT_PASS as string) as JwtToken;

    const verifyId = await new CustomerService().getByIdUser(id);

    if (!verifyId) {
      throw new UnauthorizedError('Not authorized')
    }

    next();
  };

