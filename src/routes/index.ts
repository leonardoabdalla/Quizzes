import { Router } from "express";
import customerRoutes from "./customer";
import loginRouter from "./login";

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/customers', customerRoutes);
// routes.use('/quiz', authMiddleware, quizzesRouter);
export default routes;