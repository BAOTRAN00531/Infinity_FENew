// @ts-nocheck
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";   // 👈 thêm icon
import Button from "../../reuseables/Button";
import "../AuthComponent/FormComponent.scss";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FooterForm from "../../auth-component/FormAuthComponent/FooterForm";
import { register as registerApi, checkEmailExists, checkUsernameExists } from "@/api/authService";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    username: z.string().min(3, "Tên đăng nhập tối thiểu 3 ký tự").max(30, "Tối đa 30 ký tự"),
    password: z.string().min(8, "Mật khẩu tối thiểu 8 ký tự").max(36, "Tối đa 36 ký tự"),
});

const Register = () => {
    const navigate = useNavigate();
    const [emailChecking, setEmailChecking] = useState(false);
    const [usernameChecking, setUsernameChecking] = useState(false);
    const [emailStatus, setEmailStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
    const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");

    // 👇 state để bật/tắt hiển thị mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: { email: "", username: "", password: "" },
    });

    // Debounce function
    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => {
                clearTimeout(handler);
            };
        }, [value, delay]);
        return debouncedValue;
    };

    const watchedEmail = form.watch("email");
    const watchedUsername = form.watch("username");
    const debouncedEmail = useDebounce(watchedEmail, 500);
    const debouncedUsername = useDebounce(watchedUsername, 500);

    // Check email availability
    useEffect(() => {
        const checkEmail = async () => {
            if (!debouncedEmail || !z.string().email().safeParse(debouncedEmail).success) {
                setEmailStatus("idle");
                return;
            }
            setEmailChecking(true);
            setEmailStatus("checking");
            try {
                const result = await checkEmailExists(debouncedEmail);
                setEmailStatus(result.exists ? "taken" : "available");
            } catch (error) {
                console.error("Check email error:", error);
                setEmailStatus("idle");
            } finally {
                setEmailChecking(false);
            }
        };
        checkEmail();
    }, [debouncedEmail]);

    // Check username availability
    useEffect(() => {
        const checkUsername = async () => {
            if (!debouncedUsername || debouncedUsername.length < 3) {
                setUsernameStatus("idle");
                return;
            }
            setUsernameChecking(true);
            setUsernameStatus("checking");
            try {
                const result = await checkUsernameExists(debouncedUsername);
                setUsernameStatus(result.exists ? "taken" : "available");
            } catch (error) {
                console.error("Check username error:", error);
                setUsernameStatus("idle");
            } finally {
                setUsernameChecking(false);
            }
        };
        checkUsername();
    }, [debouncedUsername]);

    const onSubmit = async (values) => {
        if (emailStatus === "taken") {
            toast.error("Email đã được sử dụng. Vui lòng chọn email khác.");
            return;
        }
        if (usernameStatus === "taken") {
            toast.error("Tên đăng nhập đã được sử dụng. Vui lòng chọn tên khác.");
            return;
        }
        if (emailStatus === "checking" || usernameStatus === "checking") {
            toast.error("Đang kiểm tra thông tin. Vui lòng đợi một chút.");
            return;
        }

        try {
            const payload = {
                email: values.email,
                username: values.username,
                password: values.password,
            };
            const res = await registerApi(payload);
            if (res.status >= 200 && res.status < 300) {
                toast.success("Tạo tài khoản thành công! Vui lòng đăng nhập.");
                navigate("/auth/login");
                return;
            }
            toast.error("Tạo tài khoản thất bại. Vui lòng thử lại.");
        } catch (error) {
            console.error("Register error", error);
            const message = error?.response?.data?.message || "Tạo tài khoản thất bại. Vui lòng thử lại.";
            toast.error(message);
        }
    };

    const renderStatusIndicator = (status, checking) => {
        if (checking) {
            return <span className="text-blue-500 text-sm">Đang kiểm tra...</span>;
        }
        switch (status) {
            case "available":
                return null;
            case "taken":
                return <span className="text-red-500 text-sm">Đã được sử dụng</span>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-11">
            <h1 className="text-2xl font-extrabold text-center text-primary">Tạo Tài Khoản</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-0 flex flex-col">
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-[10px] px-[14px] rounded-2xl h-[50px] border-2 border-slate-300 bg-background placeholder:text-slate-300"
                                        placeholder="Email"
                                        type="email"
                                        autoComplete="email"
                                        {...field}
                                    />
                                </FormControl>
                                <div className="flex justify-between items-center">
                                    <FormMessage />
                                    {renderStatusIndicator(emailStatus, emailChecking)}
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Username */}
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-[10px] px-[14px] rounded-2xl h-[50px] border-2 border-slate-300 bg-background placeholder:text-slate-300"
                                        placeholder="Tên đăng nhập"
                                        autoComplete="username"
                                        {...field}
                                    />
                                </FormControl>
                                <div className="flex justify-between items-center">
                                    <FormMessage />
                                    {renderStatusIndicator(usernameStatus, usernameChecking)}
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Mật khẩu (có icon con mắt) */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            className="py-[10px] px-[14px] pr-16 rounded-2xl h-[50px] border-2 border-slate-300 bg-background placeholder:text-slate-300"
                                            placeholder="Mật khẩu"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            {...field}
                                        />
                                        {field.value?.length > 0 && (
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
                        className="min-w-full mt-4 mb-4"
                        disabled={form.formState.isSubmitting}
                        onclick={form.handleSubmit(onSubmit)}
                    >
                        {form.formState.isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                    </Button>
                    <FooterForm />
                </form>
            </Form>
        </div>
    );
};

export default Register;
