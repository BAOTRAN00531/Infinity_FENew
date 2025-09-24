import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useUser } from '@/api/UserContext';
import { useAdvertisements } from '@/api/Ads/useAdvertisements';

// Lazy load các component quảng cáo
const RandomAdPopup = lazy(() => import('@components/ui/Ads/RandomAdPopup'));
const FixedFooterAd = lazy(() => import('@components/ui/Ads/FixedFooterAd'));
const CenterPopupAd = lazy(() => import('@components/ui/Ads/CenterPopupAd')); // Thêm CenterPopupAd

// Fallback khi lazy-loading
const AdLoadingPlaceholder = () => (
    <div className="hidden">Loading advertisement...</div>
);

interface AdPopupWrapperProps {
    children: React.ReactNode;
    userProfile: any; // TODO: Định nghĩa type cụ thể cho userProfile
}

const AdPopupWrapper: React.FC<AdPopupWrapperProps> = ({ children, userProfile }) => {
    const { showAds } = useAdvertisements();
    const [adStates, setAdStates] = useState({
        isRandomPopupVisible: false,
        isFooterAdEnabled: false,
        isCenterPopupVisible: false, // Thêm state cho CenterPopupAd
    });

    useEffect(() => {
        // Nếu không hiển thị quảng cáo, tắt tất cả
        if (!showAds || !userProfile) {
            setAdStates({
                isRandomPopupVisible: false,
                isFooterAdEnabled: false,
                isCenterPopupVisible: false,
            });
            return;
        }

        // Reset state khi route thay đổi
        setAdStates({
            isRandomPopupVisible: false,
            isFooterAdEnabled: true, // Footer ad bật ngay
            isCenterPopupVisible: false, // Center popup sẽ bật sau delay
        });

        // Random delay (3-5 phút) cho CenterPopupAd
        const centerPopupDelay = Math.random() * 120000 + 180000; // 180-300 giây
        const centerPopupTimer = setTimeout(() => {
            setAdStates(prev => ({ ...prev, isCenterPopupVisible: true }));
        }, centerPopupDelay);

        // Random delay (4-12 giây) cho RandomAdPopup
        const randomPopupDelay = Math.random() * 8000 + 4000;
        const randomPopupTimer = setTimeout(() => {
            setAdStates(prev => ({ ...prev, isRandomPopupVisible: true }));
        }, randomPopupDelay);

        return () => {
            clearTimeout(centerPopupTimer);
            clearTimeout(randomPopupTimer);
        };
    }, [showAds, userProfile]);

    return (
        <>
            {/* Nội dung chính */}
            {children}

            {/* Random popup */}
            {adStates.isRandomPopupVisible && (
                <Suspense fallback={<AdLoadingPlaceholder />}>
                    <RandomAdPopup
                        onClose={() => setAdStates(prev => ({ ...prev, isRandomPopupVisible: false }))}
                    />
                </Suspense>
            )}

            {/* Footer ad */}
            {adStates.isFooterAdEnabled && (
                <Suspense fallback={<AdLoadingPlaceholder />}>
                    <FixedFooterAd
                        onClose={() => setAdStates(prev => ({ ...prev, isFooterAdEnabled: false }))}
                    />
                </Suspense>
            )}

            {/* Center popup */}
            {adStates.isCenterPopupVisible && (
                <Suspense fallback={<AdLoadingPlaceholder />}>
                    <CenterPopupAd
                        onClose={() => setAdStates(prev => ({ ...prev, isCenterPopupVisible: false }))}
                    />
                </Suspense>
            )}
        </>
    );
};

export default AdPopupWrapper;