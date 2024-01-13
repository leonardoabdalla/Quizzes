import { Request, Response } from 'express';
import { LoginService } from '../services/LoginService';

class LoginController {
    async login(req: Request, res: Response) {
        const { emailClient, passwordClient } = req.body;
    
        const verifyLogin = await new LoginService().login(emailClient, passwordClient);

        res.status(200).json(verifyLogin);
    }
}

export { LoginController };