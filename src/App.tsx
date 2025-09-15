// App.tsx
// @ts-nocheck
import { Route, Routes, useNavigate, useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import { jwtDecode } from "jwt-decode";

import Hello from "./pages/set-up/Hello";
import SelectCourse from "./pages/set-up/SelectCourse";

import Learn from "./pages/base/Learn";
import BaseLayout from "./pages/base/BaseLayout";
import Pronun from "./pages/base/Pronun";
import Profile from "./pages/base/Profile";
import StudyPart from "./pages/base/StudyPart";
import Courses from "./pages/base/Courses";

import Lesson from "./pages/lesson/Lesson";
import QuizzResult from "./components/page-component/lesson/quizz/QuizzResult";

import Auth from "./pages/Auth/Auth";
import Login from "./components/ui/AuthComponent/Login";
import Register from "./components/ui/AuthComponent/Register";
import ForgotPassword from "./components/ui/AuthComponent/ForgotPassword";
import ResetPassword from "./components/ui/AuthComponent/ResetPassword";
import AuthStep2 from "./components/ui/AuthComponent/AuthStep2";
import NotFoundOverlay from "./components/ui/NotFoundOverlay";
import OAuthSuccess from "./pages/OAuthSuccess";

// Trial
import TrialComponent from "./components/ui/TrialComponent/TrialComponent";
import MainIndexTrialComponent from "./components/ui/TrialComponent/MainIndexTrialComponent";
import RemiderComponent from "./components/ui/TrialComponent/RemiderComponent";
import PlanTrialComponent from "./components/ui/TrialComponent/PlanTrialComponent";
import PaymentComponent from "./components/ui/TrialComponent/PaymentComponent";

// ✅ verify
import VerifyEmail from "./pages/auth/VerifyEmail";
import VerifySuccess from "./pages/auth/VerifySuccess";
import VerifyConfirmation from "./pages/auth/VerifyConfirmation";

// ✅ Loading
import LoadingIndicator from "./components/LoadingIndicator";

// ✅ Guard & utils
import ProtectedRoute from "./utils/ProtectedRoute";
import {
    getStoredToken,
    clearAuthData,
    getRedirectPathByRole,
    isTokenValid,
    getUserRole,
} from "./utils/authUtils";
import AdminDashboard from "./pages/Management/CRUD/AdminDashboard";

/* ──────────────────────────────────────────────────────────────
   PublicOnlyRoute: Nếu ĐÃ đăng nhập thì chặn vào các trang public,
   tự chuyển hướng theo role (hoc/admin).
   Dùng để bọc: "/", "/auth/*", "/select-language"
   ────────────────────────────────────────────────────────────── */
const PublicOnlyRoute = ({ children }: { children?: React.ReactNode }) => {
    const token = getStoredToken();
    if (token && isTokenValid(token)) {
        const role = getUserRole();
        const redirectPath = getRedirectPathByRole(role || "");
        return <Navigate to={redirectPath} replace />;
    }
    return children ? <>{children}</> : <Outlet />;
};

/* ──────────────────────────────────────────────────────────────
   AuthGuard: chạy nền để:
   - Kiểm tra hạn token, auto logout nếu hết hạn
   - Nếu đang ở trang public mà đã login (kể cả login Google),
     tự redirect về /hoc hoặc /admin/dashboard
   ────────────────────────────────────────────────────────────── */
function AuthGuard() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = getStoredToken();

        if (!token) return;

        try {
            const decoded: any = jwtDecode(token);
            const now = Date.now() / 1000;

            if (decoded.exp < now) {
                clearAuthData();
                toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                navigate("/auth/login", { replace: true });
                return;
            }

            // Các path public (chỉ cho guest)
            const publicPaths = new Set<string>([
                "/", "/auth", "/auth/login", "/auth/register", "/auth/forgot-password",
                "/auth/reset-password", "/auth/confirm-login", "/select-language"
            ]);

            // Nếu đã đăng nhập mà đứng ở public → đẩy về trang theo role
            const path = location.pathname;
            if (publicPaths.has(path) || path.startsWith("/auth/")) {
                const role = decoded.role;
                const redirectPath = getRedirectPathByRole(role);
                if (path !== redirectPath) {
                    navigate(redirectPath, { replace: true });
                }
                return;
            }

            // Chặn chéo role (admin vào trang student và ngược lại)
            if (decoded.role === "ROLE_ADMIN") {
                if (
                    path.startsWith("/student") ||
                    path === "/hoc" ||
                    path === "/phat-am" ||
                    path === "/hoc-phan" ||
                    path === "/khoa-hoc" ||
                    path === "/ho-so"
                ) {
                    navigate("/admin/dashboard", { replace: true });
                }
            } else if (decoded.role === "ROLE_STUDENT" || decoded.role === "ROLE_USER") {
                if (path.startsWith("/admin")) {
                    navigate("/hoc", { replace: true });
                }
            }
        } catch (e) {
            console.error("Invalid token:", e);
            clearAuthData();
            navigate("/auth/login", { replace: true });
        }
    }, [navigate, location.pathname]);

    return null;
}

