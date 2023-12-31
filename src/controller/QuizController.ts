import { Request, Response } from 'express';
import { QuizService } from '../services/QuizService';
import jwt from "jsonwebtoken";
import { BodyCustomer } from '../interfaces/bodyCustomer';

class QuizController {   

  async createQuestion(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;

      const token = authorization?.split(" ")[1];
      const dataUser = jwt.decode(token as string);
      const { email } = dataUser as BodyCustomer;

      const quizService = new QuizService();
      
      const createQuiz = await quizService.createQuiz(req.body, email);

      res.status(201).json(createQuiz);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }
}

export { QuizController };