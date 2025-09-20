// src/components/ui/Ads/CenterPopupAd.tsx
import React, { useState, useEffect, memo } from 'react';
import { XCircle } from 'lucide-react';
import Button from "@/components/reuseables/Button";
import { useLocation } from 'react-router-dom';

const CenterPopupAd: React.FC = memo(() => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    // Không hiển thị trên các trang nhất định
    const excludedRoutes = ['/payment', '/admin', '/auth'];

    useEffect(() => {
        if (excludedRoutes.some(route => location.pathname.startsWith(route))) {
            return;
        }

        const showAd = () => {
            // Ngẫu nhiên hiển thị sau 2 đến 3 phút (120000 - 180000 ms)
            const randomDelay = Math.random() * 60000 + 120000;
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, randomDelay);
            return () => clearTimeout(timer);
        };

        const timer = showAd();
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative w-[400px] p-6 bg-white rounded-2xl shadow-xl animate-scale-in">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <XCircle size={28} />
                </button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">QUẢNG CÁO ĐẶC BIỆT</h2>
                    {/*300x200*/}
                    <img
                        src="https://i.ibb.co/pSpKVQd/Adult-capybara.webp"
                        alt="Pop-up Advertisement"
                        className="w-full h-auto rounded-lg mb-4"
                        loading="lazy" // Tối ưu tải ảnh
                    />
                    <p className="text-sm text-gray-600 mb-6">
                        Đừng bỏ lỡ cơ hội nhận ưu đãi cực hấp dẫn. Nhấp ngay!
                    </p>
                    <Button type="primary" onClick={handleClose}>
                        Xem chi tiết
                    </Button>
                </div>
            </div>
        </div>
    );
});

CenterPopupAd.displayName = 'CenterPopupAd';

export default CenterPopupAd;