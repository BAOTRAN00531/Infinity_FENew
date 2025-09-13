import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getStoredUser, getStoredToken, clearAuthData, getUserRole } from '@/utils/authUtils';
import { UserLogin } from '@/api/types';

interface AuthHeaderProps {
    className?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ className = "" }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    const user: UserLogin | null = getStoredUser();
    const token = getStoredToken();
    const userRole = getUserRole();

    const handleLogout = () => {
        clearAuthData();
        toast.success("Đã đăng xuất thành công");
        navigate("/auth/login");
    };

    const handleProfileClick = () => {
        navigate("/ho-so");
        setShowUserMenu(false);
    };

    const handleDashboardClick = () => {
        if (userRole === 'ROLE_ADMIN') {
            navigate("/admin/dashboard");
        } else {
            navigate("/student/dashboard");
        }
        setShowUserMenu(false);
    };

    // Nếu chưa đăng nhập, hiển thị nút đăng nhập
    if (!user || !token) {
        return (
            <div className={`flex items-center gap-4 ${className}`}>
                <button
                    onClick={() => navigate("/auth/login")}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Đăng nhập
                </button>
                <button
                    onClick={() => navigate("/auth/register")}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Đăng ký
                </button>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            {/* User info và dropdown */}
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                        {user.name || user.email}
                    </div>
                    <div className="text-xs text-gray-500">
                        {userRole === 'ROLE_ADMIN' ? 'Quản trị viên' : 'Học viên'}
                    </div>
                </div>
                
                {/* Avatar */}
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </button>
            </div>

            {/* Dropdown menu */}
            {showUserMenu && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowUserMenu(false)}
                    />
                    
                    {/* Menu */}
                    <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                        <button
                            onClick={handleDashboardClick}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                            </svg>
                            Dashboard
                        </button>
                        
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Hồ sơ
                        </button>
                        
                        <hr className="my-1" />
                        
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Đăng xuất
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AuthHeader;
