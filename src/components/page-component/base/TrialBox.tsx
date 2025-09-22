// src/components/page-component/base/TrialBox.tsx - Tối ưu TrialBox
import { NavLink } from "react-router-dom";
import Button from "../../reuseables/Button";
import { useUser } from "@/api/UserContext";
import { memo } from 'react';

const TrialBox = memo(() => {
    const { userProfile, loading } = useUser();

    // Không hiển thị khi đang tải hoặc user đã VIP
    if (loading || userProfile?.isVip) {
        return null;
    }

    // Nếu chưa đăng nhập, hiển thị call-to-action đăng ký
    if (!userProfile) {
        return (
            <div className="flex flex-col p-5 rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-blue-50 to-purple-50 gap-5 shadow-sm">
                <h2 className="uppercase text-slate-600 be-vietnam-pro-black">
                    Bắt đầu học <span className="text-primary">miễn phí</span>
                </h2>
                <p className="text-[14px] text-slate-600 be-vietnam-pro-regular">
                    Đăng ký tài khoản để trải nghiệm học tập hiệu quả!
                </p>
                <NavLink to={"/auth/register"} className={"w-full"}>
                    <Button className="max-w-full w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                        Đăng ký ngay
                    </Button>
                </NavLink>
            </div>
        );
    }

    // User đã đăng nhập nhưng chưa VIP
    return (
        <div className="flex flex-col p-5 rounded-2xl border-2 border-slate-300 bg-gradient-to-br from-yellow-50 to-orange-50 gap-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                <h2 className="uppercase text-slate-600 be-vietnam-pro-black">
                    trải nghiệm <span className="text-premium-gradient">infinity pro</span>
                </h2>
            </div>

            <div className="bg-white/50 rounded-lg p-3 border border-orange-200">
                <p className="text-[14px] text-slate-600 be-vietnam-pro-regular mb-2">
                    Dùng thử{" "}
                    <span className="text-premium-gradient font-semibold">
                        Infinity Pro
                    </span>{" "}
                    trong vòng 14 ngày hoàn toàn miễn phí!
                </p>
                <ul className="text-xs text-slate-500 space-y-1">
                    <li>✅ Không giới hạn bài học</li>
                    <li>✅ Không quảng cáo</li>
                    <li>✅ Tính năng nâng cao</li>
                    <li>✅ Hỗ trợ ưu tiên</li>
                </ul>
            </div>

            <NavLink to={"/trial"} className={"w-full"}>
                <Button className="max-w-full w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all">
                    🎉 Dùng thử ngay - MIỄN PHÍ
                </Button>
            </NavLink>
        </div>
    );
});

TrialBox.displayName = 'TrialBox';
export default TrialBox;