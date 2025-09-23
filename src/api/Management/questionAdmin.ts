// src/api/Management/questionAdmin.ts
import api from '@/api/api';
import type { AxiosResponse } from 'axios';

type AnyObj = Record<string, any>;

/**
 * Chuẩn hoá payload gửi BE:
 * - đảm bảo difficulty UPPERCASE (EASY/MEDIUM/HARD)
 * - giữ cả questionTypeId và type (để BE nào cũng hiểu)
 */
function buildPayload(q: AnyObj): AnyObj {
    const difficulty =
        (q.difficulty ?? 'EASY').toString().toUpperCase();

    const questionTypeId = Number(q.questionTypeId ?? q.typeId ?? 1);

    // Nếu có 'type' thì giữ, còn không thì suy ra từ id
    const type =
        q.type ??
        ({
            1: 'single_choice',
            3: 'reorder_words',
            4: 'text_input',
            5: 'fill_in_blank',
            6: 'speaking',
            7: 'matching',
            8: 'single_choice_image',
            9: 'listening',
        } as Record<number, string>)[questionTypeId] ??
        'single_choice';

    return {
        ...q,
        difficulty,
        questionTypeId,
        type,
        actorUserId: q.actorUserId || 1, // Thêm actorUserId mặc định
    };
}

/**
 * Tạo câu hỏi (trả về AxiosResponse để form hiển thị toast…)
 */
export async function createQuestion(
    uiQuestion: AnyObj
): Promise<AxiosResponse<any>> {
    const payload = buildPayload(uiQuestion);
    // BE tiêu chuẩn: POST /api/admin/questions
    // (baseURL của api đã là /api)
    return api.post('/admin/questions', payload);
}

/**
 * Cập nhật câu hỏi
 */
export async function updateQuestion(
    id: number,
    uiQuestion: AnyObj
): Promise<AxiosResponse<any>> {
    const payload = buildPayload(uiQuestion);
    return api.put(`/admin/questions/${id}`, payload);
}
