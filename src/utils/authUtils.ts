import { jwtDecode } from 'jwt-decode';
import { UserLogin } from '@/api/types';

interface DecodedToken {
    role: string;
    sub: string;
    exp: number;
    iat: number;
    [key: string]: any;
}

export const getStoredToken = (): string | null => {
    return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
};

export const getStoredUser = (): UserLogin | null => {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Error parsing stored user:', error);
            return null;
        }
    }
    return null;
};

export const decodeToken = (token: string): DecodedToken | null => {
    try {
        return jwtDecode<DecodedToken>(token);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const isTokenValid = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded) return false;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
};

export const getUserRole = (): string | null => {
    const token = getStoredToken();
    if (!token) return null;
    
    const decoded = decodeToken(token);
    return decoded?.role || null;
};

export const isAdmin = (): boolean => {
    const role = getUserRole();
    return role === 'ROLE_ADMIN';
};

export const isStudent = (): boolean => {
    const role = getUserRole();
    return role === 'ROLE_STUDENT' || role === 'ROLE_USER';
};

export const hasRole = (allowedRoles: string[]): boolean => {
    const userRole = getUserRole();
    if (!userRole) return false;
    return allowedRoles.includes(userRole);
};

export const clearAuthData = (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
};

export const getRedirectPathByRole = (role: string): string => {
    switch (role) {
        case 'ROLE_ADMIN':
            return '/admin/dashboard';
        case 'ROLE_STUDENT':
        case 'ROLE_USER':
            return '/hoc';
        default:
            return '/';
    }
};

export const shouldRedirectToLogin = (): boolean => {
    const token = getStoredToken();
    if (!token) return true;
    
    return !isTokenValid(token);
};
