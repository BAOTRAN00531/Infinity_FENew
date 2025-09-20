// src/pages/Profile.tsx

import React, { useEffect, useState, useRef } from 'react';
import { PencilIcon, CrownIcon } from "lucide-react";
import TrialBox from "../../components/page-component/base/TrialBox";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/reuseables/Input";
import Button from "../../components/reuseables/Button";
import { toast } from "sonner";
import { clearAuthData } from "@/utils/authUtils";
import { logout } from "@/api/authService";
import OrderHistoryButton from "@components/reuseables/Management/history/OrderHistoryButton";

// ✅ Import các hàm API cần thiết

import type { UserProfile, UserProfileUpdate, PasswordUpdate } from "@/api/user";

import UserAvatar from "@components/ui/UserAvatar";
import {fetchUserProfile, updatePassword, updateUserProfile, uploadAvatar} from "@/api/userService";

function Profile() {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const [formState, setFormState] = useState<UserProfileUpdate>({
        fullName: '',
        email: '',
    });

    const [passwordState, setPasswordState] = useState<PasswordUpdate>({
        currentPassword: '',
        newPassword: '',
    });

    const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const data = await fetchUserProfile();
                setUserProfile(data);
                setFormState({
                    fullName: data.fullName || '',
                    email: data.email,
                });
            } catch (error) {
                toast.error("Không thể tải thông tin hồ sơ.");
            } finally {
                setLoading(false);
            }
        };
        loadUserProfile();
    }, []);

    const handleLogout = async () => {
        if (loggingOut) return;
        setLoggingOut(true);
        try {
            await logout();
        } finally {
            clearAuthData();
            toast.success("Đã đăng xuất thành công");
            navigate("/auth/login", { replace: true });
            setLoggingOut(false);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedAvatar(e.target.files[0]);
            toast.info("Avatar đã được chọn. Nhấn 'Cập nhật' để lưu.");
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let newAvatarUrl = userProfile?.avatar;

            // ✅ Bước 1: Tải file avatar lên server nếu có
            if (selectedAvatar) {
                const uploadResponse = await uploadAvatar(selectedAvatar);
                newAvatarUrl = uploadResponse.url;
            }

            // ✅ Bước 2: Cập nhật thông tin profile bao gồm URL avatar mới
            const profileDataToUpdate: UserProfileUpdate = {
                ...formState,
                avatar: newAvatarUrl,
            };

            await updateUserProfile(profileDataToUpdate);

            toast.success("Cập nhật thông tin thành công.");

            // Cập nhật state sau khi thành công để UI hiển thị ngay
            setUserProfile(prev => prev ? { ...prev, ...profileDataToUpdate } : null);
            setSelectedAvatar(null);

        } catch (error) {
            toast.error(error.message);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordState.newPassword.length < 6) {
            toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
            return;
        }
        try {
            await updatePassword(passwordState);
            toast.success("Đổi mật khẩu thành công.");
            setPasswordState({ currentPassword: '', newPassword: '' });
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return <div className="text-center p-10">Đang tải thông tin hồ sơ...</div>;
    }

    if (!userProfile) {
        return <div className="text-center p-10 text-red-500">Không thể tải thông tin. Vui lòng thử lại.</div>;
    }

    const profileBgClass = userProfile.isVip ? 'bg-yellow-500' : 'bg-primary';

    return (
        <div className="flex flex-col md:flex-row be-vietnam-pro-regular gap-8">
            <div className="grow flex justify-center order-2 md:order-1">
                <div className="max-w-[800px] md:max-w-full w-full">
                    <div className={`w-full ${profileBgClass} rounded-2xl flex flex-col justify-between p-5`}>
                        <div className="flex justify-end gap-3">
                            <NavLink to="#">
                                <PencilIcon className="w-6 h-6 text-white" strokeWidth={3} />
                            </NavLink>
                            <OrderHistoryButton />
                        </div>
                        <div role="profile" className="flex translate-y-[50%] gap-3 w-full flex-col md:flex-row items-center md:items-start">
                            <div className="relative cursor-pointer" onClick={handleAvatarClick}>
                                <UserAvatar
                                    avatarUrl={selectedAvatar ? URL.createObjectURL(selectedAvatar) : userProfile.avatar}
                                    isVip={userProfile.isVip}
                                    alt={userProfile.username}
                                    size="lg"
                                />
                                {userProfile.isVip && (
                                    <CrownIcon
                                        className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 text-yellow-400 w-8 h-8 md:w-10 md:h-10"
                                        fill="currentColor"
                                    />
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-white w-full items-center md:items-start">
                                <h1 className="uppercase font-black text-center md:text-left">{userProfile.fullName || userProfile.username}</h1>
                                <div className="w-full flex flex-col items-center md:items-start md:flex-row md:justify-between">
                                    <p>{userProfile.username}</p>
                                    <p>
                                        Tham gia từ tháng 8/2023
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="mt-20 md:mt-10 flex flex-col gap-5">
                        <div role="form-title" className="uppercase font-black flex items-center gap-2">
                            <div className="w-1 h-4 bg-primary rounded-full"></div>
                            <h2 className="text-slate-600">Thông tin chung</h2>
                        </div>
                        <Input
                            label="Tên hiển thị"
                            value={formState.fullName}
                            onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                        />
                        <Input
                            label="Email"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        />
                        <div className="flex items-center justify-end gap-4">
                            <Button
                                className="capitalize font-bold"
                                type="secondary"
                                htmlType="submit"
                            >
                                Cập nhật
                            </Button>
                        </div>
                    </form>

                    <form onSubmit={handlePasswordUpdate} className="mt-8 flex flex-col gap-5">
                        <div role="form-title" className="uppercase font-black flex items-center gap-2">
                            <div className="w-1 h-4 bg-accent rounded-full"></div>
                            <h2 className="text-slate-600">Bảo mật</h2>
                        </div>
                        <Input
                            label="Mật khẩu hiện tại"
                            type="password"
                            value={passwordState.currentPassword}
                            onChange={(e) => setPasswordState({ ...passwordState, currentPassword: e.target.value })}
                        />
                        <Input
                            label="Mật khẩu mới"
                            type="password"
                            value={passwordState.newPassword}
                            onChange={(e) => setPasswordState({ ...passwordState, newPassword: e.target.value })}
                        />
                        <div className="flex items-center justify-end">
                            <Button
                                className="capitalize font-bold h-fit"
                                type="secondary"
                                htmlType="submit"
                            >
                                Đổi mật khẩu
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 flex flex-col gap-8">
                        <div role="title" className="uppercase font-black flex items-center gap-2">
                            <div className="w-1 h-4 bg-red-400 rounded-full"></div>
                            <h2 className="text-slate-600">Cẩn trọng</h2>
                        </div>
                        <div className="flex justify-end items-center w-full gap-3">
                            <Button
                                className="capitalize font-bold h-fit"
                                type="danger"
                                onClick={() => console.log("Reset lịch sử học")}
                            >
                                Reset lịch sử học
                            </Button>
                            <Button
                                className="capitalize font-bold h-fit"
                                type="danger"
                                disabled={loggingOut}
                                onClick={handleLogout}
                            >
                                {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <aside className="max-w-[360px] md:max-w-full h-full flex flex-col gap-8 order-1 md:order-2 md:mt-20">
                <TrialBox />
            </aside>
        </div>
    );
}

export default Profile;