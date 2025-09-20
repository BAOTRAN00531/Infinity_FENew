// src/components/ads/FixedFooterAd.tsx
import React, { memo } from "react";

interface FixedFooterAdProps {
    onClose?: () => void;
}

const FixedFooterAd: React.FC<FixedFooterAdProps> = memo(({ onClose }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full z-50">
            <div className="relative w-full">
                {/* Nút X để đóng */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded "
                        aria-label="Đóng quảng cáo"
                    >
                        ✕
                    </button>
                )}

                {/* Banner quảng cáo */}
                <a
                    href="#"
                    className="block transition-all duration-300 origin-bottom"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log("Footer ad clicked");
                        // TODO: xử lý click (mở modal / redirect)
                    }}
                >
                    <img
                        src="https://i.ibb.co/R4dktzm5/Screenshot2025-09-16152332.png"
                        alt="Fixed Footer Ad"
                        className="w-full h-auto"
                        loading="lazy"
                    />
                </a>
            </div>
        </div>
    );
});

FixedFooterAd.displayName = "FixedFooterAd";

export default FixedFooterAd;
