import { Request, Response } from 'express';
import { QuizService } from '../services/QuizService';
import jwt from "jsonwebtoken";
import { BodyCustomer } from '../interfaces/bodyCustomer';

class QuizController {   

  async createQuestion(req: Request, res: Response) {
    const { authorization } = req.headers;

      const token = authorization?.split(" ")[1];
      const dataUser = jwt.decode(token as string);
      const { email } = dataUser as BodyCustomer;

      const quizService = new QuizService();
      
      const createQuiz = await quizService.createQuiz(req.body, email);

      res.status(201).json(createQuiz);
  }

  async getAllOrFilter(req: Request, res: Response) {
    const { authorization } = req.headers;

    const token = authorization?.split(" ")[1];
    const dataUser = jwt.decode(token as string);
    const { type, id: idClient } = dataUser as BodyCustomer;
    const questionsService = new QuizService();
    const getAllOrFilter = await questionsService.getAllOrFilter(req.body, type, idClient);
    res.status(200).json(getAllOrFilter);
  }

  async updateStatusQuestions(req: Request, res: Response) {
    const { authorization } = req.headers;

    const token = authorization?.split(" ")[1];
    const dataUser = jwt.decode(token as string);
    const { email } = dataUser as BodyCustomer;
    const { id, statusQuestion } = req.body;
    const questionService = new QuizService();
    const updatedStatusQuiz = await questionService.updatedStatusQuiz(id, statusQuestion, email);
    res.status(200).json(updatedStatusQuiz);
  }
}

export { QuizController };