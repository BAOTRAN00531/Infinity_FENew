import {
    Lesson,
    QuestionCreateDto,
    QuestionResponseDto,
    UIQuestion,
    OptionCreateDto,
    AnswerCreateDto,
} from '@/api/types';

import {
    mapUIQuestionToCreateDto,
    mapUIQuestionToUpdateDto,
    mapQuestionResponseToUIQuestion,
    mapUIQuestionToAnswerDto,
} from '@/api/index';

import api from '@/api/api';
import {toast} from "sonner"; // ✅ Dùng API instance đã config

export interface Language {
    id: number;
    code: string;
    name: string;
}

export type ModuleLite = { id: number; name: string };

export const getQuestionsByLesson = async (lessonId: number): Promise<QuestionResponseDto[]> => {
    const res = await api.get('/questions', { params: { lessonId } });
    return res.data;
};

export const getAllQuestions = async (): Promise<QuestionResponseDto[]> => {
    const res = await api.get('/questions/all');
    return res.data;
};

export const fetchModules = async (): Promise<ModuleLite[]> => {
    try {
        const res = await api.get('/courses');
        return res.data.map((m: any) => ({
            id: m.id,
            name: m.name || m.title,
        }));
    } catch (error) {
        console.log('[Admin Question API] Using mock data for modules');
        return generateMockModules();
    }
};

export const fetchLanguages = async (): Promise<Language[]> => {
    try {
        const res = await api.get('/languages');
        return res.data;
    } catch (error) {
        console.log('[Admin Question API] Using mock data for languages');
        return generateMockLanguages();
    }
};

export const fetchModulesByLanguage = async (languageCode: string): Promise<ModuleLite[]> => {
    const lc = (languageCode || '').toLowerCase();
    const base = lc.split('-')[0];

    const filterCourses = (courses: any[]): any[] => {
        return (courses || []).filter((c: any) => {
            const code = (c.language?.code || c.languageCode || '').toString().toLowerCase();
            const name = (c.language?.name || c.languageName || '').toString().toLowerCase();
            return (
                code === lc || name === lc || (code && code.split('-')[0] === base)
            );
        });
    };

    const fetchModulesOfCourses = async (courses: any[]): Promise<ModuleLite[]> => {
        const modulesArrays: ModuleLite[][] = await Promise.all(
            courses.map(async (c: any) => {
                // Try modules?courseId
                try {
                    const r1 = await api.get('/modules', { params: { courseId: c.id } });
                    if (Array.isArray(r1.data)) {
                        return r1.data.map((mm: any) => ({ id: mm.id, name: mm.name || mm.title }));
                    }
                } catch (_) {}
                // Try modules/by-course/:id
                try {
                    const r2 = await api.get(`/api/modules/by-course/${c.id}`);
                    if (Array.isArray(r2.data)) {
                        return r2.data.map((mm: any) => ({ id: mm.id, name: mm.name || mm.title }));
                    }
                } catch (_) {}
                return [] as ModuleLite[];
            })
        );
        return modulesArrays.flat();
    };

    // 1) Try courses with query param
    try {
        const res = await api.get('/courses', { params: { languageCode } });
        const courses = Array.isArray(res.data) ? res.data : [];
        const filtered = filterCourses(courses);
        if (filtered.length > 0) {
            return await fetchModulesOfCourses(filtered);
        }
    } catch (_) { /* continue */ }

    // 2) Try courses by-language route
    try {
        const res = await api.get(`/api/courses/by-language/${encodeURIComponent(languageCode)}`);
        const courses = Array.isArray(res.data) ? res.data : [];
        const filtered = filterCourses(courses);
        if (filtered.length > 0) {
            return await fetchModulesOfCourses(filtered);
        }
    } catch (_) { /* continue */ }

    // 3) Final fallback: fetch all and filter client-side, then get modules
    try {
        const res = await api.get('/courses');
        const courses = Array.isArray(res.data) ? res.data : [];
        const filtered = filterCourses(courses);
        return await fetchModulesOfCourses(filtered);
    } catch (_) { /* ignore */ }

    // Fallback: return empty list
    return [];
};

