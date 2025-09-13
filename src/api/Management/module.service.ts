import api from '@/api/api';
import { Language, Course, Module, ModuleRequest } from '@/api/types';

// Module Service - API service cho việc quản lý modules
// Cung cấp các function CRUD cho modules, courses và languages

export const fetchLanguages = async (): Promise<Language[]> => {
    const response = await api.get<Language[]>('/api/languages');
    return response.data;
};

export const fetchCourses = async (): Promise<Course[]> => {
    const response = await api.get<Course[]>('/api/courses');
    return response.data;
};

export const fetchCoursesByLanguage = async (languageId: number): Promise<Course[]> => {
    const response = await api.get<Course[]>(`/api/courses/by-language/${languageId}`);
    return response.data;
};

export const fetchModules = async (courseId?: number): Promise<Module[]> => {
    const url = courseId ? `/api/modules?courseId=${courseId}` : '/api/modules';
    const response = await api.get<Module[]>(url);
    return response.data;
};

export const createModule = async (data: ModuleRequest): Promise<Module> => {
    const response = await api.post<Module>('/api/modules', data);
    return response.data;
};

export const updateModule = async (id: number, data: ModuleRequest): Promise<Module> => {
    const response = await api.put<Module>(`/api/modules/${id}`, data);
    return response.data;
};

export const deleteModule = async (id: number): Promise<void> => {
    await api.delete(`/api/modules/${id}`);
};

// Thêm hàm này vào file service của module
export const fetchModuleById = async (id: number): Promise<Module> => {
    const response = await api.get<Module>(`/api/modules/${id}`);
    return response.data;
};