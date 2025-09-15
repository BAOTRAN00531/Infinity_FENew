// OAuthSuccess.tsx
// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const OAuthSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ranRef = useRef(false); // chốt 1 lần cho StrictMode

    useEffect(() => {
        if (ranRef.current) return;  // ⛔ ngăn lần chạy thứ 2
        ranRef.current = true;

        try {
            const params = new URLSearchParams(location.search);
            const token = params.get("token");

            if (token) {
                localStorage.setItem("access_token", token);

                // Dùng id để Sonner tự gộp nếu lỡ bắn trùng
                toast.success("Đăng nhập thành công!", { id: "login-success" });

                navigate("/", { replace: true });
            } else {
                toast.error("Không tìm thấy token xác thực.");
                navigate("/auth/login", { replace: true });
            }
        } catch (e) {
            console.error("OAuth callback error", e);
            toast.error("Có lỗi khi xử lý đăng nhập.");
            navigate("/auth/login", { replace: true });
        }
    }, [location.search, navigate]);

    return (
        <div className="w-full h-[60vh] flex items-center justify-center text-slate-500">
            Đang xử lý đăng nhập...
        </div>
    );
};

export default OAuthSuccess;
