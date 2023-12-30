import { Router } from "express";
import customerRoutes from "./customer";
import loginRouter from "./login";
import { authMiddleware } from "../middlewares/authMidleware";

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/customers', authMiddleware, customerRoutes);
// routes.use('/quiz', authMiddleware, quizzesRouter);
export default routes;