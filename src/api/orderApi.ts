// src/api/orderApi.ts

import api from "./api";
import {OrderResponse, CreateVipOrderRequest, OrderStatus, CreateOrderRequest} from "./order";
import axios from "axios";

/**
 * Tạo một đơn hàng VIP mới.
 * @param data Dữ liệu yêu cầu để tạo đơn hàng VIP.
 * @returns Promise<OrderResponse>
 */
export const createVipOrder = async (
    data: CreateVipOrderRequest
): Promise<OrderResponse> => {
    try {
        const response = await api.post<OrderResponse>("/api/orders/activate-vip", data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Lỗi Axios khi tạo đơn hàng VIP:", error.response);
            throw new Error(error.response?.data?.message || "Lỗi khi tạo đơn hàng VIP.");
        }
        console.error("Lỗi không xác định khi tạo đơn hàng VIP:", error);
        throw new Error("Lỗi không xác định.");
    }
};


/**
 * Kiểm tra trạng thái của một đơn hàng.
 * @param orderCode Mã đơn hàng.
 * @returns Promise<OrderStatus>
 */
export const getOrderStatus = async (
    orderCode: string
): Promise<OrderStatus> => {
    const response = await api.get<{ status: OrderStatus }>(
        `/orders/status/${orderCode}`
    );
    return response.data.status;
};

// /**
//  * Lấy chi tiết của một đơn hàng.
//  * @param orderCode Mã đơn hàng.
//  * @returns Promise<OrderResponse>
//  */
// export const getOrderDetails = async (
//     orderCode: string
// ): Promise<OrderResponse> => {
//     const response = await api.get<OrderResponse>(`/orders/${orderCode}`);
//     return response.data;
// };


/**
 * Hủy một đơn hàng đang ở trạng thái PENDING.
 * @param orderCode Mã đơn hàng cần hủy.
 * @returns Promise<void>
 */
export const cancelOrder = async (orderCode: string): Promise<void> => {
    try {
        await api.post(`/api/orders/cancel?orderCode=${orderCode}`, {});
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Lỗi Axios khi hủy đơn hàng:", error.response);
            throw new Error(error.response?.data?.message || "Không thể hủy đơn hàng.");
        }
        console.error("Lỗi không xác định:", error);
        throw new Error("Lỗi không xác định.");
    }
};


/**
 * Lấy chi tiết của một đơn hàng.
 * @param orderCode Mã đơn hàng.
 * @returns Promise<OrderResponse>
 */
export const getOrderDetails = async (
    orderCode: string
): Promise<OrderResponse> => {
    try {
        const response = await api.get<OrderResponse>(`/api/orders/code/${orderCode}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Lỗi Axios khi lấy chi tiết đơn hàng:", error.response);
            throw new Error(error.response?.data?.message || "Không thể lấy chi tiết đơn hàng.");
        }
        console.error("Lỗi không xác định:", error);
        throw new Error("Lỗi không xác định.");
    }
};


/**
 * Lấy lịch sử đơn hàng của người dùng hiện tại.
 * @param status Trạng thái đơn hàng để lọc (optional).
 * @returns Promise<OrderResponse[]>
 */
export const getOrderHistory = async (status?: string): Promise<OrderResponse[]> => {
    try {
        const response = await api.get<OrderResponse[]>(
            `/api/orders/history`,
            {
                params: { status }
            }
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Lỗi Axios khi tải lịch sử đơn hàng:", error.response);
            throw new Error(error.response?.data?.message || "Không thể tải lịch sử đơn hàng.");
        }
        console.error("Lỗi không xác định:", error);
        throw new Error("Lỗi không xác định.");
    }
};

/**
 * Tạo một đơn hàng mới (mua khóa học).
 * @param data Dữ liệu yêu cầu để tạo đơn hàng.
 * @returns Promise<OrderResponse>
 */
export const createOrder = async (
    data: CreateOrderRequest
): Promise<OrderResponse> => {
    try {
        const response = await api.post<OrderResponse>("/api/orders/create", data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Lỗi Axios khi tạo đơn hàng:", error.response);
            throw new Error(error.response?.data?.message || "Lỗi khi tạo đơn hàng.");
        }
        console.error("Lỗi không xác định khi tạo đơn hàng:", error);
        throw new Error("Lỗi không xác định.");
    }
};

