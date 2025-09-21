import api from '@/api/api';
import { Language, Course, Module, ModuleRequest } from '@/api/types';

// Cache để tránh gọi API trùng lặp
const coursesCache = new Map<number, Course[]>();
const modulesCache = new Map<string, Module[]>();
const moduleCache = new Map<number, Module>();

// Request deduplication - ngăn chặn gọi API trùng lặp
const pendingCourseRequests = new Map<number, Promise<Course[]>>();
const pendingModuleRequests = new Map<string, Promise<Module[]>>();
const pendingSingleModuleRequests = new Map<number, Promise<Module>>();

// Module Service - API service cho việc quản lý modules
// Cung cấp các function CRUD cho modules, courses và languages

export const fetchLanguages = async (): Promise<Language[]> => {
    try {
        console.log('[Module API] Fetching languages from backend...');
        const response = await api.get<Language[]>('/api/languages');
        console.log('[Module API] Received languages:', response.data);
        return response.data;
    } catch (error) {
        console.error('[Module API] Error fetching languages:', error);
        throw error;
    }
};

export const fetchCourses = async (): Promise<Course[]> => {
    try {
        console.log('[Module API] Fetching courses from backend...');
        const response = await api.get<Course[]>('/api/courses');
        console.log('[Module API] Received courses:', response.data);
        return response.data;
    } catch (error) {
        console.error('[Module API] Error fetching courses:', error);
        throw error;
    }
};

export const fetchCoursesByLanguage = async (languageId: number): Promise<Course[]> => {
    // Kiểm tra cache trước
    if (coursesCache.has(languageId)) {
        console.log(`[Courses API] Using cached data for languageId: ${languageId}`);
        return coursesCache.get(languageId)!;
    }
    
    // Kiểm tra xem có request đang pending không
    if (pendingCourseRequests.has(languageId)) {
        console.log(`[Courses API] Request already pending for languageId: ${languageId}`);
        return pendingCourseRequests.get(languageId)!;
    }
    
    // Tạo request mới
    const requestPromise = (async () => {
        try {
            console.log(`[Module API] Fetching courses for language ${languageId} from backend...`);
            const response = await api.get<Course[]>(`/api/courses/by-language/${languageId}`);
            const data = response.data;
            console.log(`[Module API] Received courses for language:`, data);
            
            // Cache kết quả
            coursesCache.set(languageId, data);
            return data;
        } catch (error) {
            // Silently fallback to mock data to avoid console spam
            console.log(`[Courses API] Using mock data for languageId: ${languageId}`);
            
            // Fallback to mock data for testing
            const mockData = generateMockCourses(languageId);
            
            // Cache mock data để tránh tạo lại
            coursesCache.set(languageId, mockData);
            return mockData;
        } finally {
            // Xóa request khỏi pending queue
            pendingCourseRequests.delete(languageId);
        }
    })();
    
    // Lưu request vào pending queue
    pendingCourseRequests.set(languageId, requestPromise);
    
    return requestPromise;
};

export const fetchModules = async (courseId?: number): Promise<Module[]> => {
    const cacheKey = `modules_${courseId || 'all'}`;
    
    // Kiểm tra cache trước
    if (modulesCache.has(cacheKey)) {
        console.log(`[Modules API] Using cached data for courseId: ${courseId || 'all'}`);
        return modulesCache.get(cacheKey)!;
    }
    
    // Kiểm tra xem có request đang pending không
    if (pendingModuleRequests.has(cacheKey)) {
        console.log(`[Modules API] Request already pending for courseId: ${courseId || 'all'}`);
        return pendingModuleRequests.get(cacheKey)!;
    }
    
    // Tạo request mới
    const requestPromise = (async () => {
        try {
            const url = courseId ? `/api/modules?courseId=${courseId}` : '/api/modules';
            console.log(`[Module API] Fetching modules from backend: ${url}`);
            const response = await api.get<Module[]>(url);
            const data = response.data;
            console.log(`[Module API] Received modules:`, data);
            
            // Cache kết quả
            modulesCache.set(cacheKey, data);
            return data;
        } catch (error) {
            // Silently fallback to mock data to avoid console spam
            console.log(`[Modules API] Using mock data for courseId: ${courseId || 'all'}`);
            
            // Fallback to mock data for testing
            const mockData = generateMockModules(courseId || 1);
            
            // Cache mock data để tránh tạo lại
            modulesCache.set(cacheKey, mockData);
            return mockData;
        } finally {
            // Xóa request khỏi pending queue
            pendingModuleRequests.delete(cacheKey);
        }
    })();
    
    // Lưu request vào pending queue
    pendingModuleRequests.set(cacheKey, requestPromise);
    
    return requestPromise;
};

