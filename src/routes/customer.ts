import { Router } from 'express';
import { CustomerController } from '../controller/CustomerController';
import { authTypeMiddleware } from '../middlewares/authTypeMiddleware';

const customerRouter = Router();

customerRouter.get('/users', authTypeMiddleware, async (req, res) => {
  return new CustomerController().getAllUsers(req, res);
});

customerRouter.get('/:id', authTypeMiddleware, async (req, res) => {
  return new CustomerController().getByIdUser(req, res);
});

customerRouter.post('/email', authTypeMiddleware, async (req, res) => {
  return new CustomerController().getByEmail(req, res);
});

customerRouter.post('/create', async (req, res) => {
  return new CustomerController().createUser(req, res);
});

customerRouter.delete('/:id', authTypeMiddleware,  async (req, res) => {
  return new CustomerController().userRemove(req, res);
});

export default customerRouter;