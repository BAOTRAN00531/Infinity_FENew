import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const NotFoundOverlay = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const content = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-[#0b1020] via-[#0e1a32] to-[#0b1020] text-white overflow-hidden">
            {/* 🌌 sao nhấp nháy */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(70)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-white/90 rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${1 + Math.random() * 3}s`,
                            opacity: 0.7,
                        }}
                    />
                ))}
                {/* 🌠 sao băng */}
                <span className="shooting-star" />
            </div>

            {/* nội dung */}
            <div className="relative text-center px-6">
                <h1 className="text-[12vw] md:text-[10rem] font-extrabold drop-shadow-[0_10px_25px_rgba(0,0,0,0.45)] leading-none">
                    404
                </h1>
                <p className="mt-4 text-xl md:text-2xl font-light">Oops! Trang không tồn tại 🚀</p>
                <NavLink
                    to="/"
                    className="inline-block mt-8 px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 transition shadow-lg"
                >
                    Quay về trang chủ
                </NavLink>
            </div>
        </div>
    );

    return createPortal(content, document.body);
};

export default NotFoundOverlay;