export async function fetchLessonsByModule(moduleId: number): Promise<Lesson[]> {
    if (!moduleId) return [];
    const res = await api.get('/lessons', { params: { moduleId } });
    // đảm bảo dữ liệu là mảng Lesson
    const list = Array.isArray(res.data) ? res.data : [];
    return list.map((x: any) => ({
      id: Number(x.id),
      name: x.name || x.title || `Lesson #${x.id}`,
      moduleId: Number(x.moduleId ?? moduleId),
    })) as Lesson[];
  }

export async function fetchQuestionsByLesson(lessonId: number) {
    // Đừng gọi BE nếu id không hợp lệ → tránh 500 rác
    if (!Number.isFinite(lessonId) || lessonId <= 0) return [];

    try {
        const res = await api.get(`/admin/questions/lessons/${lessonId}`);
        // BE của bạn có thể trả {result: []} hoặc [] – bắt cả 2
        return Array.isArray(res.data) ? res.data : (res.data?.result ?? []);
    } catch (e: any) {
        const msg =
            e?.response?.data?.message ||
            e?.response?.data?.error ||
            e?.message ||
            'Server error';
        console.error('[fetchQuestionsByLesson] 500:', e?.response?.data || e);
        toast.error(`Load questions failed: ${msg}`);
        return []; // Cho UI vẫn chạy
    }
}

export const fetchQuestionById = async (id: number): Promise<UIQuestion> => {
    const res = await api.get(`/api/questions/${id}`);
    return mapQuestionResponseToUIQuestion(res.data);
};

export const createQuestion = async (form: UIQuestion): Promise<UIQuestion> => {
    const dto = mapUIQuestionToCreateDto(form);

    // Gửi câu hỏi chính
    const res = await api.post('/questions', dto);
    const created: QuestionResponseDto = res.data;
    const questionId = created.id;

    // Gửi thêm options hoặc answers
    if (form.questionTypeId === 4) {
        const answerDtos: AnswerCreateDto[] = mapUIQuestionToAnswerDto(form, questionId);
        for (const a of answerDtos) {
            await api.post('/question-answers', a);
        }
    } else {
        const optionDtos: OptionCreateDto[] = form.options.map((o) => ({
            questionId,
            optionText: o.optionText,
            correct: o.correct,
            position: o.position,
            imageUrl: o.imageUrl,
        }));
        await api.post('/question-options/batch', optionDtos);
    }

    // Lấy lại câu hỏi vừa tạo (có đầy đủ fields)
    const finalRes = await api.get(`/api/questions/${questionId}`);
    return mapQuestionResponseToUIQuestion(finalRes.data);
};

export const updateQuestion = async (id: number, form: UIQuestion): Promise<UIQuestion> => {
    const dto: QuestionCreateDto = mapUIQuestionToUpdateDto(form);
    const res = await api.put(`/api/questions/${id}`, dto);
    return mapQuestionResponseToUIQuestion(res.data);
};

export const deleteQuestion = async (id: number): Promise<void> => {
    await api.delete(`/api/questions/${id}`);
};

// Mock data generators
const generateMockModules = (): ModuleLite[] => {
    return [
        { id: 1, name: 'Khóa học cơ bản' },
        { id: 2, name: 'Khóa học nâng cao' },
        { id: 3, name: 'Khóa học chuyên sâu' },
        { id: 4, name: 'Khóa học thực hành' },
        { id: 5, name: 'Khóa học tổng hợp' },
    ];
};

const generateMockLanguages = (): Language[] => {
    return [
        { id: 1, code: 'en', name: 'English' },
        { id: 2, code: 'es', name: 'Spanish' },
        { id: 3, code: 'fr', name: 'French' },
        { id: 4, code: 'de', name: 'German' },
        { id: 5, code: 'ja', name: 'Japanese' },
    ];
};
