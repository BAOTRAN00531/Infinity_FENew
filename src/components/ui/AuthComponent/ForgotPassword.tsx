// @ts-nocheck
import React, { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import Button from "../../reuseables/Button";
import {
  sendResetPasswordEmail,
  validateOtp,
  confirmOTP,
  resetPassword,
  checkEmailForReset,
} from "@/api/authService";
import { useNavigate } from "react-router-dom";

// Schemas
const emailSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "Mã OTP phải đủ 6 số"),
});

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Mật khẩu tối thiểu 8 ký tự")
      .max(36, "Tối đa 36 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const [otpValid, setOtpValid] = useState<boolean | null>(null);
  const [checkingOtp, setCheckingOtp] = useState(false);

  // forms
  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const resetForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  // debounce hook
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    React.useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };

  const watchedEmail = emailForm.watch("email");
  const debouncedEmail = useDebounce(watchedEmail, 500);

  const watchedOtp = otpForm.watch("otp");
  const debouncedOtp = useDebounce(watchedOtp, 500);

  // Check email existence
  React.useEffect(() => {
    const checkEmail = async () => {
      if (
        !debouncedEmail ||
        !z.string().email().safeParse(debouncedEmail).success
      ) {
        setEmailExists(null);
        return;
      }
      setCheckingEmail(true);
      try {
        const result = await checkEmailForReset(debouncedEmail);
        setEmailExists(result.exists === true);
      } catch (error) {
        console.error("Check email error:", error);
        setEmailExists(null);
      } finally {
        setCheckingEmail(false);
      }
    };
    checkEmail();
  }, [debouncedEmail]);

  // Debounce validate OTP (chỉ check, KHÔNG xác nhận)
  React.useEffect(() => {
    const checkOtp = async () => {
      if (!debouncedOtp || debouncedOtp.length !== 6 || !email) {
        setOtpValid(null);
        return;
      }
      setCheckingOtp(true);
      try {
        const res = await validateOtp(email, debouncedOtp);
        if (res.status >= 200 && res.status < 300) {
          setOtpValid(res.data?.valid === true);
        } else {
          setOtpValid(false);
        }
      } catch (error) {
        console.error("Validate OTP error:", error);
        setOtpValid(false);
      } finally {
        setCheckingOtp(false);
      }
    };
    checkOtp();
  }, [debouncedOtp, email]);

  // Actions
  const onSendEmail = async (values) => {
    if (emailExists === false) {
      toast.error("Email không tồn tại trong hệ thống. Vui lòng kiểm tra lại.");
      return;
    }
    if (emailExists === null || checkingEmail) {
      toast.error("Đang kiểm tra email. Vui lòng đợi một chút.");
      return;
    }

    try {
      const res = await sendResetPasswordEmail(values.email);
      if (res.status >= 200 && res.status < 300) {
        setEmail(values.email);
        setStep("otp");
        toast.success("Email đã được gửi! Vui lòng kiểm tra hộp thư.");
      } else {
        const message =
          res.data?.message || "Gửi email thất bại. Vui lòng thử lại.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Send email error", error);
      const message =
        error?.response?.data?.message ||
        "Gửi email thất bại. Vui lòng thử lại.";
      toast.error(message);
    }
  };

  const onVerifyOTP = async (values) => {
    // Chỉ cho phép xác nhận khi validateOtp đã báo hợp lệ
    if (otpValid === false) {
      toast.error("Mã OTP không hợp lệ. Vui lòng kiểm tra lại.");
      return;
    }
    if (otpValid === null || checkingOtp) {
      toast.error("Đang kiểm tra OTP. Vui lòng đợi một chút.");
      return;
    }

    try {
      const res = await confirmOTP(email, values.otp);
      if (res.status >= 200 && res.status < 300) {
        setOtp(values.otp);
        setStep("reset");
        toast.success("Xác thực OTP thành công!");
      } else {
        const message =
          res.data?.message || "Mã OTP không hợp lệ. Vui lòng thử lại.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Confirm OTP error", error);
      const message =
        error?.response?.data?.message ||
        "Mã OTP không hợp lệ. Vui lòng thử lại.";
      toast.error(message);
    }
  };

  const onResetPassword = async (values) => {
    try {
      const res = await resetPassword(otp, values.newPassword); // CHỈ otp + newPassword
      if (res.status >= 200 && res.status < 300) {
        toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập.");
        navigate("/auth/login");
      } else {
        const message =
          res.data?.message || "Đặt lại mật khẩu thất bại. Vui lòng thử lại.";
        toast.error(message);
      }
    } catch (error) {
      console.error("Reset password error", error);
      const message =
        error?.response?.data?.message ||
        "Đặt lại mật khẩu thất bại. Vui lòng thử lại.";
      toast.error(message);
    }
  };

  // UI renders
  const renderEmailStep = () => (
    <div className="flex flex-col gap-11">
      <h1 className="text-2xl font-extrabold text-center text-primary">
        Quên mật khẩu
      </h1>
      <span className="font-normal text-slate-600 text-center">
        Chúng tôi sẽ gửi mã OTP về email của bạn để xác thực
      </span>

      <Form {...emailForm}>
        <form
          onSubmit={emailForm.handleSubmit(onSendEmail)}
          className="gap-8 flex flex-col"
        >
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    className="px-[14px] rounded-2xl h-[50px] border-2 border-slate-300 bg-background placeholder:text-slate-300"
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  {checkingEmail && (
                    <span className="text-blue-500 text-sm">Đang kiểm tra...</span>
                  )}
                  {!checkingEmail && emailExists === false && (
                    <span className="text-red-500 text-sm">✗ Email không tồn tại</span>
                  )}
                  {!checkingEmail && emailExists === true && (
                    <span className="text-green-500 text-sm">✓ Email hợp lệ</span>
                  )}
                </div>
              </FormItem>
            )}
          />
          <Button
            type="primary"
            className={`min-w-full ${
              emailExists === false || checkingEmail || emailExists === null
                ? "opacity-50"
                : ""
            }`}
            disabled={
              emailForm.formState.isSubmitting ||
              emailExists === false ||
              checkingEmail ||
              emailExists === null
            }
            onClick={emailForm.handleSubmit(onSendEmail)}
          >
            {emailForm.formState.isSubmitting
              ? "Đang gửi..."
              : checkingEmail
              ? "Đang kiểm tra..."
              : emailExists === false
              ? "Email không tồn tại"
              : emailExists === null
              ? "Nhập email để kiểm tra"
              : "Gửi mã OTP"}
          </Button>
        </form>
      </Form>
    </div>
  );

  const renderOTPStep = () => (
    <div className="flex flex-col gap-11">
      <h1 className="text-2xl font-extrabold text-center text-primary">
        Nhập mã OTP
      </h1>
      <span className="font-normal text-slate-600 text-center">
        Chúng tôi đã gửi mã OTP 6 số về email <strong>{email}</strong>
      </span>

      <Form {...otpForm}>
        <form
          onSubmit={otpForm.handleSubmit(onVerifyOTP)}
          className="gap-8 flex flex-col"
        >
          <FormField
            control={otpForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="w-full h-auto">
                <FormControl>
                  <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                    <InputOTPGroup className="w-full flex gap-2 h-auto">
                      {[0, 1, 2, 3, 4, 5].map((i) => (
                        <InputOTPSlot
                          key={i}
                          className="!rounded-2xl flex-1 text-center font-[900] text-slate-600 p-2.5 border-2 border-slate-300 shrink-0 w-[48px] h-[48px]"
                          index={i}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  {checkingOtp && (
                    <span className="text-blue-500 text-sm">Đang kiểm tra...</span>
                  )}
                  {!checkingOtp && otpValid === false && (
                    <span className="text-red-500 text-sm">✗ Mã OTP không đúng</span>
                  )}
                  {!checkingOtp && otpValid === true && (
                    <span className="text-green-500 text-sm">✓ Mã OTP hợp lệ</span>
                  )}
                </div>
              </FormItem>
            )}
          />
          <Button
            type="primary"
            className={`min-w-full ${
              otpValid === false || checkingOtp || otpValid === null ? "opacity-50" : ""
            }`}
            disabled={
              otpForm.formState.isSubmitting ||
              otpValid === false ||
              checkingOtp ||
              otpValid === null
            }
            onClick={otpForm.handleSubmit(onVerifyOTP)}
          >
            {otpForm.formState.isSubmitting
              ? "Đang xác thực..."
              : checkingOtp
              ? "Đang kiểm tra..."
              : otpValid === false
              ? "Mã OTP không đúng"
              : otpValid === null
              ? "Nhập mã OTP để kiểm tra"
              : "Xác thực OTP"}
          </Button>

          <Button type="secondary" className="min-w-full" onClick={() => setStep("email")}>
            Quay lại
          </Button>
        </form>
      </Form>
    </div>
  );

  const renderResetStep = () => (
    <div className="flex flex-col gap-11">
      <h1 className="text-2xl font-extrabold text-center text-primary">
        Đặt lại mật khẩu
      </h1>
      <span className="font-normal text-slate-600 text-center">
        Nhập mật khẩu mới cho tài khoản <strong>{email}</strong>
      </span>

      <Form {...resetForm}>
        <form
          onSubmit={resetForm.handleSubmit(onResetPassword)}
          className="gap-8 flex flex-col"
        >
          <FormField
            control={resetForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    className="px-[14px] rounded-2xl h-[50px] border-2 border-slate-300 bg-background placeholder:text-slate-300"
                    placeholder="Mật khẩu mới"
                    type="password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={resetForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    className="px-[14px] rounded-2xl h-[50px] border-2 border-slate-300 bg-background placeholder:text-slate-300"
                    placeholder="Xác nhận mật khẩu mới"
                    type="password"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="primary"
            className="min-w-full"
            disabled={resetForm.formState.isSubmitting}
            onClick={resetForm.handleSubmit(onResetPassword)}
          >
            {resetForm.formState.isSubmitting ? "Đang đặt lại..." : "Đặt lại mật khẩu"}
          </Button>

          <Button type="secondary" className="min-w-full" onClick={() => setStep("otp")}>
            Quay lại
          </Button>
        </form>
      </Form>
    </div>
  );

  return (
    <>
      {step === "email" && renderEmailStep()}
      {step === "otp" && renderOTPStep()}
      {step === "reset" && renderResetStep()}
    </>
  );
};

export default ForgotPassword;
