import React, { memo, useState } from 'react';
import { X } from 'lucide-react';
import { useUser } from "@/api/UserContext"; // THAY ĐỔI: Thêm import useUser

const SidebarAd: React.FC = memo(() => {
    const { userProfile, loading } = useUser(); // THAY ĐỔI: Lấy userProfile từ UserContext
    const [isVisible, setIsVisible] = useState(true);

    // THAY ĐỔI: Ẩn SidebarAd nếu đang tải hoặc user là VIP
    if (loading || userProfile?.isVip || !isVisible) {
        return null;
    }

    const handleClose = () => {
        setIsVisible(false);
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-200 mb-4 relative">
            <button
                onClick={handleClose}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
                <X size={16} />
            </button>
            <h4 className="font-bold text-sm mb-2">Ưu đãi khóa học VIP</h4>
            {/*300x250*/}
            <img
                src="https://i.ibb.co/B54N44q2/images.jpg"
                alt="Sidebar Advertisement"
                className="w-full h-auto rounded mb-2"
                loading="lazy"
            />
            <p className="text-xs text-gray-600 mb-2">
                Khám phá khóa học mới với ưu đãi lớn. Học ngay để nâng cao kỹ năng!
            </p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-4 rounded">
                Khám phá ngay
            </button>
        </div>
    );
});

SidebarAd.displayName = 'SidebarAd';

export default SidebarAd;