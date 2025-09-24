import api from '@/api/api';
import { StudentQuizQuestion, QuizSubmission, QuizResult, SingleQuestionSubmit, SingleQuestionSubmitResponse } from '@/api/types';

// Quiz Service - API service cho việc quản lý câu hỏi quiz
// Cung cấp các function CRUD cho questions và answers

export const quizService = {
    // Get quiz questions for a specific lesson
    getQuestions: async (lessonId: number): Promise<StudentQuizQuestion[]> => {
        const response = await api.get(`/student/quiz/lesson/${lessonId}/questions`);
        return response.data;
    },

    // Submit quiz answers
    submitQuiz: async (lessonId: number, answers: Record<number, number>): Promise<QuizResult> => {
        const submission: QuizSubmission = { answers };
        const response = await api.post(`/student/quiz/lesson/${lessonId}/submit`, submission);
        return response.data;
    },

    // Submit single question answer
    submitSingleQuestion: async (questionId: number, selectedOptionIds: number[], textAnswer?: string): Promise<SingleQuestionSubmitResponse> => {
        const submission: any = {
            questionId,
        };

        // Handle text input questions differently
        if (textAnswer !== undefined) {
            submission.answerText = textAnswer;
        } else {
            submission.questionOptionIds = selectedOptionIds;
        }

        const response = await api.post(`/student/quiz/question/${questionId}/submit`, submission);
        return response.data;
    },

    // Legacy method - keeping for backward compatibility
    getResults: (quizSessionId: number) =>
        api.get(`/student/quiz/session/${quizSessionId}/results`)
};