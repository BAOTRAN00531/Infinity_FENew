// @ts-nocheck
import { toast } from "sonner";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Button from "../../reuseables/Button";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // đồng bộ import
import FooterForm from "../../auth-component/FormAuthComponent/FooterForm";
import { login } from "@/api/authService";
import { UserLogin, ResLoginDTO } from "@/api/types";
import { getRedirectPathByRole, clearAuthData } from "@/utils/authUtils";

const formSchema = z.object({
    name_7276315374: z.string().min(1, "Vui lòng nhập email hoặc số điện thoại"),
    name_4761952747: z.string().min(1, "Vui lòng nhập mật khẩu"),
});

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: { name_7276315374: "", name_4761952747: "" },
    });

    // show/hide password + theo dõi giá trị ô mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    const pwValue = form.watch("name_4761952747") || "";

    // Lấy trang đích từ state hoặc từ query params
    const from = location.state?.from?.pathname || new URLSearchParams(location.search).get('redirect') || null;

    const onSubmit = async (values) => {
        try {
            const credentials = {
                username: values.name_7276315374,
                password: values.name_4761952747,
            };
            
            const res: ResLoginDTO = await login(credentials);
            
            // Decode token để lấy role
            const decodedToken: any = jwtDecode(res.access_token);
            const role: string = decodedToken.role;

            // Tạo user object với role
            const userWithRole: UserLogin = {
                ...res.userp,
                role,
            };

            // Lưu token và user data vào sessionStorage
            sessionStorage.setItem("access_token", res.access_token);
            sessionStorage.setItem("user", JSON.stringify(userWithRole));

            console.log("Login successful:", { role, user: userWithRole });

            // Xác định trang đích dựa trên role
            let redirectPath = from || getRedirectPathByRole(role);

            // Đảm bảo admin không bị redirect đến trang student và ngược lại
            if (role === 'ROLE_ADMIN' && !redirectPath.startsWith('/admin')) {
                redirectPath = '/admin/dashboard';
            } else if ((role === 'ROLE_STUDENT' || role === 'ROLE_USER') && redirectPath.startsWith('/admin')) {
                redirectPath = '/hoc';
            }

            // Chuyển hướng
            navigate(redirectPath, { replace: true });
            
        } catch (error) {
            console.error("Login error", error);
            const message = error?.response?.data?.message || "Tên đăng nhập hoặc mật khẩu sai. Vui lòng thử lại.";
            toast.error(message);
            
            // Xóa dữ liệu auth cũ nếu có lỗi
            clearAuthData();
        }
    };

    return (
        <div className="flex flex-col gap-11">
            <h1 className="text-2xl font-extrabold text-center text-primary">Đăng Nhập</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-2 flex flex-col">
                    {/* Email / Số điện thoại */}
                    <FormField
                        control={form.control}
                        name="name_7276315374"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input
                                        aria-invalid={!!fieldState.error}
                                        className={`py-[10px] px-[14px] rounded-2xl h-[50px] border-2 bg-background placeholder:text-slate-300
                      focus-visible:outline-none focus-visible:ring-2
                      ${fieldState.error ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-primary/40"}`}
                                        placeholder="Email hoặc số điện thoại"
                                        type="text"
                                        autoComplete="username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Mật khẩu */}
                    <FormField
                        control={form.control}
                        name="name_4761952747"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            aria-invalid={!!fieldState.error}
                                            className={`py-[10px] px-[14px] rounded-2xl h-[50px] border-2 bg-background placeholder:text-slate-300 pr-16
                        focus-visible:outline-none focus-visible:ring-2
                        ${fieldState.error ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-primary/40"}`}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Mật khẩu"
                                            autoComplete="current-password"
                                            {...field}
                                        />

                                        {pwValue.length === 0 ? (
                                            <Link
                                                to="/auth/forgot-password"
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-primary"
                                            >
                                                QUÊN?
                                            </Link>
                                        ) : (
                                            <button
                                                type="button"
                                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="primary"
                        className="min-w-full mt-4 mb-3"
                        disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
                    >
                        {form.formState.isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>

                    <FooterForm />
                </form>
            </Form>
        </div>
    );
}
