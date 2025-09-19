// ✅ Hàm lấy thông tin hồ sơ
import {UserLesson} from "@/models/lesson/UserLesson";
import api from "@/api/api";

export const fetchUserLesson = async (moduleId: number): Promise<UserLesson[]> => {
    try {
        const response = await api.get("/api/student/lesson", {
            params: {moduleId}
        });
        return response.data;
    } catch (error) {
        throw new Error("Không thể tải thông tin hồ sơ.");
    }
};