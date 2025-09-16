// src/components/ui/Ads/HeroAd.tsx
import React, { memo } from 'react';

const HeroAd: React.FC = memo(() => {
    return (
        <div className="w-full p-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center shadow-lg">
            <h3 className="text-lg font-bold mb-2">Thưởng nạp báu +300%</h3>
            <img
                src="https://via.placeholder.com/800x150.png?text=Banner+Qu%E1%BA%A3ng+C%C3%A1o+Hero"
                alt="Hero Advertisement"
                className="w-full h-auto rounded-md"
                loading="lazy" // Tối ưu tải ảnh
            />
            <p className="text-sm mt-2">Áp dụng đến hết ngày 31/12/2023</p>
        </div>
    );
});

HeroAd.displayName = 'HeroAd';

export default HeroAd;