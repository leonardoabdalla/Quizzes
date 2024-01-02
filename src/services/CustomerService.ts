import prismaClient from "../prisma";
import { UserType } from "@prisma/client";
import bcrypt from "bcrypt";
import { BodyCustomer } from "../interfaces/bodyCustomer";

class CustomerService {
    async getAllUsers() {
        try {
            const getAllUsers = await prismaClient.customer.findMany({
                select: {
                    id: true,
                    type: true,
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
                    id,
                },
                select: {
                    type: true,
                    id: true,
                    name: true,
                    email: true,
                    status: true,
                    subscriptions: true
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
    async createUser(nameClient: string, hashedPassword: string, emailClient: string, subscriptionsClient: string[]) {
        try {
                
            const newUser = await prismaClient.customer.create({
                data: {
                    type: "GUEST" as UserType,
                    name: nameClient,
                    password: hashedPassword,
                    email: emailClient,
                    status: true,
                    subscriptions: { set: subscriptionsClient },
                    payment: true
                },
            });

            const {password, ...user} = newUser;
    
            return user;

        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async updateUser(body: BodyCustomer, id: string) {
        try {
            const { nameClient, passwordClient, emailClient} = body;
            
            const updateUser = await prismaClient.customer.update({
                where: {
                    id,
                },
                data: {
                    name: nameClient,
                    password: passwordClient,
                    email: emailClient
                },
            });

            return updateUser;

        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async removeUser(id: string) {
        try {
            await prismaClient.customer.delete({
                where: {
                    id,
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
