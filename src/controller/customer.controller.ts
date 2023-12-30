import { FastifyRequest, FastifyReply } from "fastify";
import { CustomerService } from "../services/customer.service";
import { BodyCustomer } from "../interfaces/bodyCustomer";

class CustomerController {
    async getAllUsers(req: FastifyRequest, res: FastifyReply) {
        try {
            const customerService = new CustomerService();
            const getAll = await customerService.getAllUsers();
            res.code(200).send(getAll);
        } catch(err) {
            console.error(err);
            res.code(500).send('Erro interno do servidor');
        }
    }

    async getByIdUser(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        try {
            const { id } = req.params; 
            const customerService = new CustomerService();
            const getAll = await customerService.getByIdUser(id);
            res.code(200).send(getAll);
        } catch(err) {
            console.error(err);
            res.code(500).send('Erro interno do servidor');
        }
    }

    async getByEmail(req: FastifyRequest, res: FastifyReply) {
        try {
            const { emailClient }: any = req.body;
            const customerService = new CustomerService();
            const getByEmail = await customerService.getByEmail(emailClient);
            res.code(200).send(getByEmail);
        } catch(err) {
            console.error(err);
            res.code(500).send('Erro interno do servidor');
        }
    }

    async createUser(req: FastifyRequest, res: FastifyReply) {
        try {
            const customerService = new CustomerService();
            const resultCreate = await customerService.createUser(req.body as BodyCustomer);
            res.code(201).send(resultCreate);
        } catch (err) {
            console.error(err);
            res.code(500).send('Erro interno do servidor');
        }
    }

    async userRemove(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        try {
            const { id } = req.params; 
            const customerService = new CustomerService();
            const getAll = await customerService.removeUser(id);
            res.code(200).send(getAll);
        } catch(err) {
            console.error(err);
            res.code(500).send('Erro interno do servidor');
        }
    }
}

export { CustomerController }