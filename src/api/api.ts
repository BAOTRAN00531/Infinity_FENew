import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

// Khởi tạo Axios instance
const isDev = import.meta.env.DEV;
const api: AxiosInstance = axios.create({
    // Dev: dùng proxy Vite qua /api → backend, Prod: gọi trực tiếp backend URL
    baseURL: isDev ? '/api' : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'),
    withCredentials: true, // Cho phép gửi cookie (httpOnly)
    headers: { 'Content-Type': 'application/json' },
    timeout: 10000, // Timeout 10s để tránh request treo
});

// Biến để theo dõi trạng thái refresh token
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: string) => void; reject: (reason?: any) => void }> = [];

// Hàm xử lý queue khi refresh token thành công
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
        else if (token) prom.resolve(token);
    });
    failedQueue = [];
};

// Interceptor cho request: Đính kèm access token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Mở rộng kiểu để dùng cờ tùy chỉnh và thao tác headers an toàn kiểu
type ExtendedAxiosRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
    // Nếu true: khi 401 thì KHÔNG refresh/redirect, chỉ trả lỗi về cho caller tự xử lý
    skipAuthRedirect?: boolean;
};

// Interceptor cho response: Xử lý refresh token khi nhận lỗi 401
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        // Nếu request này được đánh dấu bỏ qua redirect khi 401
        if (error.response?.status === 401 && originalRequest?.skipAuthRedirect) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest?._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            if (!originalRequest.headers) {
                                originalRequest.headers = new AxiosHeaders();
                            }
                            (originalRequest.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
                            resolve(api(originalRequest));
                        },
                        reject,
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshBase = isDev ? '/api' : (import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080');
                const res = await axios.get<{ access_token: string }>(`${refreshBase}/auth/refresh-token`, {
                    withCredentials: true,
                });

                const newAccessToken = res.data.access_token;
                if (!newAccessToken) throw new Error('No new access token received');

                // Lưu token mới để request interceptor dùng cho các request sau
                localStorage.setItem('access_token', newAccessToken);

                processQueue(null, newAccessToken);

                if (!originalRequest.headers) {
                    originalRequest.headers = new AxiosHeaders();
                }
                (originalRequest.headers as AxiosHeaders).set('Authorization', `Bearer ${newAccessToken}`);

                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                localStorage.removeItem('access_token');
                sessionStorage.removeItem('access_token');
                // 🔁 Sửa redirect đúng route hiện tại
                window.location.href = '/auth/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
