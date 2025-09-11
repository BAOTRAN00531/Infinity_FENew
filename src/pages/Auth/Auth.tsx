// @ts-nocheck
import { Outlet } from "react-router-dom";
import Header from "../../components/layouts/Header";

export default function Auth() {
    return (
        <div className="min-h-screen">
            <Header />
            {/* dùng cùng container/spacing như Layout để không “nhảy” */}
            <div className="max-w-7xl mx-auto px-5 mt-6 mb-8">
                <div className="w-full flex justify-center">
                    <div className="max-w-[340px] w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
