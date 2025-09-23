import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { lexiconApi } from '@/api/Management/lexiconApi';
import type { Language } from '@/api/Management/adminQuestionApi';

type LanguageContextValue = {
    languages: Language[];
    currentLanguage: Language | null;
    setCurrentLanguage: (lang: Language | null) => void;
    loading: boolean;
    error: string | null;
    reload: () => Promise<void>;
};

const LanguageContext = createContext<LanguageContextValue>({
    languages: [],
    currentLanguage: null,
    setCurrentLanguage: () => {},
    loading: false,
    error: null,
    reload: async () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = async () => {
        setLoading(true);
        setError(null);
        try {
            // Ưu tiên gọi API thật từ lexiconApi
            const resp = await lexiconApi.languages.getAll(); // <- trả array trực tiếp
            const langs: Language[] = Array.isArray(resp)
                ? resp
                // nếu lỡ backend nào đó bọc {result: []} thì vẫn support được:
                : (Array.isArray((resp as any)?.result) ? (resp as any).result : []);

            if (!Array.isArray(langs)) {
                throw new Error('Invalid languages payload');
            }

            setLanguages(langs as Language[]); // ép kiểu để TS đừng “khó”
            const english =
                (langs as Language[]).find(l => (l.code || '').toLowerCase().startsWith('en')) ||
                (langs as Language[])[0] ||
                ({ code: 'en-US', name: 'English (United States)' } as Language);

            setCurrentLanguage(english as Language);
        } catch (err) {
            console.error('Languages API failed → using mock data', err);
            const mock: Language[] = [
                { id: 1 as any, code: 'en-US', name: 'English (United States)' } as any,
            ];
            setLanguages(mock);
            setCurrentLanguage(mock[0]);
            setError('Languages API error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const value = useMemo<LanguageContextValue>(
        () => ({
            languages,
            currentLanguage,
            setCurrentLanguage,
            loading,
            error,
            reload: fetchAll,
        }),
        [languages, currentLanguage, loading, error]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
