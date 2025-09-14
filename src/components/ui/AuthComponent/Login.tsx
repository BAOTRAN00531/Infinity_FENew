// @ts-nocheck
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../reuseables/Button";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "../input";
import FooterForm from "../../auth-component/FormAuthComponent/FooterForm";
import { login, checkEmailExists } from "@/api/authService";
import { emailOrPhoneValidation } from "@/utils/validation";

const formSchema = z.object({
    name_7276315374: z
        .string()
        .min(1, "Vui lòng nhập email hoặc số điện thoại")
        .regex(emailOrPhoneValidation.pattern.value, emailOrPhoneValidation.pattern.message)
        .refine((value) => {
            // Kiểm tra nếu là email thì phải có ít nhất 5 ký tự
            if (value.includes('@')) {
                return value.length >= 5;
            }
            // Kiểm tra nếu là số điện thoại thì phải có đúng định dạng
            return /^(0|\+84)[1-9][0-9]{8,9}$/.test(value);
        }, "Định dạng không hợp lệ"),
    name_4761952747: z
        .string()
        .min(1, "Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .max(50, "Mật khẩu không được quá 50 ký tự")
        .refine((value) => {
            return value.trim().length > 0;
        }, "Mật khẩu không được chỉ chứa khoảng trắng")
        .refine((value) => {
            return /\S/.test(value);
        }, "Mật khẩu phải chứa ít nhất một ký tự hợp lệ")
        .refine((value) => {
            return !/^\s|\s$/.test(value);
        }, "Mật khẩu không được bắt đầu hoặc kết thúc bằng khoảng trắng")
        .refine((value) => {
            const commonPasswords = ['123456', 'password', '123456789', '12345678', '12345', '1234567', 'qwerty', 'abc123', 'password123', 'admin'];
            return !commonPasswords.includes(value.toLowerCase());
        }, "Mật khẩu quá đơn giản, vui lòng chọn mật khẩu khác"),
});

export default function Login() {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: { name_7276315374: "", name_4761952747: "" },
    });

    // show/hide password + theo dõi giá trị ô mật khẩu
    const [showPassword, setShowPassword] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);
    const [emailExists, setEmailExists] = useState(null);
    const pwValue = form.watch("name_4761952747") || "";
    const emailValue = form.watch("name_7276315374") || "";

    // Kiểm tra email có tồn tại hay không
    React.useEffect(() => {
        const checkEmail = async () => {
            // Chỉ kiểm tra nếu là email hợp lệ và không phải số điện thoại
            const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue);
            
            if (!emailValue || !isEmail) {
                setEmailExists(null);
                return;
            }

            setCheckingEmail(true);

            try {
                const result = await checkEmailExists(emailValue);
                setEmailExists(result.exists);
            } catch (error) {
                console.error('Check email error:', error);
                setEmailExists(null);
            } finally {
                setCheckingEmail(false);
            }
        };

        // Debounce để tránh gọi API quá nhiều
        const timeoutId = setTimeout(checkEmail, 500);
        return () => clearTimeout(timeoutId);
    }, [emailValue]);

    const onSubmit = async (values) => {
        try {
            const credentials = {
                username: values.name_7276315374,
                password: values.name_4761952747,
            };
            const res = await login(credentials);

            if (res?.access_token) localStorage.setItem("access_token", res.access_token);
            if (res?.userp) localStorage.setItem("user", JSON.stringify(res.userp));

            toast.success("Đăng nhập thành công!");
            navigate("/");
        } catch (error) {
            console.error("Login error", error);
            let message = "Đăng nhập thất bại. Vui lòng thử lại.";

            if (error?.response?.data?.message) {
                message = error.response.data.message;
            } else if (error?.response?.status === 401) {
                message = "Email/số điện thoại hoặc mật khẩu không đúng";
            } else if (error?.response?.status === 404) {
                message = "Tài khoản không tồn tại trong hệ thống";
            } else if (error?.response?.status === 429) {
                message = "Quá nhiều lần thử. Vui lòng đợi và thử lại sau";
            } else if (error?.code === 'NETWORK_ERROR') {
                message = "Lỗi kết nối mạng. Vui lòng kiểm tra internet";
            }
            toast.error(message);
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
                                    <div className="relative">
                                        <Input
                                            aria-invalid={!!fieldState.error}
                                            className={`py-[10px] px-[14px] rounded-2xl h-[50px] border-2 bg-background placeholder:text-slate-300
                              focus-visible:outline-none focus-visible:ring-2
                              ${fieldState.error
                                                ? "border-red-500 focus-visible:ring-red-500"
                                                : "border-slate-300 focus-visible:ring-primary/40"}`}
                                            placeholder="Email hoặc số điện thoại"
                                            type="text"
                                            autoComplete="username"
                                            {...field}
                                        />
                                        {/* Hiển thị trạng thái kiểm tra email */}
                                        {checkingEmail && (
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                            </div>
                                        )}
                                        {!checkingEmail && emailExists !== null && (
                                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                {emailExists ? (
                                                    <div className="text-green-500 text-sm">✓</div>
                                                ) : (
                                                    <div className="text-red-500 text-sm">✗</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                                {/* Hiển thị thông báo về trạng thái email */}
                                {!checkingEmail && emailExists === false && emailValue && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue) && (
                                    <p className="text-red-500 text-sm mt-1">Email này chưa được đăng ký trong hệ thống</p>
                                )}
                                {!checkingEmail && emailExists === true && emailValue && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue) && (
                                    <p className="text-green-500 text-sm mt-1">Email đã được đăng ký</p>
                                )}
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
                        ${fieldState.error
                                                ? "border-red-500 focus-visible:ring-red-500"
                                                : "border-slate-300 focus-visible:ring-primary/40"}`}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Mật khẩu"
                                            autoComplete="current-password"
                                            {...field}
                                        />

                                        {pwValue.length === 0 ? (
                                            <Link
                                                to="/auth/forgot-password"  // sửa theo route bạn đang dùng
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
                        onclick={form.handleSubmit(onSubmit)}
                    >
                        {form.formState.isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Button>

                    <FooterForm />
                </form>
            </Form>
        </div>
    );
}
