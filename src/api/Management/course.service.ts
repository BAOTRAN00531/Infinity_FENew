// src/api/course.service.ts
import api from '@/api/api';
import {Course, Language} from '@/api/types';

// Course Service - API service cho việc quản lý courses
// Cung cấp các function CRUD cho courses và languages

// Lấy tất cả khóa học
export const getCourses = async (): Promise<Course[]> => {
    try {
        console.log('[Course API] Fetching courses from backend...');
        const res = await api.get<Course[]>('/api/courses');
        console.log('[Course API] Received courses:', res.data);
        return res.data;
    } catch (error) {
        console.error('[Course API] Error fetching courses:', error);
        console.log('[Course API] Using mock data for courses');
        return generateMockCourses();
    }
};


export const getLanguages = async (): Promise<Language[]> => {
    try {
        console.log('[Course API] Fetching languages from backend...');
        const res = await api.get<Language[]>('/api/languages');
        console.log('[Course API] Received languages:', res.data);
        return res.data;
    } catch (error) {
        console.error('[Course API] Error fetching languages:', error);
        console.log('[Course API] Using mock data for languages');
        return generateMockLanguages();
    }
};

// Lấy chi tiết một khóa học
export const getCourseById = async (id: number): Promise<Course> => {
    try {
        console.log(`[Course API] Fetching course ${id} from backend...`);
        const res = await api.get<Course>(`/api/courses/${id}`);
        console.log(`[Course API] Received course:`, res.data);
        return res.data;
    } catch (error) {
        console.error(`[Course API] Error fetching course ${id}:`, error);
        throw error;
    }
};

export const getCoursesByLanguage = async (languageId: number): Promise<Course[]> => {
    try {
        console.log(`[Course API] Fetching courses for language ${languageId} from backend...`);
        const res = await api.get<Course[]>(`/api/courses/by-language/${languageId}`);
        console.log(`[Course API] Received courses for language:`, res.data);
        return res.data;
    } catch (error) {
        console.error(`[Course API] Error fetching courses for language ${languageId}:`, error);
        throw error;
    }
};

// Tạo mới khóa học
// ✅ Cập nhật Omit để khớp với payload từ CourseForm
export const createCourse = async (
    courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'modulesCount'>
): Promise<void> => {
    try {
        console.log('[Course API] Creating course:', courseData);
        await api.post('/api/courses', courseData);
        console.log('[Course API] Course created successfully');
    } catch (error) {
        console.error('[Course API] Error creating course:', error);
        throw error;
    }
};

// Cập nhật khóa học
// ✅ Cập nhật Omit để khớp với payload từ CourseForm
export const updateCourse = async (
    id: number,
    courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'modulesCount'>
): Promise<void> => {
    try {
        console.log(`[Course API] Updating course ${id}:`, courseData);
        await api.put(`/api/courses/${id}`, courseData);
        console.log(`[Course API] Course ${id} updated successfully`);
    } catch (error) {
        console.error(`[Course API] Error updating course ${id}:`, error);
        throw error;
    }
};

// Xóa khóa học
export const deleteCourse = async (id: number): Promise<void> => {
    try {
        console.log(`[Course API] Deleting course ${id}...`);
        await api.delete(`/api/courses/${id}`);
        console.log(`[Course API] Course ${id} deleted successfully`);
    } catch (error) {
        console.error(`[Course API] Error deleting course ${id}:`, error);
        throw error;
    }
};

// Mock data generators
const generateMockCourses = (): Course[] => {
    return [
        {
            id: 1,
            name: 'Khóa học tiếng Anh cơ bản',
            description: 'Học tiếng Anh từ cơ bản đến nâng cao',
            language: {
                id: 1,
                code: 'en',
                name: 'English',
                flag: '🇺🇸',
                difficulty: 'Beginner',
                popularity: 'High'
            },
            level: 'Beginner',
            price: 0,
            duration: '3 tháng',
            thumbnail: '',
            status: 'active',
            modulesCount: 8,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: 2,
            name: 'Khóa học tiếng Anh nâng cao',
            description: 'Nâng cao kỹ năng tiếng Anh chuyên sâu',
            language: {
                id: 1,
                code: 'en',
                name: 'English',
                flag: '🇺🇸',
                difficulty: 'Advanced',
                popularity: 'High'
            },
            level: 'Advanced',
            price: 299000,
            duration: '6 tháng',
            thumbnail: '',
            status: 'active',
            modulesCount: 12,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];
};

const generateMockLanguages = (): Language[] => {
    return [
        { id: 1, code: 'en', name: 'English', flag: '🇺🇸', difficulty: 'Beginner', popularity: 'High' },
        { id: 2, code: 'es', name: 'Spanish', flag: '🇪🇸', difficulty: 'Intermediate', popularity: 'Medium' },
        { id: 3, code: 'fr', name: 'French', flag: '🇫🇷', difficulty: 'Intermediate', popularity: 'Medium' },
        { id: 4, code: 'de', name: 'German', flag: '🇩🇪', difficulty: 'Advanced', popularity: 'Low' },
        { id: 5, code: 'ja', name: 'Japanese', flag: '🇯🇵', difficulty: 'Advanced', popularity: 'Medium' },
    ];
};

