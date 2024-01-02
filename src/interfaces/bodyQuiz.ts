import { QuestionStatus } from "@prisma/client";

interface BodyQuiz {
    id: string,
    typeQuiz: string,
    question: string,
    answerOne: string,
    answerTwo: string,
    answerThree: string,
    answerFour: string,
    answerFive: string,
    correctAnswer: string,
    userCreatedQuestion: string,
    userReview: string,
    status: QuestionStatus,
}

export { BodyQuiz }