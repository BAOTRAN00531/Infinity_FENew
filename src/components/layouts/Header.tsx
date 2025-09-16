import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/layouts/Logo";
import Button from "../reuseables/Button";

const Header: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isAuthLogin = pathname === "/auth/login";
    const isAuthRegister = pathname === "/auth/register";
    const showCTA = isAuthLogin || isAuthRegister;

    const action = isAuthRegister ? "register" : "login";
    const ctaLabel = action === "login" ? "Tạo Tài Khoản" : "Đăng nhập";
    const ctaTo = action === "login" ? "/auth/register" : "/auth/login";

    return (
        <header className="w-full">
            {/* container thống nhất cho mọi trang */}
            <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">
                <Logo />
                {showCTA && (
                    <Button type="cta" onClick={() => navigate(ctaTo)}>
                        {ctaLabel}
                    </Button>
                )}
            </div>

            {/* đường kẻ mảnh để cảm giác header “dính” nội dung */}
            {/*<div className="border-b border-slate-200" />*/}
        </header>
    );
};

export default Header;
