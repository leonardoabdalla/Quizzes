import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify";
import { CustomerController } from "../controller/customer.controller";

export async function customers(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/users", async (req: FastifyRequest, res: FastifyReply) => {
        return new CustomerController().getAllUsers(req, res);
    })
    fastify.get<{ Params: { id: string } }>("/user/:id", async (req, res) => {
        return new CustomerController().getByIdUser(req, res);
    });
    fastify.post("/email", async (req: FastifyRequest, res: FastifyReply) => {
        return new CustomerController().getByEmail(req, res);
    })
    fastify.post("/create", async (req: FastifyRequest, res: FastifyReply) => {
        return new CustomerController().createUser(req, res);
    })
    fastify.delete<{ Params: { id: string } }>("/user/:id", async (req, res) => {
        return new CustomerController().userRemove(req, res);
    });
}