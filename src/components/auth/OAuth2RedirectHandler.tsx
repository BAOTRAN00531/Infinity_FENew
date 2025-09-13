import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import { getRedirectPathByRole } from '@/utils/authUtils';
import { UserLogin } from '@/api/types';
import LoadingIndicator from '@/components/LoadingIndicator';

interface OAuth2RedirectHandlerProps {
    className?: string;
}

const OAuth2RedirectHandler: React.FC<OAuth2RedirectHandlerProps> = ({ className = "" }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleOAuth2Redirect = async () => {
            try {
                // Lấy token và user info từ URL params hoặc từ backend
                const urlParams = new URLSearchParams(location.search);
                const token = urlParams.get('token') || localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
                
                if (!token) {
                    toast.error("Không thể xác thực OAuth2. Vui lòng thử lại.");
                    navigate("/auth/login");
                    return;
                }

                // Decode token để lấy thông tin user
                const decodedToken: any = jwtDecode(token);
                const role = decodedToken.role;

                // Tạo user object
                const user: UserLogin = {
                    id: decodedToken.sub || 0,
                    email: decodedToken.email || '',
                    name: decodedToken.name || decodedToken.email || 'User',
                    role: role
                };

                // Lưu token và user data
                const rememberMe = localStorage.getItem('rememberMe') === 'true';
                if (rememberMe) {
                    localStorage.setItem('access_token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    sessionStorage.setItem('access_token', token);
                    sessionStorage.setItem('user', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('access_token', token);
                    sessionStorage.setItem('user', JSON.stringify(user));
                }

                console.log("OAuth2 login successful:", { role, user });

                toast.success("Đăng nhập thành công!");

                // Redirect dựa trên role
                const redirectPath = getRedirectPathByRole(role);
                navigate(redirectPath, { replace: true });

            } catch (error) {
                console.error('OAuth2 redirect error:', error);
                toast.error("Lỗi xác thực OAuth2. Vui lòng thử lại.");
                navigate("/auth/login");
            }
        };

        handleOAuth2Redirect();
    }, [navigate, location]);

    return (
        <div className={`min-h-screen flex items-center justify-center ${className}`}>
            <div className="text-center">
                <LoadingIndicator />
                <p className="mt-4 text-gray-600">Đang xử lý đăng nhập...</p>
            </div>
        </div>
    );
};

export default OAuth2RedirectHandler;
