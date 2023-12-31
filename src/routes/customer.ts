import { Router } from 'express';
import { CustomerController } from '../controller/CustomerController';
import { authTypeMiddleware } from '../middlewares/authTypeMiddleware';
import { authMiddleware } from "../middlewares/authMiddleware";

const customerRouter = Router();

customerRouter.post('/create', async (req, res) => {
  return new CustomerController().createUser(req, res);
});

customerRouter.use(authMiddleware);

customerRouter.put('/update', async (req, res) => {
  return new CustomerController().updateUser(req, res);
});

customerRouter.use(authTypeMiddleware);

customerRouter.get('/users', async (req, res) => {
  return new CustomerController().getAllUsers(req, res);
});

customerRouter.get('/:id', async (req, res) => {
  return new CustomerController().getByIdUser(req, res);
});

customerRouter.post('/email', async (req, res) => {
  return new CustomerController().getByEmail(req, res);
});


customerRouter.delete('/:id',  async (req, res) => {
  return new CustomerController().userRemove(req, res);
});

export default customerRouter;