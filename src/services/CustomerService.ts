import prismaClient from "../prisma";
import { UserType } from "@prisma/client";
import bcrypt from "bcrypt";

class CustomerService {
    async getAllUsers() {
        try {
            const getAllUsers = await prismaClient.customer.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    status: true
                }
            });
            return getAllUsers;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }
    async getByIdUser(id: string) {
        try {
            const getById = await prismaClient.customer.findUnique({
                where: {
                    id: id
                },
                select: {
                    type: true,
                    id: true,
                    name: true,
                    email: true,
                    status: true
                }
            });
            return getById;
        } catch(err) {
            console.error(err);
            throw err;
        }
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
                    status: true,
                },
            });
    
            return user;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    async createUser(nameClient: string, hashedPassword: string, emailClient: string) {
        try {
                
            const newUser = await prismaClient.customer.create({
                data: {
                    type: "GUEST" as UserType,
                    name: nameClient,
                    password: hashedPassword,
                    email: emailClient,
                    status: true,
                },
            });

            const {password, ...user} = newUser;
    
            return user;

        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async removeUser(id: string) {
        try {
            await prismaClient.customer.delete({
                where: {
                    id: id
                }
            });
            return "User removed successfully";
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async passwordHashCreate(senha: string): Promise<string> {
        return bcrypt.hash(senha, 10);
    }
}

export { CustomerService }
