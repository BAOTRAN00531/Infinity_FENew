import api from './api';

// Word Order Question API
export const wordOrderQuestionApi = {
    getAll: () => api.get('/questions/word-order'),
    getById: (id: number) => api.get(`/questions/word-order/${id}`),
    getByLesson: (lessonId: number) => api.get(`/questions/word-order/lesson/${lessonId}`),
    create: (data: any) => api.post('/questions/word-order', data),
    update: (id: number, data: any) => api.put(`/questions/word-order/${id}`, data),
    delete: (id: number) => api.delete(`/questions/word-order/${id}`),
};

// Speaking Question API
export const speakingQuestionApi = {
    getAll: () => api.get('/questions/speaking'),
    getById: (id: number) => api.get(`/questions/speaking/${id}`),
    getByLesson: (lessonId: number) => api.get(`/questions/speaking/lesson/${lessonId}`),
    create: (data: any) => api.post('/questions/speaking', data),
    update: (id: number, data: any) => api.put(`/questions/speaking/${id}`, data),
    delete: (id: number) => api.delete(`/questions/speaking/${id}`),
    validate: (id: number, userAudioUrl: string) => api.post(`/questions/speaking/${id}/validate`, null, {
        params: { userAudioUrl }
    }),
};

// Matching Question API
export const matchingQuestionApi = {
    getAll: () => api.get('/questions/matching'),
    getById: (id: number) => api.get(`/questions/matching/${id}`),
    getByLesson: (lessonId: number) => api.get(`/questions/matching/lesson/${lessonId}`),
    create: (data: any) => api.post('/questions/matching', data),
    update: (id: number, data: any) => api.put(`/questions/matching/${id}`, data),
    delete: (id: number) => api.delete(`/questions/matching/${id}`),
};

// Listening Question API
export const listeningQuestionApi = {
    getAll: () => api.get('/questions/listening'),
    getById: (id: number) => api.get(`/questions/listening/${id}`),
    getByLesson: (lessonId: number) => api.get(`/questions/listening/lesson/${lessonId}`),
    create: (data: any) => api.post('/questions/listening', data),
    update: (id: number, data: any) => api.put(`/questions/listening/${id}`, data),
    delete: (id: number) => api.delete(`/questions/listening/${id}`),
};

// Image Choice Question API
export const imageChoiceQuestionApi = {
    getAll: () => api.get('/questions/image-choice'),
    getById: (id: number) => api.get(`/questions/image-choice/${id}`),
    getByLesson: (lessonId: number) => api.get(`/questions/image-choice/lesson/${lessonId}`),
    create: (data: any) => api.post('/questions/image-choice', data),
    update: (id: number, data: any) => api.put(`/questions/image-choice/${id}`, data),
    delete: (id: number) => api.delete(`/questions/image-choice/${id}`),
};

// Fill in the Blank Question API
export const fillInTheBlankQuestionApi = {
    getAll: () => api.get('/questions/fill-in-the-blank'),
    getById: (id: number) => api.get(`/questions/fill-in-the-blank/${id}`),
    getByLesson: (lessonId: number) => api.get(`/questions/fill-in-the-blank/lesson/${lessonId}`),
    create: (data: any) => api.post('/questions/fill-in-the-blank', data),
    update: (id: number, data: any) => api.put(`/questions/fill-in-the-blank/${id}`, data),
    delete: (id: number) => api.delete(`/questions/fill-in-the-blank/${id}`),
};

// Combined API for all special question types
export const specialQuestionApi = {
    wordOrder: wordOrderQuestionApi,
    speaking: speakingQuestionApi,
    matching: matchingQuestionApi,
    listening: listeningQuestionApi,
    imageChoice: imageChoiceQuestionApi,
    fillInTheBlank: fillInTheBlankQuestionApi,
};
