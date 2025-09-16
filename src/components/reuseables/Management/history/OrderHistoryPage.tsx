// src/pages/OrderHistoryPage.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { getOrderHistory } from "@/api/orderApi";
import { OrderResponse } from "@/api/order";
import axios from 'axios';
import PageLayout from "@pages/Management/PageLayout";

// ✅ Các màu sắc cho từng trạng thái
const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PAID: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    FAILED: 'bg-red-100 text-red-800', // Thêm trạng thái này nếu backend có trả về
};

const ITEMS_PER_PAGE = 5;

const OrderHistoryPage: React.FC = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // ✅ Gọi hàm API đã tạo
                const res = await getOrderHistory(statusFilter);
                setOrders(res);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    toast.error(err.response?.data?.message || 'Lỗi khi tải lịch sử đơn hàng.', { duration: 1200 });
                } else {
                    toast.error('Lỗi không xác định khi tải lịch sử.', { duration: 1200 });
                }
                console.error('Lỗi khi tải lịch sử đơn hàng:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [statusFilter]); // ✅ Thêm statusFilter vào dependency array

    const filteredOrders = orders
        .filter(order =>
            order.orderCode.toLowerCase().includes(search.toLowerCase())
        );

    const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <PageLayout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <motion.h2
                    className="text-2xl font-bold text-gray-800 dark:text-white mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    Lịch sử đơn hàng
                </motion.h2>

                {/* Search + Filter */}
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Tìm theo mã đơn hàng..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-1/3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-sm"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full sm:w-1/4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-sm"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="PAID">Đã thanh toán</option>
                        <option value="CANCELLED">Đã huỷ</option>
                        <option value="FAILED">Thất bại</option>
                    </select>
                </div>

                {loading ? (
                    <motion.p className="text-gray-500 dark:text-gray-300">Đang tải...</motion.p>
                ) : filteredOrders.length === 0 ? (
                    <motion.p className="text-gray-500 dark:text-gray-300">Không có đơn hàng nào.</motion.p>
                ) : (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="overflow-x-auto rounded shadow"
                        >
                            <table className="min-w-full bg-white dark:bg-gray-800 text-sm">
                                <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700 text-left text-xs uppercase text-gray-600 dark:text-gray-300 tracking-wider">
                                    <th className="px-6 py-3">Mã đơn</th>
                                    <th className="px-6 py-3">Dịch vụ</th>
                                    <th className="px-6 py-3">Trạng thái</th>
                                    <th className="px-6 py-3">Ngày đặt</th>
                                    <th className="px-6 py-3">Tổng tiền</th>
                                    <th className="px-6 py-3">#</th>
                                </tr>
                                </thead>
                                <tbody>
                                {paginatedOrders.map((order, index) => (
                                    <motion.tr
                                        key={order.orderCode}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                                        title={`Chi tiết đơn hàng ${order.orderCode}`}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                            {order.orderCode}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {order.details[0]?.serviceName || "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-0.5 rounded ${statusColors[order.status.toUpperCase()] || 'bg-gray-100 text-gray-800'}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {formatDateTime(order.orderDate)}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-green-600 dark:text-green-400 text-right">
                                            {order.totalAmount?.toLocaleString()}₫
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => {
                                                    let result = 'fail';
                                                    if (order.status === 'PAID') {
                                                        result = 'success';
                                                    } else if (order.status === 'PENDING') {
                                                        result = 'pending';
                                                    } else if (order.status === 'CANCELLED') {
                                                        result = 'fail';
                                                    }
                                                    navigate(`/invoice?orderId=${order.orderCode}&result=${result}`);
                                                }}
                                                className="text-sm px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                                            >
                                                Xem chi tiết
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                                </tbody>
                            </table>
                        </motion.div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-4 flex justify-center gap-2">
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === i + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                                        } hover:bg-blue-600 hover:text-white transition`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </PageLayout>
    );
};

export default OrderHistoryPage;