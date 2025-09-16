// @ts-nocheck
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
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
import {
    register as registerApi,
    checkEmailExists,
    checkUsernameExists,
} from "@/api/authService";
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

    // Ẩn/hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: { email: "", username: "", password: "" },
    });

    // Debounce nhỏ gọn
    const useDebounce = (value, delay = 500) => {
        const [debounced, setDebounced] = useState(value);
        useEffect(() => {
            const t = setTimeout(() => setDebounced(value), delay);
            return () => clearTimeout(t);
        }, [value, delay]);
        return debounced;
    };

    const email = form.watch("email");
    const username = form.watch("username");
    const passwordValue = form.watch("password") || "";
    const debouncedEmail = useDebounce(email, 500);
    const debouncedUsername = useDebounce(username, 500);

    // Check email tồn tại
    useEffect(() => {
        const run = async () => {
            if (!debouncedEmail || !z.string().email().safeParse(debouncedEmail).success) {
                setEmailStatus("idle");
                return;
            }
            setEmailChecking(true);
            setEmailStatus("checking");
            try {
                const result = await checkEmailExists(debouncedEmail); // { exists: boolean }
                setEmailStatus(result?.exists ? "taken" : "available");
            } catch (e) {
                console.error("Check email error:", e);
                setEmailStatus("idle");
            } finally {
                setEmailChecking(false);
            }
        };
        run();
    }, [debouncedEmail]);

    // Check username tồn tại
    useEffect(() => {
        const run = async () => {
            if (!debouncedUsername || debouncedUsername.length < 3) {
                setUsernameStatus("idle");
                return;
            }
            setUsernameChecking(true);
            setUsernameStatus("checking");
            try {
                const result = await checkUsernameExists(debouncedUsername); // { exists: boolean }
                setUsernameStatus(result?.exists ? "taken" : "available");
            } catch (e) {
                console.error("Check username error:", e);
                setUsernameStatus("idle");
            } finally {
                setUsernameChecking(false);
            }
        };
        run();
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
            if (res?.status >= 200 && res?.status < 300) {
                toast.success("Tạo tài khoản thành công! Vui lòng kiểm tra email để xác nhận.");
                // điều hướng đến trang hướng dẫn kiểm tra email
                navigate("/verify-confirmation");
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
        if (checking) return <span className="text-blue-500 text-sm">Đang kiểm tra...</span>;
        if (status === "taken") return <span className="text-red-500 text-sm">Đã được sử dụng</span>;
        return null; // available | idle -> không hiển thị
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
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input
                                        aria-invalid={!!fieldState.error}
                                        className={`py-[10px] px-[14px] rounded-2xl h-[50px] border-2 bg-background placeholder:text-slate-300
                      focus-visible:outline-none focus-visible:ring-2
                      ${fieldState.error ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-primary/40"}`}
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
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                    <Input
                                        aria-invalid={!!fieldState.error}
                                        className={`py-[10px] px-[14px] rounded-2xl h-[50px] border-2 bg-background placeholder:text-slate-300
                      focus-visible:outline-none focus-visible:ring-2
                      ${fieldState.error ? "border-red-500 focus-visible:ring-red-500" : "border-slate-300 focus-visible:ring-primary/40"}`}
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

                    {/* Mật khẩu + icon mắt */}
                    <FormField
                        control={form.control}
                        name="password"
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
                                            placeholder="Mật khẩu"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            {...field}
                                        />
                                        {passwordValue.length > 0 ? (
                                            <button
                                                type="button"
                                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                                onClick={() => setShowPassword((v) => !v)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/40"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        ) : null}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="primary"
                        className="min-w-full mt-6 mb-4"
                        disabled={form.formState.isSubmitting}
                        onClick={form.handleSubmit(onSubmit)}
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
