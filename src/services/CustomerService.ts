import prismaClient from "../prisma";
import { UserType } from "@prisma/client";
import bcrypt from "bcrypt";
import { BodyCustomer } from "../interfaces/bodyCustomer";
import { ApiError } from "../helpers/api-errors";

class CustomerService {
    async getAllUsers() {
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
        } catch (err: any) {
            if (err.code === "P2023") {
                throw new ApiError("Usuário não encontrado", 404)
            } else {
                console.error("Erro ao buscar usuário:", err.message);
                throw err;
            }
        }
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
                status: true,
            },
        });

        return user;
    }
    async createUser(nameClient: string, hashedPassword: string, emailClient: string, subscriptionsClient: string[]) {
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
    }

    async updateUser(body: BodyCustomer, id: string) {
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
    }

    async removeUser(id: string) {
        await prismaClient.customer.delete({
            where: {
                id,
            }
        });
        return "User removed successfully";
    }

    async passwordHashCreate(senha: string): Promise<string> {
        return bcrypt.hash(senha, 10);
    }
}

export { CustomerService }
