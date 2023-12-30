import prismaClient from "../prisma";
import { BodyCustomer } from "../interfaces/bodyCustomer";
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
    async createUser(body: BodyCustomer) {
        try {
            const { nameClient, passwordClient, emailClient} = body;

            const emailExists = await this.getByEmail(emailClient);

            if (nameClient && passwordClient && emailClient && emailExists.length === 0) {
                const hashedPassword = await this.passwordHashCreate(passwordClient);;
        
                await prismaClient.customer.create({
                    data: {
                        type: "REGULAR" as UserType,
                        name: nameClient,
                        password: hashedPassword,
                        email: emailClient,
                        status: true,
                    },
                });
        
                return "User registered successfully";
            } else {
                throw new Error("Invalid Input. Provide name, password and email.");
            }
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

    private async passwordHashCreate(senha: string): Promise<string> {
        return bcrypt.hash(senha, 10);
    }
}

export { CustomerService }
