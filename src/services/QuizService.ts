import prismaClient from "../prisma";
import { BodyQuiz } from "../interfaces/bodyQuiz";
import { QuestionStatus } from "@prisma/client";

class QuizService {               
    
    async createQuiz(body: BodyQuiz, email: string) {
        const { 
            typeQuiz, 
            question, 
            answerOne, 
            answerTwo, 
            answerThree, 
            answerFour, 
            answerFive, 
            correctAnswer, 
        } = body;
        
        try {
            const newUser = await prismaClient.quiz.create({
                data: {
                    typeQuiz,
                    question,
                    answerOne,
                    answerTwo,
                    answerThree,
                    answerFour,
                    answerFive,
                    correctAnswer,
                    userCreatedQuestion: email,
                    userReview: "WAITING",
                    status: "ANALYZING" as QuestionStatus,
                },
            });

            return newUser

        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async getAllQuizzes() {
        const getAll = await prismaClient.quiz.findMany();

        return getAll;
    }

    async getByIdQuestion(id: string) {
        try {
            const getById = await prismaClient.quiz.findUnique({
                where: {
                    id,
                },
            });

            return getById;

        } catch(err) {
            console.error(err);
            throw err;
        }
    }
    async getByEmail(email: string) {
        try {
            const userQuestions = await prismaClient.quiz.findMany({
                where: {
                    userCreatedQuestion: email,
                },
            });
    
            return userQuestions;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getByTypeQuiz() {
        try {
            const titles: string[] = [];
            
            const typeQuestions = await prismaClient.quiz.findMany({
                select: {
                    typeQuiz: true,
                },
            });
            
            titles.push(...typeQuestions.map(question => question.typeQuiz));
            const uniqueTitles: string[] = [...new Set(titles)];
    
            return uniqueTitles;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    async getAllType(typeQuiz: string, status: QuestionStatus) {
        try {
            const result = await prismaClient.quiz.findMany({
                where: {
                    typeQuiz: typeQuiz,
                    status,
                },
              })
            
              return result;
        } catch(err) {
            console.error(err);
            throw err;
        }
    }

    async updatedStatusQuiz(id: string, statusQuestion: QuestionStatus, email: string) {

        const updateStatusQuiz = await prismaClient.quiz.update({
            where: {
                id,
            },
            data: {
                status: statusQuestion,
                userReview: email
            },
        });

        return updateStatusQuiz;
    }
}

export { QuizService }
