// src/api/UserContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserProfile } from '@/api/user';
import { getStoredToken } from "@/utils/authUtils";
import { fetchUserProfile } from "@/api/userService";

interface UserContextType {
    userProfile: UserProfile | null;
    loading: boolean;
    error: Error | null;
    refetchProfile: () => Promise<void>; // Thêm Promise để có thể await
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadProfile = async () => {
        const currentToken = getStoredToken();
        if (!currentToken) {
            setUserProfile(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const data = await fetchUserProfile();
            setUserProfile(data);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi tải thông tin người dùng:", err);
            setError(err as Error);
            setUserProfile(null);
        } finally {
            setLoading(false);
        }
    };

    // Theo dõi thay đổi token
    useEffect(() => {
        loadProfile();

        // Lắng nghe sự kiện storage để phát hiện thay đổi token
        const handleStorageChange = () => {
            loadProfile();
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Cập nhật refetchProfile để trả về Promise
    const refetchProfile = async () => {
        try {
            await loadProfile();
        } catch (err) {
            console.error("Lỗi khi tải lại thông tin người dùng:", err);
        }
    };

    const value = { userProfile, loading, error, refetchProfile };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};