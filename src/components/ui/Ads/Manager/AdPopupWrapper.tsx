// src/components/layout/AdPopupWrapper.tsx
import React, { useState, useEffect, Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import { UserProfile } from "@/api/user";
import {useAdvertisements} from "@/api/Ads/useAdvertisements";

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
    const { showAds } = useAdvertisements(userProfile, location.pathname);

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
