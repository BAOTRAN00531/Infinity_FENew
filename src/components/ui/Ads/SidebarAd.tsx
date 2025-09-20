// src/components/ui/Ads/SidebarAd.tsx
import React, { memo, useState } from 'react';
import { X } from 'lucide-react';

const SidebarAd: React.FC = memo(() => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200 mb-4 relative">
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
                <X size={16} />
            </button>
            <h4 className="font-bold text-sm mb-2">Ưu đãi đặc biệt</h4>
            {/*300x250*/}
            <img
                src="https://i.ibb.co/B54N44q2/images.jpg"
                alt="Sidebar Advertisement"
                className="w-full h-auto rounded mb-2"
                loading="lazy"
            />
            <p className="text-xs text-gray-600 mb-2">
                Khám phá tài lộc quá lớn ngay
                Uống xong thận bao khỏe
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-4 rounded">
                Khám phá ngay
            </button>
        </div>
    );
});

SidebarAd.displayName = 'SidebarAd';

export default SidebarAd;