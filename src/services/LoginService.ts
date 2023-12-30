import prismaClient from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginService {
    async login(emailClient: string, passwordClient: string) {
        const users = await this.getByEmail(emailClient);
    
        if (users.length === 0) {
          throw new Error("Login or password invalid");
        }
    
        const user = users[0];
    
        if (!passwordClient) {
          throw new Error("Password not provided");
        }
    
        const verifyPassword = await bcrypt.compare(passwordClient, user.password);
        
        if (!verifyPassword) {
          throw new Error("Login or password invalid");
        }
    
        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', {
          expiresIn: '3h',
        });

        const {password, ...userLogin} = user;
        
        return {
            user: userLogin,
            token: token
        };
      }
    
    async getByEmail(emailClient: string) {
        try {
            const user = await prismaClient.customer.findMany({
                where: {
                    email: emailClient,
                },
                select: {
                    id: true,
                    type: true,
                    name: true,
                    password: true,
                    status: true,
                },
            });
    
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

export { LoginService }
