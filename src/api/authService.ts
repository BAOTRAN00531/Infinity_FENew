import api from './api';
import { LoginDTO, RegisterDTO, ResLoginDTO } from '@/api/types';

/** Đăng nhập: trả về { access_token, userp } */
export const login = async (credentials: LoginDTO): Promise<ResLoginDTO> => {
    const response = await api.post<ResLoginDTO>('/auth/login', credentials);
    return response.data;
};

/** Đăng ký: trả về status + data để component check res.status */
export const register = async (registerDTO: RegisterDTO): Promise<{ status: number; data?: any }> => {
    const response = await api.post('/auth/register', registerDTO);
    return { status: response.status, data: response.data };
};

/** Đăng xuất */
export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
};

/** Forgot Password Flow */
export const sendResetPasswordEmail = async (
    email: string
): Promise<{ status: number; data?: any }> => {
    const response = await api.post('/auth/forgot-password', { email });
    return { status: response.status, data: response.data };
};

export const verifyOTP = async (
    email: string,
    otp: string
): Promise<{ status: number; data?: any }> => {
    const response = await api.post('/auth/validate-otp', { email, otp });
    return { status: response.status, data: response.data };
};

export const resetPassword = async (
    email: string,
    otp: string,
    newPassword: string
): Promise<{ status: number; data?: any }> => {
    const response = await api.post('/auth/reset-password', { email, otp, newPassword });
    return { status: response.status, data: response.data };
};

/** Check availability (public) — tránh redirect khi 401 ngoài ý muốn */
export const checkEmailExists = async (
    email: string
): Promise<{ exists: boolean; message?: string }> => {
    const response = await api.get(`/auth/check-email`, {
        params: { email },
        // @ts-expect-error: cờ mở rộng cho interceptor
        skipAuthRedirect: true,
    });
    return response.data;
};

export const checkEmailForReset = async (
    email: string
): Promise<{ exists: boolean; message?: string }> => {
    const response = await api.get(`/auth/check-email-for-reset`, {
        params: { email },
        // @ts-expect-error
        skipAuthRedirect: true,
    });
    return response.data;
};

export const checkUsernameExists = async (
    username: string
): Promise<{ exists: boolean; message?: string }> => {
    const response = await api.get(`/auth/check-username`, {
        params: { username },
        // @ts-expect-error
        skipAuthRedirect: true,
    });
    return response.data;
};

/** OAuth helpers: chuyển hướng sang endpoint OAuth của backend */
export const startGoogleOAuth = () => {
    const isDev = import.meta.env.DEV;
    const base = isDev ? '/api' : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080');
    window.location.href = `${base}/oauth2/authorization/google`;
};

export const startFacebookOAuth = () => {
    const isDev = import.meta.env.DEV;
    const base = isDev ? '/api' : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080');
    window.location.href = `${base}/oauth2/authorization/facebook`;
};

/**
 * ❌ Không cần hàm refreshToken riêng vì interceptor đã xử lý hoàn toàn.
 * Nếu vẫn muốn giữ, phải đồng nhất endpoint:
 *   GET /auth/refresh-token (withCredentials: true)
 * Nhưng khuyến nghị: bỏ để tránh lệch luồng.
 */
