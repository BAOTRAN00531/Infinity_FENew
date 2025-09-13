// pages/InvoicePage.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PageLayout from '@/pages/Management/PageLayout';
import api from '@/api/api';
import { ShoppingCart } from "lucide-react"; // ✅ thay vì axios

interface OrderDetailDTO {
    serviceName: string;
    serviceDesc: string;
    price: number;
}
interface Invoice {
    courseName: string;
    orderCode: string;
    status: string;
    totalAmount: number;
    paymentMethod: string;
    orderDate: string;
    details: OrderDetailDTO[];
}

const statusBadge: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PROCESSING: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELED: 'bg-red-100 text-red-800',
};

const InvoicePage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const orderCode = searchParams.get('orderId');
    const result = searchParams.get('result');

    useEffect(() => {
        const fetchData = async () => {
            if (!orderCode) return;

            try {
                const { data } = await api.get<Invoice>(`/api/orders/code/${orderCode}`);
                setInvoice(data);
            } catch (err) {
                toast.error('Không thể tải hoá đơn', { autoClose: 1200 });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [orderCode]);

    const handleCancel = async () => {
        if (!invoice) return;
        if (!window.confirm('Bạn chắc chắn muốn huỷ đơn hàng này?')) return;

        try {
            await api.post(`/api/orders/cancel?orderCode=${invoice.orderCode}`, {});
            toast.success('Huỷ đơn thành công!', { autoClose: 1200 });
            setTimeout(() => navigate('/order-history'), 1500);
        } catch (err) {
            toast.error('Không thể huỷ đơn. Vui lòng thử lại.', { autoClose: 1200 });
        }
    };

    if (loading) return <div className="p-10 text-gray-600">Đang tải...</div>;
    if (!invoice) return <div className="p-10 text-red-500">Không tìm thấy hoá đơn.</div>;

    return (
        <PageLayout>
            <div className="max-w-2xl mx-auto px-4 py-10">
                {/* Tiêu đề */}
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`text-2xl font-bold mb-6 ${
                        result === 'success' ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {result === 'success' && '🎉 Thanh toán thành công!'}
                    {result === 'fail' && '❌ Đơn hàng đã huỷ'}
                    {result === 'pending' && '⏳ Đơn hàng đang chờ xử lý'}
                </motion.h2>

                {/* Card hoá đơn */}
                <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <span className="font-semibold">Mã đơn:</span>
                        <span className="font-mono">{invoice.orderCode}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="font-semibold">Khóa học:</span>
                        <span className="font-mono">{invoice.courseName}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="font-semibold">Ngày tạo:</span>
                        <span>
                            {new Date(invoice.orderDate).toLocaleString('vi-VN')}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="font-semibold">Phương thức:</span>
                        <span>{invoice.paymentMethod}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                        <span className="font-semibold">Trạng thái:</span>
                        <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                statusBadge[invoice.status] ?? 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            {invoice.status}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="font-semibold">Tổng tiền:</span>
                        <span className="text-green-600 font-bold">
                            {invoice.totalAmount.toLocaleString()}₫
                        </span>
                    </div>

                    {/* Chi tiết dịch vụ */}
                    {invoice.details?.length > 0 && (
                        <div className="mt-4">
                            <h4 className="font-semibold mb-3 text-lg">📋 Chi tiết đơn hàng</h4>

                            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-medium">Dịch vụ</th>
                                        <th className="px-4 py-2 text-left font-medium">Mô tả</th>
                                        <th className="px-4 py-2 text-right font-medium">Giá</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {invoice.details.map((d, idx) => (
                                        <tr
                                            key={idx}
                                            className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                        >
                                            <td className="px-4 py-2 font-medium">{d.serviceName}</td>
                                            <td className="px-4 py-2 text-gray-600 dark:text-gray-300">
                                                {d.serviceDesc}
                                            </td>
                                            <td className="px-4 py-2 text-right text-green-600 font-semibold">
                                                {d.price.toLocaleString()}₫
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Nút huỷ đơn */}
                    {invoice.status === 'PENDING' && (
                        <button
                            onClick={handleCancel}
                            className="mt-4 w-full sm:w-auto px-5 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Huỷ đơn hàng
                        </button>
                    )}
                </div>
            </div>

            {/* Nút tiếp tục mua hàng */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 mb-10 flex justify-center"
            >
                <Link
                    to="/client/course"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-2xl shadow-md transition duration-300"
                >
                    <ShoppingCart className="w-5 h-5" />
                    Tiếp tục mua hàng
                </Link>
            </motion.div>
        </PageLayout>
    );
};

export default InvoicePage;
