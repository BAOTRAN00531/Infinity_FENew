// src/hooks/useAdvertisements.ts
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { UserProfile } from '@/api/user';

export const useAdvertisements = (userProfile: UserProfile | null, pathname: string) => {
    const location = useLocation();
    const [showAds, setShowAds] = useState(false);

    // Danh sách các route không hiển thị quảng cáo
    const excludedRoutes = [
        '/auth',
        '/payment',
        '/invoice',
        '/order-history',
        '/sepay-payment',
        '/trial',
        '/remider',
        '/plan-trial',
        '/admin',
        '/lesson'
    ];

    useEffect(() => {
        const shouldShowAds = userProfile && !userProfile.isVip &&
            !excludedRoutes.some(route => location.pathname.startsWith(route));

        setShowAds(!!shouldShowAds);
    }, [location.pathname, userProfile]);

    return {
        showAds,
        excludedRoutes
    };
};