import { useEffect, useState } from 'react';
import { Eye, CheckCircle, Badge, Plus, Edit, Trash2, Clock, XCircle } from 'lucide-react';

// OrderCRUD - Component quản lý đơn hàng
// Xử lý CRUD operations cho hệ thống đơn hàng và thanh toán

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/reuseables/Management/build/dialog';
import { Button_admin } from "@/components/reuseables/Management/build/button_admin";
import { toast } from "react-toastify";
import OrderForm from '@/pages/Management/Form/OrderForm';
import OrderDetail from '@/pages/Management/Detail/OrderDetail';
import api from '@/api/api'; // ✅ Thay thế axios

export interface OrderResponse {
    orderCode: string;
    userName: string;
    courseId: number;
    courseName: string;
    totalAmount: number;
    orderDate: string;
    status: OrderStatus;
    paymentMethod: string;
}

export interface OrderDetailDTO {
    courseId: number;
    courseName: string;
    price: number;
    quantity: number;
    total: number;
}

type OrderStatus = 'pending' | 'paid' | 'cancelled' | 'failed';

const statusColor: Record<OrderStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    paid: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    failed: 'bg-gray-100 text-gray-600 border-gray-200',
};

const OrderCRUD = () => {
    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; orderCode: string | null }>({
        open: false,
        orderCode: null,
    });

    const fetchOrders = () => {
        api.get('/admin/history')
            .then((res) => {
                const normalizedOrders = res.data.map((order: any) => ({
                    ...order,
                    status: order.status.toLowerCase() as OrderStatus,
                }));
                setOrders(normalizedOrders);
            })
            .catch(() =>
                toast.error('Lỗi khi tải danh sách đơn hàng', {
                    autoClose: 1200,
                })
            );
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleApprove = (orderCode: string) => {
        api.post(`/api/admin/approve?orderCode=${orderCode}`)
            .then(() => {
                toast.success('Đơn đã được duyệt', {
                    autoClose: 1200,
                });
                fetchOrders();
                setIsViewOpen(false);
            })
            .catch(() =>
                toast.error('Lỗi khi duyệt đơn', {
                    autoClose: 1200,
                })
            );
    };

    const handleDelete = (orderCode: string) => {
        api.delete(`/api/admin/delete/${orderCode}`)
            .then(() => {
                toast.success("Đã xóa đơn hàng", {
                    autoClose: 1200,
                });
                fetchOrders();
            })
            .catch(() =>
                toast.error("Lỗi khi xóa đơn hàng", {
                    autoClose: 1200,
                })
            );
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl">
                        <Eye className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-800">Order Management</h2>
                        <p className="text-gray-600">Duyệt & quản lý đơn hàng học viên</p>
                    </div>
                </div>
                {/* ➕ Dialog tạo mới đơn hàng */}
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button_admin className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600">
                            <Plus className="w-5 h-5 mr-2" />
                            Tạo đơn hàng mới
                        </Button_admin>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl rounded-3xl max-h-[80vh] overflow-y-scroll">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Tạo đơn hàng</DialogTitle>
                        </DialogHeader>
                        <OrderForm
                            onSuccess={() => {
                                fetchOrders();
                                setIsCreateOpen(false);
                            }}
                            onCancel={() => setIsCreateOpen(false)}
                        />
                    </DialogContent>
                </Dialog>
            </div>




            <div className="overflow-x-auto bg-white rounded-2xl shadow">

                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-3 text-left">Mã đơn</th>
                        <th className="px-6 py-3 text-left">Ảnh</th>
                        <th className="px-6 py-3 text-left">Khóa học</th>
                        <th className="px-6 py-3 text-left">Người đặt</th>
                        <th className="px-6 py-3 text-left">Ngày đặt</th>
                        <th className="px-6 py-3 text-left">Trạng thái</th>
                        <th className="px-6 py-3 text-left">Tổng tiền</th>
                        <th className="px-6 py-3 text-right">Thao tác</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order: OrderResponse) => (

                        <tr key={order.orderCode} className="border-t hover:bg-gray-50">
                            <td className="px-6 py-4">{order.orderCode}</td>

                            <td className="px-6 py-4">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="Course"
                                    className="w-10 h-10 rounded object-cover"
                                />
                            </td>

                            <td className="px-6 py-4">{order.courseName}</td>
                            <td className="px-6 py-4">{order.userName}</td>
                            <td className="px-6 py-4">{new Date(order.orderDate).toLocaleString()}</td>
                            <td className="px-6 py-4">
                                <div className={`inline-flex items-center gap-2 px-3 py-1 border text-xs rounded-full font-medium ${
                                    statusColor[order.status] || 'bg-gray-200 text-gray-800'
                                }`}>
                                    {{
                                        pending: "🕒 Đang chờ",
                                        paid: "✅ Thành công",
                                        cancelled: "❌ Đã hủy",
                                        failed: "Thất bại",
                                    }[order.status] || "Không xác định"}
                                </div>
                            </td>

                            <td className="px-6 py-4">{order.totalAmount.toLocaleString()}₫</td>

                            <td className="px-6 py-4 text-right">
                                <div className="flex gap-2 justify-end">
                                    {/* 👁️ Xem chi tiết */}
                                    <Button_admin
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setIsViewOpen(true);
                                        }}
                                        className="rounded-xl hover:bg-blue-100"
                                    >
                                        <Eye className="w-4 h-4 mr-1" />
                                        Xem
                                    </Button_admin>

                                    {/* 🛠️ Chỉnh sửa đơn */}
                                    <Button_admin
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setIsEditOpen(true);
                                        }}
                                        className="rounded-xl hover:bg-yellow-100"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button_admin>

                                    {/* ✅ Duyệt thanh toán nếu pending */}
                                    {order.status.toLowerCase() === 'pending' && (
                                        <Button_admin
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleApprove(order.orderCode)}
                                            className="rounded-xl hover:bg-green-100"
                                        >
                                            <CheckCircle className="w-4 h-4 mr-1" />
                                            Duyệt
                                        </Button_admin>
                                    )}
                                    <Button_admin
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setConfirmDelete({ open: true, orderCode: order.orderCode })}
                                        className="rounded-xl hover:bg-red-100 text-red-600"
                                    >
                                        <XCircle className="w-4 h-4 mr-1" />
                                        Xóa
                                    </Button_admin>

                                </div>
                            </td>
                        </tr>
                    ))}

                    {orders.length === 0 && (
                        <tr>
                            <td colSpan={7} className="text-center text-gray-500 px-6 py-4">
                                Không có đơn hàng nào
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>


            </div>
            <Dialog open={confirmDelete.open} onOpenChange={(open) => setConfirmDelete({ open, orderCode: null })}>
                <DialogContent className="max-w-sm rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold">Xác nhận xóa đơn hàng?</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-600">Bạn có chắc chắn muốn xóa đơn hàng này không? Hành động này không thể hoàn tác.</p>

                    <div className="flex justify-end gap-2 mt-6">
                        <Button_admin
                            variant="ghost"
                            onClick={() => setConfirmDelete({ open: false, orderCode: null })}
                        >
                            Hủy
                        </Button_admin>
                        <Button_admin
                            className="bg-red-600 text-white hover:bg-red-700"
                            onClick={() => {
                                if (confirmDelete.orderCode) {
                                    handleDelete(confirmDelete.orderCode);
                                    setConfirmDelete({ open: false, orderCode: null });
                                }
                            }}
                        >
                            Xác nhận xóa
                        </Button_admin>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog xem chi tiết */}
            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="max-w-xl rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Chi tiết đơn hàng</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Mã đơn:</span>
                                <span className="font-medium">{selectedOrder.orderCode}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Khóa học:</span>
                                <span className="font-medium">{selectedOrder.courseName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tổng tiền:</span>
                                <span className="font-medium">{selectedOrder.totalAmount.toLocaleString()}₫</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Ngày đặt:</span>
                                <span className="font-medium">{new Date(selectedOrder.orderDate).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Trạng thái:</span>
                                <Badge className={`text-xs font-medium rounded-full ${statusColor[selectedOrder.status]}`}>
                                    {selectedOrder.status}
                                </Badge>
                            </div>

                            {selectedOrder.status === 'pending' && (
                                <div className="flex justify-end">
                                    <Button_admin
                                        className="bg-green-500 hover:bg-green-600 text-white mt-4"
                                        onClick={() => handleApprove(selectedOrder.orderCode)}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Duyệt đơn
                                    </Button_admin>
                                </div>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* ✏️ Dialog chỉnh sửa đơn hàng */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-2xl rounded-3xl max-h-[80vh] overflow-y-scroll">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Chỉnh sửa đơn hàng</DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                        <OrderForm
                            initialData={selectedOrder}
                            onSuccess={() => {
                                fetchOrders();
                                setIsEditOpen(false);
                            }}
                            onCancel={() => setIsEditOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>




        </div>
    );
};

export default OrderCRUD;
