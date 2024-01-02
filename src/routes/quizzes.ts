import { Router } from 'express';
import { QuizController } from '../controller/QuizController';
import { authRegularMiddleware } from '../middlewares/authRegularMiddleware';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';
import { authMiddleware } from "../middlewares/authMiddleware";

const quizzesRouter = Router();

quizzesRouter.use(authMiddleware);

quizzesRouter.use(authRegularMiddleware);

quizzesRouter.post('/create', async (req, res) => {
  return new QuizController().createQuestion(req, res);
});

quizzesRouter.post('/getAllOrFilter', async (req, res) => {
  return new QuizController().getAllOrFilter(req, res);
});

quizzesRouter.patch('/statusQuiz', authAdminMiddleware, async (req, res) => {
  return new QuizController().updateStatusQuestions(req, res);
});


export default quizzesRouter;