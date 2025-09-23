// src/api/languageService.ts
import api from '@/api/api';

export type Language = {
    id?: number;
    code: string;
    name: string;
    flag?: string;
    difficulty?: string;
    popularity?: string;
};

const FALLBACK_LANGS: Language[] = [
    { id: 1, code: 'en-US', name: 'English (US)', flag: '🇺🇸', difficulty: 'Beginner', popularity: 'High' },
    { id: 2, code: 'vi-VN', name: 'Tiếng Việt',  flag: '🇻🇳', difficulty: 'Beginner', popularity: 'High' },
    { id: 3, code: 'ja-JP', name: '日本語',        flag: '🇯🇵', difficulty: 'Advanced', popularity: 'Low'  },
];

export async function fetchLanguages(): Promise<Language[]> {
    try {
        // baseURL của api là '/api', nên chỉ gọi '/languages'
        const { data } = await api.get('/languages');
        if (Array.isArray(data) && data.length) {
            // Chuẩn hóa về kiểu Language
            return data
                .map((d: any, i: number) => ({
                    id: Number.isFinite(+d?.id) ? +d.id : i + 1,
                    code: d?.code ?? d?.languageCode ?? '',
                    name: d?.name ?? d?.displayName ?? d?.code ?? 'Unknown',
                    flag: d?.flag,
                    difficulty: d?.difficulty,
                    popularity: d?.popularity,
                }))
                .filter((x: Language) => !!x.code);
        }
    } catch (e) {
        console.warn('[languageService] GET /languages failed, using fallback:', e);
    }
    return FALLBACK_LANGS;
}

export async function fetchEnglishLanguage(): Promise<Language> {
    const list = await fetchLanguages();
    return list.find(l => l.code === 'en-US' || l.code === 'en') ?? FALLBACK_LANGS[0];
}
