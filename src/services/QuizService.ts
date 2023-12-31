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
}

export { QuizService }
