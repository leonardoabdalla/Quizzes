import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors";

class LoginService {
    async login(emailClient: string, passwordClient: string) {
        const users = await this.getByEmail(emailClient);
    
        if (users.length === 0) {
          throw new UnauthorizedError('Login or password invalid')
        }
    
        const user = users[0];
    
        if (!passwordClient) {
          throw new UnauthorizedError('Login or password invalid')
        }
    
        const verifyPassword = await bcrypt.compare(passwordClient, user.password);
        
        if (!verifyPassword) {
          throw new UnauthorizedError('Login or password invalid')
        }
    
        const token = jwt.sign({ id: user.id, type: user.type, email: user.email }, process.env.JWT_PASS ?? '', {
          expiresIn: '3h',
        });

        const {password, ...userLogin} = user;
        
        return {
            user: userLogin,
            token: token
        };
      }
    
    async getByEmail(emailClient: string) {
      const user = await prismaClient.customer.findMany({
        where: {
            email: emailClient,
        },
        select: {
            id: true,
            type: true,
            name: true,
            password: true,
            email: true,
            status: true,
        },
    });

    return user;
  }
}

export { LoginService }
