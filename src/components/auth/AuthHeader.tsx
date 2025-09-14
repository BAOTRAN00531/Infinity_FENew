import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
    getStoredUser,
    getStoredToken,
    clearAuthData,
    getUserRole,
} from "@/utils/authUtils";
import { logout } from "@/api/authService";
import { UserLogin } from "@/api/types";

interface AuthHeaderProps {
    className?: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ className = "" }) => {
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const user: UserLogin | null = getStoredUser();
    const token = getStoredToken();
    const userRole = getUserRole();

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            clearAuthData();
            toast.success("Đã đăng xuất thành công");
            navigate("/auth/login", { replace: true });
        }
    };

    const handleProfileClick = () => {
        navigate("/ho-so");
        setShowUserMenu(false);
    };

    const handleDashboardClick = () => {
        if (userRole === "ROLE_ADMIN") {
            navigate("/admin/dashboard");
        } else {
            navigate("/hoc");
        }
        setShowUserMenu(false);
    };

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
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                        {user.name || user.email}
                    </div>
                    <div className="text-xs text-gray-500">
                        {userRole === "ROLE_ADMIN" ? "Quản trị viên" : "Học viên"}
                    </div>
                </div>
                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </button>
            </div>

            {showUserMenu && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 z-20 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                        <button
                            onClick={handleDashboardClick}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={handleProfileClick}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Hồ sơ
                        </button>
                        <hr className="my-1" />
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AuthHeader;
