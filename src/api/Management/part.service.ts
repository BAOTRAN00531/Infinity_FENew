// src/api/part.service.ts

import api from '@/api/api';
import { Part, PartRequest } from '@/api/types'; // Assumed you've defined these types

// Cache để tránh gọi API trùng lặp
const partsCache = new Map<string, Part[]>();
const partCache = new Map<number, Part>();

// Request deduplication - ngăn chặn gọi API trùng lặp
const pendingRequests = new Map<string, Promise<Part[]>>();
const pendingPartRequests = new Map<number, Promise<Part>>();

// Part Service - API service cho việc quản lý parts/lessons
// Cung cấp các function CRUD cho parts với dependency modules

// Lấy tất cả các Part (bài học), có thể lọc theo moduleId
export const fetchParts = async (moduleId?: number): Promise<Part[]> => {
    const cacheKey = `parts_${moduleId || 'all'}`;
    
    // Kiểm tra cache trước
    if (partsCache.has(cacheKey)) {
        console.log(`[Parts API] Using cached data for moduleId: ${moduleId || 'all'}`);
        return partsCache.get(cacheKey)!;
    }
    
    // Kiểm tra xem có request đang pending không
    if (pendingRequests.has(cacheKey)) {
        console.log(`[Parts API] Request already pending for moduleId: ${moduleId || 'all'}`);
        return pendingRequests.get(cacheKey)!;
    }
    
    // Tạo request mới
    const requestPromise = (async () => {
        try {
            const params = moduleId ? { moduleId } : {};
            console.log(`[Parts API] Fetching parts from backend with params:`, params);
            const response = await api.get<Part[]>('/lessons', { params });
            const data = response.data;
            console.log(`[Parts API] Received parts:`, data);
            
            // Cache kết quả
            partsCache.set(cacheKey, data);
            return data;
        } catch (error) {
            console.error(`[Parts API] Error fetching parts for moduleId: ${moduleId || 'all'}`, error);
            throw error;
        } finally {
            // Xóa request khỏi pending queue
            pendingRequests.delete(cacheKey);
        }
    })();
    
    // Lưu request vào pending queue
    pendingRequests.set(cacheKey, requestPromise);
    
    return requestPromise;
};

// Lấy chi tiết một Part bằng ID
export const fetchPartById = async (id: number): Promise<Part> => {
    // Kiểm tra cache trước
    if (partCache.has(id)) {
        console.log(`[Parts API] Using cached data for partId: ${id}`);
        return partCache.get(id)!;
    }
    
    // Kiểm tra xem có request đang pending không
    if (pendingPartRequests.has(id)) {
        console.log(`[Parts API] Request already pending for partId: ${id}`);
        return pendingPartRequests.get(id)!;
    }
    
    // Tạo request mới
    const requestPromise = (async () => {
        try {
            console.log(`[Parts API] Fetching part ${id} from backend...`);
            const response = await api.get<Part>(`/api/lessons/${id}`);
            const data = response.data;
            console.log(`[Parts API] Received part:`, data);
            
            // Cache kết quả
            partCache.set(id, data);
            return data;
        } catch (error) {
            console.error(`[Parts API] Error fetching part ${id}:`, error);
            throw error;
        } finally {
            // Xóa request khỏi pending queue
            pendingPartRequests.delete(id);
        }
    })();
    
    // Lưu request vào pending queue
    pendingPartRequests.set(id, requestPromise);
    
    return requestPromise;
};

// Tạo một Part mới
export const createPart = async (data: PartRequest): Promise<Part> => {
    try {
        // Transform PartRequest to LessonDto format
        const lessonDto = {
            name: data.name,
            description: data.description || '',
            content: data.content || '',
            type: data.type,
            videoUrl: data.videoUrl || '',
            orderIndex: 1, // Default order, can be calculated from module
            duration: data.duration || '',
            status: data.status,
            isCompleted: false,
            moduleId: data.moduleId
        };
        
        console.log('[Parts API] Sending data:', lessonDto);
        const response = await api.post<Part>('/lessons', lessonDto);
        console.log('[Parts API] Part created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('[Parts API] Error creating part:', error);
        throw error;
    }
};

// Cập nhật một Part
export const updatePart = async (id: number, data: PartRequest): Promise<Part> => {
    try {
        // Transform PartRequest to LessonDto format
        const lessonDto = {
            name: data.name,
            description: data.description || '',
            content: data.content || '',
            type: data.type,
            videoUrl: data.videoUrl || '',
            orderIndex: 1, // Default order, can be calculated from module
            duration: data.duration || '',
            status: data.status,
            isCompleted: false,
            moduleId: data.moduleId
        };
        
        console.log('[Parts API] Updating part with data:', lessonDto);
        const response = await api.put<Part>(`/api/lessons/${id}`, lessonDto);
        console.log(`[Parts API] Part ${id} updated successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error('[Parts API] Error updating part:', error);
        throw error;
    }
};

// Xóa một Part
export const deletePart = async (id: number): Promise<void> => {
    try {
        console.log(`[Parts API] Deleting part ${id}...`);
        await api.delete(`/api/lessons/${id}`);
        console.log(`[Parts API] Part ${id} deleted successfully`);
    } catch (error) {
        console.error(`[Parts API] Error deleting part ${id}:`, error);
        throw error;
    }
};


// Utility functions để quản lý cache
export const clearPartsCache = () => {
    partsCache.clear();
    partCache.clear();
    pendingRequests.clear();
    pendingPartRequests.clear();
    console.log('[Parts API] Cache and pending requests cleared');
};

export const clearPartsCacheForModule = (moduleId: number) => {
    const cacheKey = `parts_${moduleId}`;
    partsCache.delete(cacheKey);
    pendingRequests.delete(cacheKey);
    console.log(`[Parts API] Cache cleared for moduleId: ${moduleId}`);
};