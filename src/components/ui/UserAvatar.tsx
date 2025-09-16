// src/components/ui/UserAvatar.tsx
import React from 'react';
import { Crown } from 'lucide-react'; // Sử dụng icon Crown của Lucide React cho hiệu ứng VIP

interface UserAvatarProps {
    avatarUrl: string;
    isVip?: boolean; // Tùy chọn, mặc định là false
    alt: string;
    size?: 'sm' | 'md' | 'lg'; // Kích thước avatar
}

const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
};

const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, isVip = false, alt, size = 'md' }) => {
    const avatarSizeClass = sizeClasses[size];

    return (
        <div className={`relative ${avatarSizeClass} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}>
            {/* Ảnh avatar */}
            <img
                src={avatarUrl || '/images/avatars/default-avatar.png'}
                alt={alt}
                className="w-full h-full object-cover"
            />

            {/* Hiệu ứng VIP (nếu có) */}
            {isVip && (
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    {/* Đường viền VIP */}
                    <div className="absolute top-0 left-0 w-full h-full rounded-full ring-2 ring-yellow-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 animate-pulse-slow"></div>

                    {/* Icon Crown */}
                    <div className="absolute bottom-0 right-0 p-[2px] -translate-x-[2px] translate-y-[2px] bg-white dark:bg-gray-800 rounded-full">
                        <Crown className="w-4 h-4 text-yellow-500" fill="#facc15" strokeWidth={0.5} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAvatar;