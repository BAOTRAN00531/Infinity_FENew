import React from "react";
import { Link, Outlet } from "react-router-dom";

type Props = { children?: React.ReactNode };

const TrialComponent = ({ children }: Props) => {
    const content = children ?? <Outlet />; // 👈 quan trọng
    return (
        <div className="w-full h-screen py-[250px] px-[150px] flex justify-center items-center relative overflow-x-hidden">
            <div className="absolute top-[110px] left-[170px] cursor-pointer">
                <Link to="/hoc">{/* kiểm tra route này có tồn tại không */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path
                            d="M27 9L9 27M9 9L27 27"
                            stroke="#CBD5E1"
                            strokeWidth="3"         /* 👈 dùng camelCase trong React */
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </div>
            {content}
        </div>
    );
};

export default TrialComponent;
