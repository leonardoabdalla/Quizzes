import prismaClient from "../prisma";
import { BodyQuiz } from "../interfaces/bodyQuiz";
import { QuestionStatus } from "@prisma/client";
import { CustomerService } from "./CustomerService";

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
    }

    async getAllOrFilter(body: BodyQuiz, type: string, idClient: string) {
        const { 
            typeQuiz, 
            status, 
            question, 
            userCreatedQuestion, 
            userReview,
            id
        } = body;

        const customerService = new CustomerService();

        const getById = await customerService.getByIdUser(idClient);

        const typeClientAuth = getById?.subscriptions.some((type) => type === typeQuiz);

        if(!type && !status && !question && !userCreatedQuestion && !userReview && !id && type !== "ADMIN") {
            throw new Error("Not authorized");
        }

        if((status !== "APPROVED" || question || userReview || id) && type !== "ADMIN") {
            throw new Error("Not authorized");
        }

        if(typeQuiz !== undefined && !typeClientAuth && type !== "ADMIN") {
            throw new Error("Not authorized");
        }

        const result = await prismaClient.quiz.findMany({
            where: {
                typeQuiz: typeQuiz,
                status,
                question,
                userCreatedQuestion,
                userReview,
                id
            },
        })
        
        return result;
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
