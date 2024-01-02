import { Router } from "express";
import customerRoutes from "./customer";
import loginRouter from "./login";
import quizzesRouter from "./quizzes";

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/customers', customerRoutes);
routes.use('/quiz', quizzesRouter);
export default routes;