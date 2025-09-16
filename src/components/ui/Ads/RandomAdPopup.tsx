// src/components/ui/Ads/RandomAdPopup.tsx
import React, { useState, useEffect, memo } from 'react';
import { cn } from "@/lib/utils";
import { XCircle } from 'lucide-react';
import Button from "@/components/reuseables/Button";

interface RandomAdPopupProps {
    onClose: () => void;
}

const RandomAdPopup: React.FC<RandomAdPopupProps> = memo(({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: '0', left: '0' });

    useEffect(() => {
        const showAfterDelay = () => {
            // Hiển thị sau 1 khoảng thời gian ngẫu nhiên từ 5 đến 15 giây
            const randomDelay = Math.random() * 10000 + 5000;
            setTimeout(() => {
                // Đặt vị trí ngẫu nhiên trên màn hình
                const randomTop = Math.random() * 60 + 20; // Từ 20% đến 80% từ trên xuống
                const randomLeft = Math.random() * 60 + 20; // Từ 20% đến 80% từ trái sang
                setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
                setIsVisible(true);
            }, randomDelay);
        };

        // Kích hoạt khi component mount
        showAfterDelay();
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        onClose(); // Gọi hàm cha để xử lý
    };

    if (!isVisible) return null;

    return (
        <div
            className={cn(
                "fixed z-[100] w-[300px] p-4 bg-yellow-400 text-white rounded-lg shadow-xl animate-fade-in-down transition-all",
                "transform -translate-x-1/2 -translate-y-1/2" // Căn giữa
            )}
            style={{ top: position.top, left: position.left }}
        >
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-red-600 hover:text-red-700"
            >
                <XCircle size={24} />
            </button>

            <h3 className="font-bold text-lg mb-2">ĐỪNG BỎ LỠ!</h3>
            <p className="text-sm">
                Bạn đang bỏ lỡ những tính năng siêu VIP. Hãy nâng cấp tài khoản ngay để trải nghiệm không giới hạn!
            </p>
            <div className="mt-4 text-center">
                <Button className="font-bold" type="cta" onClick={handleClose}>
                    Nâng cấp ngay!
                </Button>
            </div>
        </div>
    );
});

RandomAdPopup.displayName = 'RandomAdPopup';

export default RandomAdPopup;