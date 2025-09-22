import React, { useState, useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { UserProfile } from "@/api/user";
import { useAdvertisements } from "@/api/Ads/useAdvertisements";
import { jwtDecode } from 'jwt-decode'; // THAY ĐỔI: Thêm import jwt-decode

// THAY ĐỔI: Định nghĩa interface cho DecodedToken giống như trong ProtectedRoute
interface DecodedToken {
    role: string;
    sub: string;
    exp: number;
    iat: number;
}

// Lazy load các component quảng cáo
const RandomAdPopup = lazy(() => import("@components/ui/Ads/RandomAdPopup"));
const CenterPopupAd = lazy(() => import("@components/ui/Ads/CenterPopupAd"));
const FixedFooterAd = lazy(() => import("@components/ui/Ads/FixedFooterAd"));

interface AdPopupWrapperProps {
    userProfile: UserProfile | null;
    children: React.ReactNode;
}

// Fallback khi lazy-loading
const AdLoadingPlaceholder = () => (
    <div className="hidden">Loading advertisement...</div>
);

const AdPopupWrapper: React.FC<AdPopupWrapperProps> = ({ userProfile, children }) => {
    const location = useLocation();

    // Hook kiểm tra điều kiện hiển thị ads
    let { showAds } = useAdvertisements(userProfile, location.pathname);

    // THAY ĐỔI: Kiểm tra userRole từ token và isVip từ userProfile
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    let userRole: string | null = null;
    if (token) {
        try {
            const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
            userRole = decodedToken.role;
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }
    // Ẩn quảng cáo nếu user là VIP hoặc ROLE_ADMIN
    if (userProfile?.isVip || userRole === 'ROLE_ADMIN') {
        showAds = false;
    }

    const [isRandomPopupVisible, setIsRandomPopupVisible] = useState(false);
    const [isCenterPopupEnabled, setIsCenterPopupEnabled] = useState(false);
    const [isFooterAdEnabled, setIsFooterAdEnabled] = useState(false);

    useEffect(() => {
        if (showAds) {
            // Reset popup khi route thay đổi
            setIsRandomPopupVisible(false);

            // Random delay (4-12 giây) cho popup ngẫu nhiên
            const randomDelay = Math.random() * 8000 + 4000;
            const randomTimer = setTimeout(() => {
                setIsRandomPopupVisible(true);
            }, randomDelay);

            // Bật các loại quảng cáo khác
            setIsCenterPopupEnabled(true);
            setIsFooterAdEnabled(true);

            return () => clearTimeout(randomTimer);
        } else {
            // Tắt hết quảng cáo nếu không được hiển thị
            setIsRandomPopupVisible(false);
            setIsCenterPopupEnabled(false);
            setIsFooterAdEnabled(false);
        }
    }, [showAds, location.pathname]);

    return (
        <>
            {/* Nội dung chính */}
            {children}

            {/* Random popup */}
            {isRandomPopupVisible && (
                <Suspense fallback={<AdLoadingPlaceholder />}>
                    <RandomAdPopup onClose={() => setIsRandomPopupVisible(false)} />
                </Suspense>
            )}

            {/* Popup trung tâm */}
            {isCenterPopupEnabled && (
                <Suspense fallback={<AdLoadingPlaceholder />}>
                    <CenterPopupAd />
                </Suspense>
            )}

            {/* Footer ad */}
            {isFooterAdEnabled && (
                <Suspense fallback={<AdLoadingPlaceholder />}>
                    <FixedFooterAd onClose={() => setIsFooterAdEnabled(false)} />
                </Suspense>
            )}
        </>
    );
};

export default AdPopupWrapper;