import prismaClient from "../prisma";
import { BodyCustomer } from "../interfaces/bodyCustomer";
import { UserType } from "@prisma/client";
import bcrypt from "bcrypt";

class CustomerService {
    async create(body: BodyCustomer) {

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const customer = await prismaClient.customer.create({
            data: {
                type: "REGULAR" as UserType,
                name: body.name,
                password: hashedPassword,
                email: body.email,
                status: true,
            },
        });

        return customer;
    }
}

export { CustomerService }
