import { Router } from 'express';
import { QuizController } from '../controller/QuizController';
import { authRegularMiddleware } from '../middlewares/authRegularMiddleware';

const quizzesRouter = Router();

quizzesRouter.use(authRegularMiddleware);

quizzesRouter.post('/create', async (req, res) => {
  return new QuizController().createQuestion(req, res);
});

export default quizzesRouter;