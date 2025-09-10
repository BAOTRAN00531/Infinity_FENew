import React from "react";
import Logo from "../../layouts/Logo";
import Button from "../../reuseables/Button";
import { useNavigate } from "react-router-dom";

const HeaderAuthComponent = (props: { action?: string }) => {
    const navigate = useNavigate();

    return (
        <header className="mt-3 flex items-center justify-between px-5">
            <Logo />
            <Button
                onclick={() => {
                    props.action === "login"
                        ? navigate("/auth/register")
                        : navigate("/auth/login");
                }}
                type="cta"
            >
                {props.action === "login"
                    ? "Tạo Tài Khoản"
                    : props.action === "register"
                        ? "Đăng nhập"
                        : "Đăng nhập"}
            </Button>
        </header>
    );
};

export default HeaderAuthComponent;
