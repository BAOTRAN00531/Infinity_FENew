// src/api/userApi.ts
import api from "./api";
import { UserProfile, UserProfileUpdate, PasswordUpdate } from "@/api/user";
import axios from "axios";
import { toast } from "sonner"; // ✅ Import toast để hiển thị thông báo

// ✅ Hàm lấy thông tin hồ sơ
export const fetchUserProfile = async (): Promise<UserProfile> => {
    try {
        const response = await api.get("/api/users/me");
        return response.data;
    } catch (error) {
        throw new Error("Không thể tải thông tin hồ sơ.");
    }
};

// ✅ Hàm cập nhật thông tin hồ sơ
export const updateUserProfile = async (data: UserProfileUpdate): Promise<void> => {
    try {
        await api.post("/api/users/me/profile", data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Ném lỗi với thông báo từ backend
            throw new Error(error.response.data || "Cập nhật hồ sơ thất bại.");
        }
        throw new Error("Lỗi mạng hoặc lỗi không xác định.");
    }
};

// ✅ Hàm cập nhật mật khẩu
export const updatePassword = async (data: PasswordUpdate): Promise<void> => {
    try {
        await api.post("/api/users/me/password", data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            // Ném lỗi với thông báo từ backend
            throw new Error(error.response.data || "Đổi mật khẩu thất bại.");
        }
        throw new Error("Lỗi mạng hoặc lỗi không xác định.");
    }
};