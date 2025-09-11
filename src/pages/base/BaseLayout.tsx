import Header from "../../components/layouts/base/Header";
import Sidebar from "../../components/layouts/base/Sidebar";
import { Outlet } from "react-router-dom";
import React from "react";

type Props = { children?: React.ReactNode };

export default function BaseLayout({ children }: Props) {
    const content = children ?? <Outlet />; // 👈 quan trọng
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex h-[88vh]">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-8">{content}</main>
            </div>
        </div>
    );
}
