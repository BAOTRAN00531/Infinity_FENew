// src/components/reuseables/Button.tsx
import React, { ButtonHTMLAttributes } from 'react';
import { cn } from "../../lib/utils";

// Định nghĩa props chi tiết hơn
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type?: 'primary' | 'secondary' | 'accent' | 'cta' | 'ctaPremium' | 'muted' | 'danger' | 'ghosted';
    htmlType?: 'submit' | 'button' | 'reset'; // ✅ Thêm prop htmlType để kiểm soát hành vi gốc của button
    className?: string;
}

function Button({
                    className = "",
                    children,
                    onClick, // ✅ Đổi từ `onclick` sang `onClick`
                    type = "primary",
                    htmlType = "button", // ✅ Mặc định là 'button' để tránh gửi form không mong muốn
                    disabled = false,
                    ...rest // ✅ Dùng rest props để chuyển tất cả thuộc tính còn lại
                }: ButtonProps) {

    const buttonStyles = {
        primary: "bg-primary shadow-primary text-white",
        secondary: "bg-background text-slate-600 shadow-secondary",
        accent: "bg-accent text-white shadow-accent",
        cta: "bg-background text-primary shadow-secondary",
        ctaPremium: "bg-background text-premium-gradient shadow-secondary",
        muted: "bg-slate-100 shadow-muted text-slate-300",
        danger: "bg-red-400 shadow-danger text-white",
        ghosted: "bg-transparent text-slate-300 shadow-none hover:bg-slate-100",
    };

    return (
        <button
            disabled={disabled}
            type={htmlType} // ✅ Sử dụng htmlType để quyết định hành vi
            className={cn(
                "py-2.5 px-4 flex-center gap-2.5 text-md be-vietnam-pro-black uppercase rounded-2xl transition-all duration-200 cursor-pointer min-w-max max-w-max",
                "active:shadow-none active:translate-y-1",
                "disabled:cursor-not-allowed disabled:opacity-50",
                buttonStyles[type] || buttonStyles.primary,
                className
            )}
            onClick={onClick}
            {...rest} // ✅ Chuyển tất cả props còn lại
        >
            {children}
        </button>
    );
}

export default Button;