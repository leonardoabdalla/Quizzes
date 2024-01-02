import { Router } from 'express';
import { QuizController } from '../controller/QuizController';
import { authRegularMiddleware } from '../middlewares/authRegularMiddleware';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';
import { authMiddleware } from "../middlewares/authMiddleware";

const quizzesRouter = Router();

quizzesRouter.get('/getAllTitles', async (req, res) => {
  return new QuizController().getAllTitles(req, res);
});

quizzesRouter.use(authMiddleware);

quizzesRouter.get('/allQuestions', authAdminMiddleware, async (req, res) => {
  return new QuizController().getAllQuestion(req, res);
});


quizzesRouter.use(authRegularMiddleware);

quizzesRouter.post('/create', async (req, res) => {
  return new QuizController().createQuestion(req, res);
});

quizzesRouter.get('/emailQuestions', async (req, res) => {
  return new QuizController().getAllEmailQuestions(req, res);
});

quizzesRouter.post('/typeQuestions', async (req, res) => {
  return new QuizController().getAllTypeQuestions(req, res);
});

quizzesRouter.get('/getById/:id', authAdminMiddleware, async (req, res) => {
  return new QuizController().getByIdQuestion(req, res);
});

quizzesRouter.patch('/statusQuiz', authAdminMiddleware, async (req, res) => {
  return new QuizController().updateStatusQuestions(req, res);
});


export default quizzesRouter;