import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Copy } from 'lucide-react';
import copy from 'copy-to-clipboard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from "@/api/api";
import {OrderStatus} from "@/api/order";

interface PaymentInfo {
    qrCodeUrl?: string;
    bankLogo?: string;
    bankName?: string;
    accountName?: string;
    accountNumber?: string;
    amount?: number;
    transferContent?: string;
    status?: string;
}

const SepayPaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const orderCode = query.get('orderCode');

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({});
    const [countdown, setCountdown] = useState<number>(300); // 5 phút = 300 giây
    const [isChecking, setIsChecking] = useState<boolean>(true);

    const handleCopy = (text: string) => {
        copy(text);
        toast.success('Đã sao chép!');
    };

    const handleCancelPayment = async () => {
        if (!orderCode) return;
        try {
            console.log("Hủy thanh toán đơn hàng:", orderCode);
            await api.post(`/api/sepay/cancel?orderCode=${orderCode}`);
            toast.info("Bạn đã hủy thanh toán đơn hàng này.");
            setIsChecking(false);
            navigate(`/invoice?orderId=${orderCode}&result=cancel`);
        } catch (err: any) {
            console.error("Lỗi khi hủy thanh toán:", err);
            toast.error("Hủy thanh toán thất bại!");
        }
    };

    useEffect(() => {
        if (!orderCode) {
            console.error("Không có orderCode trong URL");
            toast.error("Thiếu thông tin đơn hàng");
            navigate("/plan-trial");
            return;
        }

        console.log("Bắt đầu xử lý thanh toán cho order:", orderCode);

        // Lấy thông tin QR lần đầu
        const fetchPaymentInfo = async () => {
            try {
                console.log("Gọi API lấy thông tin thanh toán Sepay");
                const res = await api.get(`/sepay/pay?orderCode=${orderCode}`);
                console.log("Thông tin thanh toán nhận được:", res.data);
                setPaymentInfo(res.data);
            } catch (err) {
                console.error('Lỗi lấy thông tin thanh toán:', err);
                toast.error("Không thể lấy thông tin thanh toán");
            }
        };

        fetchPaymentInfo();

        // Polling trạng thái thanh toán
        const checkPaymentStatus = async () => {
            try {
                console.log("Kiểm tra trạng thái thanh toán...");
                const res = await api.get(`/sepay/status?orderCode=${orderCode}`);
                console.log("Payment status from backend:", res.data.status);

                const status = res.data?.status;

                if (status === OrderStatus.PAID) {
                    console.log("Thanh toán thành công!");
                    toast.success('Thanh toán thành công! Đang chuyển hướng...');
                    setIsChecking(false);
                    setTimeout(() => {
                        navigate(`/invoice?orderId=${orderCode}&result=success`);
                    }, 3000);
                } else if (status === OrderStatus.FAILED) {
                    console.log("Thanh toán thất bại");
                    toast.error('Thanh toán thất bại.');
                    setIsChecking(false);
                } else if (status === OrderStatus.CANCELLED) {
                    console.log("Đơn hàng đã bị hủy");
                    toast.info('Đơn hàng đã bị hủy.');
                    setIsChecking(false);
                    navigate(`/invoice?orderId=${orderCode}&result=cancel`);
                } else {
                    console.log("Đơn hàng đang chờ xử lý...");
                }
            } catch (err) {
                console.error('Lỗi kiểm tra trạng thái thanh toán:', err);
            }
        };

        const pollInterval = setInterval(checkPaymentStatus, 3000);
        const countdownInterval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(pollInterval);
                    clearInterval(countdownInterval);
                    setIsChecking(false);

                    console.log("Hết thời gian thanh toán, tự động hủy");
                    // 🔥 Hết thời gian thì tự động hủy đơn
                    handleCancelPayment();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            console.log("Dọn dẹp intervals");
            clearInterval(pollInterval);
            clearInterval(countdownInterval);
        };
    }, [orderCode, navigate]);

    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white shadow-lg rounded-md border p-8">
            <ToastContainer />

            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
                Xác thực thanh toán đơn hàng <span className="text-black">{orderCode}</span>
            </h2>

            {isChecking && (
                <div className="text-center text-sm text-red-600 mb-4">
                    ⏳ Thời gian còn lại để thanh toán: {Math.floor(countdown / 60)} phút {countdown % 60}s
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT - QR */}
                <div className="flex justify-center items-center">
                    {paymentInfo.qrCodeUrl ? (
                        <img
                            src={paymentInfo.qrCodeUrl}
                            alt="QR Code VietQR"
                            className="w-72 h-72 border rounded-md"
                        />
                    ) : (
                        <div className="text-red-500">Đang tải mã QR...</div>
                    )}
                </div>

                {/* RIGHT - Info */}
                <div className="space-y-4 text-sm">
                    {/* Ngân hàng */}
                    <div className="flex items-center gap-3">
                        {paymentInfo.bankLogo && (
                            <img src={paymentInfo.bankLogo} alt="Bank" className="w-10 h-10" />
                        )}
                        <div>
                            <div className="text-base font-semibold">
                                {paymentInfo.bankName || 'Đang tải...'}
                            </div>
                            <div className="text-gray-500">Ngân hàng</div>
                        </div>
                    </div>

                    {/* Chủ tài khoản */}
                    <div>
                        <div className="text-gray-500 mb-1">Chủ tài khoản</div>
                        <div className="font-medium">{paymentInfo.accountName || 'Đang tải...'}</div>
                    </div>

                    {/* Số tài khoản */}
                    <div>
                        <div className="text-gray-500 mb-1 flex items-center justify-between">
                            Số tài khoản
                            <Copy
                                onClick={() => handleCopy(paymentInfo.accountNumber || '')}
                                className="w-4 h-4 text-gray-500 cursor-pointer"
                            />
                        </div>
                        <div className="font-medium">{paymentInfo.accountNumber || 'Đang tải...'}</div>
                    </div>

                    {/* Số tiền */}
                    <div>
                        <div className="text-gray-500 mb-1">Số tiền</div>
                        <div className="text-lg font-bold text-green-600">
                            {paymentInfo.amount
                                ? Number(paymentInfo.amount).toLocaleString('vi-VN')
                                : '0'} VND
                        </div>
                    </div>

                    {/* Nội dung chuyển khoản */}
                    <div>
                        <div className="text-gray-500 mb-1 flex items-center justify-between">
                            Nội dung chuyển khoản
                            <Copy
                                onClick={() => handleCopy(paymentInfo.transferContent || '')}
                                className="w-4 h-4 text-gray-500 cursor-pointer"
                            />
                        </div>
                        <div className="font-medium">{paymentInfo.transferContent || 'Đang tải...'}</div>
                    </div>

                    <hr className="my-3" />

                    <div className="flex justify-between font-semibold text-base">
                        <span>Tổng cộng</span>
                        <span>
                            {paymentInfo.amount
                                ? Number(paymentInfo.amount).toLocaleString('vi-VN')
                                : '0'} VND
                        </span>
                    </div>
                </div>
            </div>

            {/* Nút Hủy thanh toán */}
            {isChecking && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleCancelPayment}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Hủy thanh toán
                    </button>
                </div>
            )}
        </div>
    );
};

export default SepayPaymentPage;