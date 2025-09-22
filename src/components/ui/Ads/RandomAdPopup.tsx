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
            // THAY ĐỔI: Tăng delay thành 30-60 giây để ít phiền hơn cho học viên free
            const randomDelay = Math.random() * 30000 + 30000;
            setTimeout(() => {
                // THAY ĐỔI: Đặt vị trí giữa màn hình thay vì random
                setPosition({ top: `50%`, left: `50%` });
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

            <h3 className="font-bold text-lg mb-2">ĐỪNG BỎ LỠ KHÓA HỌC!</h3> {/* THAY ĐỔI: Nội dung phù hợp học tập */}
            <p className="text-sm">
                Nâng cấp VIP để học không giới hạn và mở khóa bài học nâng cao!
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