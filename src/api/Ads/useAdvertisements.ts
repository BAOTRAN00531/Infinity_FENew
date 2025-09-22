import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserProfile } from '@/api/user';

export const useAdvertisements = (userProfile: UserProfile | null, pathname: string) => {
    const location = useLocation();
    const [showAds, setShowAds] = useState(false);

    const includedRoutes = [
        '/phat-am',
        '/hoc',
        '/hoc-phan',
    ];

    useEffect(() => {
        const isAllowedRoute = includedRoutes.some(route => location.pathname.startsWith(route)) ||
            location.pathname.startsWith('/lession') ||
            (location.pathname === '/hoc' && location.search.includes('moduleId='));

        // THAY ĐỔI: Cập nhật showAds dựa trên userProfile?.isVip
        const shouldShowAds = userProfile && !userProfile.isVip && isAllowedRoute;

        setShowAds(!!shouldShowAds);
    }, [location.pathname, location.search, userProfile, userProfile?.isVip]); // THAY ĐỔI: Thêm userProfile?.isVip vào dependencies

    return {
        showAds,
        includedRoutes
    };
};