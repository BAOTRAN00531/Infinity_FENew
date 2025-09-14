// @ts-nocheck
import { PencilIcon } from "lucide-react";
import TrialBox from "../../components/page-component/base/TrialBox";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../../components/reuseables/Input";
import Button from "../../components/reuseables/Button";
import { toast } from "sonner";
import { clearAuthData } from "@/utils/authUtils";
import { logout } from "@/api/authService";
import { useState } from "react";

function Profile() {
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);

    const handleLogout = async () => {
        if (loggingOut) return;
        setLoggingOut(true);
        try {
            await logout();
        } finally {
            clearAuthData();
            toast.success("Đã đăng xuất thành công");
            // Dùng replace để không back lại trang bảo vệ
            navigate("/auth/login", { replace: true });
            // Hoặc: window.location.replace("/auth/login");
            setLoggingOut(false);
        }
    };

    return (
        <div className="flex be-vietnam-pro-regular gap-8">
            <div className="grow flex justify-center">
                <div className="max-w-[800px] w-full">
                    <div className="w-full bg-primary rounded-2xl flex flex-col justify-between p-5">
                        <div className="flex justify-end">
                            <NavLink>
                                <PencilIcon className="w-6 h-6 text-white" strokeWidth={3} />
                            </NavLink>
                        </div>
                        <div role="profile" className="flex translate-y-[50%] gap-3 w-full">
                            <div
                                role="avatar"
                                className="w-24 h-24 rounded-full shrink-0 overflow-hidden bg-white border-2 border-primary"
                            >
                                <img
                                    src="/images/avatars/profile-avt.png"
                                    alt="sample avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-3 text-white w-full">
                                <h1 className="uppercase font-black">Oca English</h1>
                                <div className="w-full flex items-center justify-between">
                                    <p>_oca</p>
                                    <p>Tham gia từ tháng 8/2023</p>
                                </div>
                            </div>
                        </div>
                        {/* General Form */}
                    </div>

                    <form action="" className="mt-20 flex flex-col gap-5">
                        <div role="form-title" className="uppercase font-black flex items-center gap-2">
                            <div className="w-1 h-4 bg-primary rounded-full"></div>
                            <h2 className="text-slate-600">Thông tin chung</h2>
                        </div>
                        <Input label="Tên hiển thị" />
                        <Input label="ID" />
                        <Input label="Email" />
                        <Input label="Số điện thoại" />
                        <Input label="Mật khẩu hiện tại" />
                        <Input label="Mật khẩu mới" />
                        <div className="flex items-center justify-end gap-4">
                            <Button className="capitalize font-bold" type="secondary">
                                Quên mật khẩu
                            </Button>
                            <Button className="capitalize font-bold" type="secondary">
                                Cập nhật
                            </Button>
                        </div>
                    </form>

                    <div className="mt-8 flex flex-col gap-8">
                        <div role="title" className="uppercase font-black flex items-center gap-2">
                            <div className="w-1 h-4 bg-accent rounded-full"></div>
                            <h2 className="text-slate-600">Bảo mật</h2>
                        </div>
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col gap-3 text-slate-600 max-w-sm">
                                <h6 className="font-bold">Xác thực hai lớp</h6>
                                <p>
                                    Bật xác thực hai lớp để giữ cho tài khoản của bạn an toàn nhất có thể
                                </p>
                            </div>
                            <Button className="capitalize font-bold h-fit">Bật ngay</Button>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-8">
                        <div role="title" className="uppercase font-black flex items-center gap-2">
                            <div className="w-1 h-4 bg-red-400 rounded-full"></div>
                            <h2 className="text-slate-600">Cẩn trọng</h2>
                        </div>
                        <div className="flex justify-end items-center w-full gap-3">
                            <Button className="capitalize font-bold h-fit" type="danger">
                                Reset lịch sử học
                            </Button>

                            {/* 👇 Quan trọng: dùng đúng prop 'onclick' của Button tùy biến */}
                            <Button
                                className="capitalize font-bold h-fit"
                                type="danger"
                                disabled={loggingOut}
                                onclick={handleLogout}
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
