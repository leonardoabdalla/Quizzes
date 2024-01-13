import { Request, Response } from 'express';
import { CustomerService } from '../services/CustomerService';
import jwt from "jsonwebtoken";
import { BodyCustomer } from '../interfaces/bodyCustomer';
import * as Joi from 'joi';
import { SchemaJoi } from '../interfaces/schemaJoi';
import { ApiError } from '../helpers/api-errors';

class CustomerController {
  async getAllUsers(req: Request, res: Response) {
    const customerService = new CustomerService();
      const getAll = await customerService.getAllUsers();
      res.status(200).json(getAll);
  }

  async getByIdUser(req: Request, res: Response) {
    const { id } = req.params;
    const customerService = new CustomerService();
    const getById = await customerService.getByIdUser(id);
    res.status(200).json(getById);
  }

  async getByEmail(req: Request, res: Response) {
    const { emailClient }: { emailClient: string } = req.body;
    const customerService = new CustomerService();
    const getByEmail = await customerService.getByEmail(emailClient);
    res.status(200).json(getByEmail);
  }

  async createUser(req: Request, res: Response) {
    const { nameClient, passwordClient, emailClient, subscriptionsClient} = req.body;

    const validatePassword = (password: string) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
      return passwordRegex.test(password);
    };

    const schema: Joi.ObjectSchema<SchemaJoi> = Joi.object({
    emailClient: Joi.string().email().required(),
    passwordClient: Joi.string().custom((value, helpers) => {
    if (!validatePassword(value)) {
      throw new ApiError('Unprocessable Entity', 422);
    }
      return value;
    }).min(5).required(),
    nameClient: Joi.string().min(3).required(),
    subscriptionsClient: Joi.required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new ApiError('Unprocessable Entity', 422);
    }

    const customerService = new CustomerService();
    const hashedPassword = await customerService.passwordHashCreate(passwordClient);
    const emailExists = await customerService.getByEmail(emailClient);

    if (emailExists.length > 0) {
      throw new ApiError('Email already exists', 409);
    }

    const newUser = await customerService.createUser(nameClient, hashedPassword, emailClient, subscriptionsClient);
    
    res.status(201).json(newUser);
  }

  async updateUser(req: Request, res: Response) {
    const customerService = new CustomerService();

    const emailExists = await customerService.getByEmail(req.body.emailClient);

    if(emailExists.length > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    const dataUser = jwt.decode(token as string);
    const { id } = dataUser as BodyCustomer;

    const updateUser = await customerService.updateUser(req.body, id);
    
    res.status(200).json(updateUser);
  }

  async userRemove(req: Request, res: Response) {
    const { id } = req.params;
    const customerService = new CustomerService();
    const removeUser = await customerService.removeUser(id);
    res.status(200).json(removeUser);
  }
}

export { CustomerController };