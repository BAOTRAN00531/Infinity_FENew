import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserProfile } from '@/api/user';
import { getStoredToken } from "@/utils/authUtils";
import { fetchUserProfile } from "@/api/userService";

interface UserContextType {
    userProfile: UserProfile | null;
    loading: boolean;
    error: Error | null;
    refetchProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [token, setToken] = useState(getStoredToken()); // THAY ĐỔI: Theo dõi token

    const loadProfile = async () => {
        const currentToken = getStoredToken();
        if (!currentToken) {
            setUserProfile(null);
            setLoading(false);
            setToken(null);
            return;
        }

        setLoading(true);
        try {
            const data = await fetchUserProfile();
            setUserProfile(data);
            setError(null);
            setToken(currentToken);
        } catch (err) {
            console.error("Lỗi khi tải thông tin người dùng:", err);
            setError(err as Error);
            setUserProfile(null);
            setToken(null);
        } finally {
            setLoading(false);
        }
    };

    // THAY ĐỔI: Theo dõi thay đổi token
    useEffect(() => {
        loadProfile();
        // Lắng nghe sự kiện storage để phát hiện thay đổi token
        const handleStorageChange = () => {
            const newToken = getStoredToken();
            if (newToken !== token) {
                loadProfile();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const refetchProfile = () => {
        setUserProfile(null);
        loadProfile();
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