import React from 'react';
import { Navigate, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
    allowedRoles?: string[];
    children?: React.ReactNode;
    redirectTo?: string;
}

interface DecodedToken {
    role: string;
    sub: string;
    exp: number;
    iat: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
    allowedRoles = [], 
    children, 
    redirectTo 
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Lấy token từ localStorage hoặc sessionStorage
    const token: string | null = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');

    // Nếu không có token, chuyển hướng đến trang đăng nhập
    if (!token) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    let decodedToken: DecodedToken;
    try {
        decodedToken = jwtDecode<DecodedToken>(token);
        
        // Kiểm tra token hết hạn
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
            // Token hết hạn, xóa token và chuyển hướng
            localStorage.removeItem('access_token');
            sessionStorage.removeItem('access_token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('user');
            return <Navigate to="/auth/login" state={{ from: location }} replace />;
        }
    } catch (error) {
        console.error('Invalid token:', error);
        // Token không hợp lệ, xóa token và chuyển hướng
        localStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    const userRole: string = decodedToken.role;

    // Nếu có yêu cầu kiểm tra role
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // Xác định trang redirect dựa trên role
        let defaultRedirect = '/';
        if (userRole === 'ROLE_ADMIN') {
            defaultRedirect = '/admin/dashboard';
        } else if (userRole === 'ROLE_STUDENT' || userRole === 'ROLE_USER') {
            defaultRedirect = '/student/dashboard';
        }
        
        const targetRedirect = redirectTo || defaultRedirect;
        
        // Chỉ redirect nếu đang ở trang khác với trang đích
        if (location.pathname !== targetRedirect) {
            return <Navigate to={targetRedirect} replace />;
        }
        
        // Nếu đã ở đúng trang nhưng không có quyền, hiển thị thông báo lỗi
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">
                            Không có quyền truy cập
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Bạn không có quyền truy cập trang này. Vui lòng liên hệ quản trị viên.
                        </p>
                        <div className="mt-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            >
                                Quay lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Nếu có children, render children, ngược lại render Outlet
    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
