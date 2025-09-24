// src/api/Ads/useAdvertisements.ts

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUser } from '@/api/UserContext';
import { getUserRole } from '@/utils/authUtils';

// src/api/Ads/useAdvertisements.ts
export const useAdvertisements = () => {
    const location = useLocation();
    const { userProfile, loading } = useUser();
    const [showAds, setShowAds] = useState(false);

    const includedRoutes = [
        '/phat-am',
        '/hoc',
        '/hoc-phan',
        '/',          // Thêm
        '/courses',   // Thêm
        '/lessons',   // Thêm
        '/profile',   // Thêm
    ];

    useEffect(() => {
        if (loading) {
            return;
        }

        const isVip = userProfile?.isVip ?? false;
        const userRole = getUserRole();
        const isUserEntitled = isVip || userRole === 'ROLE_ADMIN';
        const isAllowedRoute = includedRoutes.some(route => location.pathname.startsWith(route));
        const shouldShowAds = !isUserEntitled && isAllowedRoute;

        setShowAds(shouldShowAds);
    }, [location.pathname, userProfile, loading]);

    return {
        showAds,
        includedRoutes,
    };
};