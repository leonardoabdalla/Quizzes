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

  async getAllQuestion(req: Request, res: Response) {
    try {
      const quizService = new QuizService();
      const getAll = await quizService.getAllQuizzes();
      res.status(200).json(getAll);
    } catch(err) {
      console.log(err);
      res.status(500).send('Erro interno do servidor')
    }
  }

  async getAllTitles(req: Request, res: Response) {
    try {
      const quizService = new QuizService();
      const getAllTitles = await quizService.getByTypeQuiz();
      res.status(200).json(getAllTitles);
    } catch(err) {
      console.log(err);
      res.status(500).send('Erro interno do servidor')
    }
  }

  async getByIdQuestion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const questionService = new QuizService;
      const getById = await questionService.getByIdQuestion(id);
      res.status(200).json(getById);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }

  async getAllEmailQuestions(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;

      const token = authorization?.split(" ")[1];
      const dataUser = jwt.decode(token as string);
      const { email } = dataUser as BodyCustomer;
      const questionsService = new QuizService();
      const getByEmail = await questionsService.getByEmail(email);
      res.status(200).json(getByEmail);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }

  async getAllTypeQuestions(req: Request, res: Response) {
    try {
      const { typeQuiz, status } = req.body;
      const questionsService = new QuizService();
      const getAllQuestionsType = await questionsService.getAllType(typeQuiz, status);
      res.status(200).json(getAllQuestionsType);
    } catch (err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }

  async updateStatusQuestions(req: Request, res: Response) {
    try {
      const { authorization } = req.headers;

      const token = authorization?.split(" ")[1];
      const dataUser = jwt.decode(token as string);
      const { email } = dataUser as BodyCustomer;
      const { id, statusQuestion } = req.body;
      const questionService = new QuizService();
      const updatedStatusQuiz = await questionService.updatedStatusQuiz(id, statusQuestion, email);
      res.status(200).json(updatedStatusQuiz);
    } catch(err) {
      console.error(err);
      res.status(500).send('Erro interno do servidor');
    }
  }
}

export { QuizController };