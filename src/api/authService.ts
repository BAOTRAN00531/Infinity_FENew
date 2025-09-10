import api from './api';
import { LoginDTO, RegisterDTO, ResLoginDTO } from '@/api/types';
import axios from "axios";

export const login = async (credentials: LoginDTO): Promise<ResLoginDTO> => {
    const response = await api.post<ResLoginDTO>('/auth/login', credentials);
    return response.data;
};

export const register = async (registerDTO: RegisterDTO): Promise<{ status: number; data?: any }> => {
    const response = await api.post('/auth/register', registerDTO);
    return { status: response.status, data: response.data };
};

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout');
};

// Forgot Password Flow APIs
export const sendResetPasswordEmail = async (email: string): Promise<{ status: number; data?: any }> => {
    const response = await api.post('/auth/forgot-password', { email });
    return { status: response.status, data: response.data };
};

export const verifyOTP = async (email: string, otp: string): Promise<{ status: number; data?: any }> => {
    const response = await api.post('/auth/validate-otp', { email, otp });
    return { status: response.status, data: response.data };
};

export const resetPassword = async (email: string, otp: string, newPassword: string): Promise<{ status: number; data?: any }> => {
    const response = await api.post('/auth/reset-password', { email, otp, newPassword });
    return { status: response.status, data: response.data };
};

// Check availability APIs
export const checkEmailExists = async (email: string): Promise<{ exists: boolean; message?: string }> => {
    const response = await api.get(`/auth/check-email?email=${encodeURIComponent(email)}`);
    return response.data;
};

export const checkEmailForReset = async (email: string): Promise<{ exists: boolean; message?: string }> => {
    const response = await api.get(`/auth/check-email-for-reset?email=${encodeURIComponent(email)}`);
    return response.data;
};

export const checkUsernameExists = async (username: string): Promise<{ exists: boolean; message?: string }> => {
    const response = await api.get(`/auth/check-username?username=${encodeURIComponent(username)}`);
    return response.data;
};

export async function refreshToken() {
    const res = await axios.post("/api/refresh", null, {
        withCredentials: true // để gửi cookie refresh_token
    });
    return res.data.access_token;
}
