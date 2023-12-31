import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";

export const authTypeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  
    try {
        const { authorization } = req.headers;

        const token = authorization?.split(' ')[1];
  
        const dataUser = jwt.decode(token as string);
        const { type }: any = dataUser;

        if (type !== "ADMIN") {
          return res.status(401).send('Not authorized');
        }
  
      next();
    } catch (error) {
      console.error(error);
  
      return res.status(401).send('Not authorized');
    }
  };