function App() {
    return (
        <>
            <LoadingIndicator />
            <AuthGuard />
            <Toaster position="top-right" richColors />

            <Routes>
                {/* ───── PUBLIC ONLY ───── */}
                <Route element={<PublicOnlyRoute />}>
                    <Route path="/" element={<Hello />} />
                    <Route path="/select-language" element={<SelectCourse />} />

                    {/* Auth group */}
                    <Route path="/auth" element={<Auth />}>
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route path="confirm-login" element={<AuthStep2 />} />
                        <Route path="*" element={<NotFoundOverlay />} />
                    </Route>
                </Route>

                {/* OAuth callback: để PUBLIC để component này đọc token và lưu.
            Sau khi lưu token, AuthGuard ở trên sẽ tự redirect theo role. */}
                <Route path="/oauth2/success" element={<OAuthSuccess />} />

                {/* ───── VERIFY FLOW (public) ───── */}
                <Route path="/verify-confirmation" element={<VerifyConfirmation />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/verify-success" element={<VerifySuccess />} />

                {/* ───── STUDENT PROTECTED (đã gói dưới ProtectedRoute) ───── */}
                <Route
                    path="/hoc/bai-hoc/:slug"
                    element={
                        <ProtectedRoute allowedRoles={["ROLE_STUDENT", "ROLE_USER"]}>
                            <Lesson />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/hoc/bai-hoc/:slug/ket-qua"
                    element={
                        <ProtectedRoute allowedRoles={["ROLE_STUDENT", "ROLE_USER"]}>
                            <QuizzResult />
                        </ProtectedRoute>
                    }
                />

                {/* BaseLayout routes - cần đăng nhập cho student */}
                <Route
                    element={
                        <ProtectedRoute allowedRoles={["ROLE_STUDENT", "ROLE_USER"]}>
                            <BaseLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="/hoc" element={<Learn />} />
                    <Route path="/phat-am" element={<Pronun />} />
                    <Route path="/hoc-phan" element={<StudyPart />} />
                    <Route path="/khoa-hoc" element={<Courses />} />
                    <Route path="/ho-so" element={<Profile />} />
                </Route>

                {/* Student area (ví dụ dashboard riêng) */}
                <Route
                    path="/student"
                    element={<ProtectedRoute allowedRoles={["ROLE_STUDENT", "ROLE_USER"]} />}
                >
                    <Route path="dashboard" element={<div>Student Dashboard - Đang phát triển</div>} />
                </Route>

                {/* Admin area */}
                <Route path="/admin" element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                    <Route index element={<div><AdminDashboard/></div>} />
                    <Route path="dashboard" element={<div><AdminDashboard/></div>} />
                </Route>

                {/* Trial (giữ nguyên là public theo logic cũ của bạn) */}
                <Route element={<TrialComponent />}>
                    <Route path="/remider" element={<RemiderComponent />} />
                    <Route path="/trial" element={<MainIndexTrialComponent />} />
                    <Route path="/plan-trial" element={<PlanTrialComponent />} />
                    <Route path="/payment" element={<PaymentComponent />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFoundOverlay />} />
            </Routes>
        </>
    );
}

export default App;