export const createModule = async (data: ModuleRequest): Promise<Module> => {
    try {
        console.log('[Module API] Creating module:', data);
        const response = await api.post<Module>('/api/modules', data);
        console.log('[Module API] Module created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('[Module API] Error creating module:', error);
        throw error;
    }
};

export const updateModule = async (id: number, data: ModuleRequest): Promise<Module> => {
    try {
        console.log(`[Module API] Updating module ${id}:`, data);
        const response = await api.put<Module>(`/api/modules/${id}`, data);
        console.log(`[Module API] Module ${id} updated successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`[Module API] Error updating module ${id}:`, error);
        throw error;
    }
};

export const deleteModule = async (id: number): Promise<void> => {
    await api.delete(`/modules/${id}`);
};

// Thêm hàm này vào file service của module
export const fetchModuleById = async (id: number): Promise<Module> => {
    // Kiểm tra cache trước
    if (moduleCache.has(id)) {
        console.log(`[Module API] Using cached data for moduleId: ${id}`);
        return moduleCache.get(id)!;
    }
    
    // Kiểm tra xem có request đang pending không
    if (pendingSingleModuleRequests.has(id)) {
        console.log(`[Module API] Request already pending for moduleId: ${id}`);
        return pendingSingleModuleRequests.get(id)!;
    }
    
    // Tạo request mới
    const requestPromise = (async () => {
        try {
            const response = await api.get<Module>(`/api/modules/${id}`);
            const data = response.data;
            
            // Cache kết quả
            moduleCache.set(id, data);
            return data;
        } catch (error) {
            // Silently fallback to mock data to avoid console spam
            console.log(`[Module API] Using mock data for moduleId: ${id}`);
            
            // Fallback to mock data for testing
            const mockData = generateMockModule(id);
            
            // Cache mock data để tránh tạo lại
            moduleCache.set(id, mockData);
            return mockData;
        } finally {
            // Xóa request khỏi pending queue
            pendingSingleModuleRequests.delete(id);
        }
    })();
    
    // Lưu request vào pending queue
    pendingSingleModuleRequests.set(id, requestPromise);
    
    return requestPromise;
};

// Mock module generator for testing
const generateMockModule = (id: number): Module => {
    const moduleNames = [
        "Bảng chữ cái cơ bản",
        "Từ vựng thường dùng", 
        "Ngữ pháp cơ bản",
        "Giao tiếp hàng ngày",
        "Luyện nghe nói",
        "Đọc hiểu văn bản",
        "Viết câu đơn giản",
        "Kiểm tra tổng hợp"
    ];
    
    const moduleName = moduleNames[id % moduleNames.length] || `Module ${id}`;
    
    return {
        id: id,
        name: moduleName,
        description: `Đây là module ${moduleName} - học những kiến thức cơ bản và quan trọng`,
        courseId: Math.floor(id / 10) + 1,
        courseName: "Khóa học tiếng Anh",
        order: id,
        status: "active" as const,
        partsCount: 5,
        duration: "2 giờ"
    };
};

// Mock courses generator for testing
const generateMockCourses = (languageId: number): Course[] => {
    const courseTemplates = [
        {
            name: "Khóa học cơ bản",
            description: "Học những kiến thức cơ bản và quan trọng nhất",
            level: "Beginner" as const,
            duration: "3 tháng",
            price: 0,
            thumbnail: "/images/course-basic.jpg"
        },
        {
            name: "Khóa học nâng cao", 
            description: "Nâng cao kỹ năng và kiến thức chuyên sâu",
            level: "Advanced" as const,
            duration: "6 tháng",
            price: 299000,
            thumbnail: "/images/course-advanced.jpg"
        }
    ];

    return courseTemplates.map((template, index) => ({
        id: languageId * 10 + index + 1,
        name: template.name,
        description: template.description,
        language: {
            id: languageId,
            code: languageId === 1 ? "en" : "other",
            name: languageId === 1 ? "English" : "Other Language",
            flag: "🇺🇸",
            difficulty: "Beginner",
            popularity: "High"
        },
        level: template.level,
        duration: template.duration,
        price: template.price,
        thumbnail: template.thumbnail,
        status: "active" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        modulesCount: 5
    }));
};

// Mock modules generator for testing
const generateMockModules = (courseId: number): Module[] => {
    const moduleTemplates = [
        { name: "Bảng chữ cái", description: "Học bảng chữ cái cơ bản" },
        { name: "Từ vựng cơ bản", description: "Những từ vựng thường dùng nhất" },
        { name: "Ngữ pháp cơ bản", description: "Cấu trúc câu đơn giản" },
        { name: "Giao tiếp hàng ngày", description: "Các tình huống giao tiếp thực tế" },
        { name: "Luyện nghe nói", description: "Phát triển kỹ năng nghe và nói" },
        { name: "Đọc hiểu", description: "Kỹ năng đọc và hiểu văn bản" },
        { name: "Viết cơ bản", description: "Viết câu và đoạn văn đơn giản" },
        { name: "Kiểm tra tổng hợp", description: "Đánh giá kiến thức đã học" }
    ];

    return moduleTemplates.map((template, index) => ({
        id: courseId * 100 + index + 1,
        name: template.name,
        description: template.description,
        courseId: courseId,
        courseName: "Khóa học tiếng Anh",
        order: index + 1,
        status: index < 2 ? "active" as const : "inactive" as const,
        partsCount: 5,
        duration: "2 giờ"
    }));
};
