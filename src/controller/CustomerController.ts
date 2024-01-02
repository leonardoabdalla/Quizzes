import { Request, Response } from 'express';
import { CustomerService } from '../services/CustomerService';
import jwt from "jsonwebtoken";
import { BodyCustomer } from '../interfaces/bodyCustomer';

class CustomerController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const customerService = new CustomerService();
      const getAll = await customerService.getAllUsers();
      res.status(200).json(getAll);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }

  async getByIdUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customerService = new CustomerService();
      const getById = await customerService.getByIdUser(id);
      res.status(200).json(getById);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }

  async getByEmail(req: Request, res: Response) {
    try {
      const { emailClient }: any = req.body;
      const customerService = new CustomerService();
      const getByEmail = await customerService.getByEmail(emailClient);
      res.status(200).json(getByEmail);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      const { nameClient, passwordClient, emailClient, subscriptionsClient} = req.body;
      
      if ( !nameClient || !passwordClient || !emailClient || !subscriptionsClient) {
        return res.status(422).json({ error: 'Invalid input: Name, password, and email are required.' });
      }

      const customerService = new CustomerService();
      const hashedPassword = await customerService.passwordHashCreate(passwordClient);
      const emailExists = await customerService.getByEmail(emailClient);

      if (emailExists.length > 0) {
        return res.status(409).json({ error: 'Email already exists' });
      }

      const newUser = await customerService.createUser(nameClient, hashedPassword, emailClient, subscriptionsClient);
      
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
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
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }

  async userRemove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const customerService = new CustomerService();
      const removeUser = await customerService.removeUser(id);
      res.status(200).json(removeUser);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }
}

export { CustomerController };