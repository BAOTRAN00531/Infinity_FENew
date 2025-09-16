// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import { PencilIcon } from "lucide-react";
import TrialBox from "../../components/page-component/base/TrialBox";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/reuseables/Input";
import Button from "../../components/reuseables/Button";
import { toast } from "sonner";
import { clearAuthData } from "@/utils/authUtils";
import { logout } from "@/api/authService";
import OrderHistoryButton from "@components/reuseables/Management/history/OrderHistoryButton";
import { fetchUserProfile, updateUserProfile, updatePassword } from "@/api/userService"; // ✅ Sửa đường dẫn nếu cần

import type { UserProfile, UserProfileUpdate, PasswordUpdate } from "@/api/user";

import UserAvatar from "@components/ui/UserAvatar";

function Profile() {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // ✅ State cho form thông tin cá nhân
    const [formState, setFormState] = useState({
        fullName: '',
        email: '',
    });

    // ✅ State cho form đổi mật khẩu
    const [passwordState, setPasswordState] = useState({
        currentPassword: '',
        newPassword: '',
    });

    // ✅ Fetch dữ liệu khi component mount
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

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateUserProfile(formState);
            toast.success("Cập nhật thông tin thành công.");
            // Cập nhật lại state userProfile sau khi thành công
            setUserProfile(prev => prev ? { ...prev, ...formState } : null);
        } catch (error) {
            toast.error("Không thể cập nhật thông tin.");
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
            // Reset form mật khẩu
            setPasswordState({ currentPassword: '', newPassword: '' });
        } catch (error) {
            toast.error("Mật khẩu hiện tại không khớp. Vui lòng nhập lại.");
        }
    };

    if (loading) {
        return <div className="text-center p-10">Đang tải thông tin hồ sơ...</div>;
    }

    if (!userProfile) {
        return <div className="text-center p-10 text-red-500">Không thể tải thông tin. Vui lòng thử lại.</div>;
    }

    // ✅ Lớp CSS có điều kiện cho bảng hồ sơ
    const profileBgClass = userProfile.isVip ? 'bg-yellow-500' : 'bg-primary';

    return (
        <div className="flex be-vietnam-pro-regular gap-8">
            <div className="grow flex justify-center">
                <div className="max-w-[800px] w-full">
                    <div className={`w-full ${profileBgClass} rounded-2xl flex flex-col justify-between p-5`}>
                        <div className="flex justify-end gap-3">
                            <NavLink>
                                <PencilIcon className="w-6 h-6 text-white" strokeWidth={3} />
                            </NavLink>
                            <OrderHistoryButton />
                        </div>
                        <div role="profile" className="flex translate-y-[50%] gap-3 w-full">
                            <UserAvatar
                                avatarUrl={userProfile.avatar}
                                isVip={userProfile.isVip}
                                alt={userProfile.username}
                                size="lg"
                            />
                            <div className="flex flex-col gap-3 text-white w-full">
                                <h1 className="uppercase font-black">{userProfile.fullName || userProfile.username}</h1>
                                <div className="w-full flex items-center justify-between">
                                    <p>{userProfile.username}</p>
                                    <p>
                                        Tham gia từ tháng 8/2023
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleProfileUpdate} className="mt-20 flex flex-col gap-5">
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
                                htmlType="submit" // ✅ Đặt thuộc tính này để nút gửi form
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
                                htmlType="submit" // ✅ Đặt thuộc tính này để nút gửi form
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
                                onClick={() => console.log("Reset lịch sử học")} // ✅ Thêm hàm xử lý sự kiện onClick
                            >
                                Reset lịch sử học
                            </Button>

                            <Button
                                className="capitalize font-bold h-fit"
                                type="danger"
                                disabled={loggingOut}
                                onClick={handleLogout} // ✅ Sửa từ onclick thành onClick
                            >
                                {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <aside className="max-w-[360px] h-full flex flex-col gap-8">
                <TrialBox />
            </aside>
        </div>
    );
}

export default Profile;