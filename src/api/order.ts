// src/api/order.ts
// Đây là file định nghĩa kiểu dữ liệu.
// Nó phải khớp chính xác với DTO bạn đã gửi từ backend.

export interface OrderResponse {
    orderCode: string;
    status: string;
    paymentMethod: string;
    totalAmount: number;
    orderDate: string;
    userId?: number;
    courseId?: number;
    duration?: number;
    // ✅ Thêm trường này để hiển thị tên dịch vụ/khóa học trong lịch sử
    serviceName?: string;
    // ✅ Hoặc nếu backend trả về thẳng courseName thì không cần
    courseName?: string;
    details: OrderDetailDTO[];
}

export interface CreateOrderRequest {
    userId: number;
    courseId: number;
    paymentMethod: string;
    duration?: number;
    price?: number;
}

// ✅ Sửa lại DTO này để khớp với backend của bạn
export interface CreateVipOrderRequest {
    userId: number; // Frontend sẽ lấy từ context
    paymentMethod: string;
    durationInMonths: number;
}

export enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
}

// export interface OrderDetailDTO {
//     courseId: number;
//     courseName: string;
//     price: number;
//     quantity: number;
//     total: number;
// }
export interface OrderDetailDTO {
    serviceName: string;
    serviceDesc: string;
    price: number;
}
