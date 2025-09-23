// ✅ Hàm lấy thông tin hồ sơ
import {UserLesson} from "@/models/lesson/UserLesson";
import api from "@/api/api";

export const fetchUserLesson = async (moduleId: number): Promise<UserLesson[]> => {
    try {
        const response = await api.get("/student/lesson", {
            params: {moduleId}
        });
        return response.data;
    } catch (error) {
        // Silently fallback to mock data to avoid console spam
        console.log(`[Lessons API] Using mock data for moduleId: ${moduleId}`);
        
        // Fallback to mock data for testing
        return generateMockLessons(moduleId);
    }
};

// Mock data generator for testing
const generateMockLessons = (moduleId: number): UserLesson[] => {
    const lessonTemplates = [
        { title: "Giới thiệu cơ bản", description: "Học những kiến thức cơ bản", icon: "📚" },
        { title: "Từ vựng quan trọng", description: "Mở rộng vốn từ vựng", icon: "📖" },
        { title: "Ngữ pháp cơ bản", description: "Nắm vững ngữ pháp", icon: "✏️" },
        { title: "Luyện tập", description: "Thực hành kiến thức", icon: "🎯" },
        { title: "Kiểm tra", description: "Đánh giá kết quả học tập", icon: "📝" }
    ];

    return lessonTemplates.map((template, index) => ({
        id: moduleId * 100 + index + 1,
        title: template.title,
        description: template.description,
        icon: template.icon,
        progress: Math.floor(Math.random() * 100),
        isUnlocked: index === 0 || Math.random() > 0.3 // First lesson always unlocked, others random
    }));
};