import React, { memo } from 'react';
import { XCircle } from 'lucide-react';
import Button from '@/components/reuseables/Button';

interface CenterPopupAdProps {
    onClose?: () => void;
}

const CenterPopupAd: React.FC<CenterPopupAdProps> = memo(({ onClose }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="relative w-[400px] p-6 bg-white rounded-2xl shadow-xl animate-scale-in">
                {/* Nút X để đóng */}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Đóng quảng cáo"
                    >
                        <XCircle size={28} />
                    </button>
                )}

                {/* Nội dung quảng cáo */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">KHÓA HỌC ĐẶC BIỆT</h2>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            console.log("Center popup ad clicked");
                            // TODO: xử lý click (mở modal / redirect)
                        }}
                    >
                        <img
                            src="https://i.ibb.co/pSpKVQd/Adult-capybara.webp"
                            alt="Pop-up Advertisement"
                            className="w-full h-auto rounded-lg mb-4"
                            loading="lazy"
                        />
                    </a>
                    <p className="text-sm text-gray-600 mb-6">
                        Nâng cấp VIP để học không giới hạn và nhận ưu đãi khóa học mới!
                    </p>
                    <Button
                        type="primary"
                        onClick={() => {
                            console.log("Xem chi tiết clicked");
                            if (onClose) onClose();
                            // TODO: xử lý click (redirect hoặc mở modal)
                        }}
                    >
                        Xem chi tiết
                    </Button>
                </div>
            </div>
        </div>
    );
});

CenterPopupAd.displayName = 'CenterPopupAd';

export default CenterPopupAd;