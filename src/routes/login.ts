import { Router } from 'express';
import { LoginController } from '../controller/LoginController';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
    return new LoginController().login(req, res);
})

export default loginRouter;