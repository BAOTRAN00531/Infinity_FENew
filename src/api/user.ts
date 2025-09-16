// src/api/user.ts

// ✅ Kiểu dữ liệu cho thông tin hồ sơ
export interface UserProfile {
    id: number;
    username: string;
    email: string;
    fullName?: string;
    avatar?: string;
    role: string;
    isVip: boolean;
    vipExpiryDate?: string; // Định dạng ISO 8601 từ backend
}

// ✅ Kiểu dữ liệu để cập nhật thông tin hồ sơ
export interface UserProfileUpdate {
    fullName?: string;
    email: string;
}

// ✅ Kiểu dữ liệu để cập nhật mật khẩu
export interface PasswordUpdate {
    currentPassword: string;
    newPassword: string;
}