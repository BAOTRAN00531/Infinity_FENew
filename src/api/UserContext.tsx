// src/contexts/UserContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserProfile } from '@/api/user';
import { getStoredToken } from "@/utils/authUtils";
import {fetchUserProfile} from "@/api/userService";

interface UserContextType {
    userProfile: UserProfile | null;
    loading: boolean;
    error: Error | null;
    refetchProfile: () => void; // Thêm chức năng tải lại
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadProfile = async () => {
        const token = getStoredToken();
        if (!token) {
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

    useEffect(() => {
        loadProfile();
    }, []);

    const value = { userProfile, loading, error, refetchProfile: loadProfile };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};