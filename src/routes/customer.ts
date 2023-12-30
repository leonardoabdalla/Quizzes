import { Router } from 'express';
import { CustomerController } from '../controller/CustomerController';

const customerRouter = Router();

customerRouter.get('/users', async (req, res) => {
  return new CustomerController().getAllUsers(req, res);
});

customerRouter.get('/:id', async (req, res) => {
  return new CustomerController().getByIdUser(req, res);
});

customerRouter.post('/email', async (req, res) => {
  return new CustomerController().getByEmail(req, res);
});

customerRouter.post('/create', async (req, res) => {
  return new CustomerController().createUser(req, res);
});

customerRouter.delete('/:id', async (req, res) => {
  return new CustomerController().userRemove(req, res);
});

export default customerRouter;