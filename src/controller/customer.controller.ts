import { FastifyRequest, FastifyReply } from "fastify";
import { CustomerService } from "../services/customer.service";
import { BodyCustomer } from "../interfaces/bodyCustomer";

class CustomerController {
    async create(req: FastifyRequest, res: FastifyReply) {
        const customerService = new CustomerService();

        const resultCreate = await customerService.create(req.body as BodyCustomer);

        res.send(resultCreate);
    }
}

export { CustomerController }