import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify";
import { CustomerController } from "../controller/customer.controller";

export async function customers(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async (req: FastifyRequest, res: FastifyReply) => {
        return { ok: true }
    })
    fastify.post("/create", async (req: FastifyRequest, res: FastifyReply) => {
        return new CustomerController().create(req, res);
    })
}