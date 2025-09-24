import { Route, Routes, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { jwtDecode } from 'jwt-decode';

import Hello from './pages/set-up/Hello';
import SelectCourse from './pages/set-up/SelectCourse';
import Learn from './pages/base/Learn';
import BaseLayout from './pages/base/BaseLayout';
import Pronun from './pages/base/Pronun';
import Profile from './pages/base/Profile';
import StudyPart from './pages/base/StudyPart';
import Courses from './pages/base/Courses';
import Lesson from './pages/lesson/Lesson';
import QuizzResult from './components/page-component/lesson/quizz/QuizzResult';
import Auth from './pages/Auth/Auth';
import Login from './components/ui/AuthComponent/Login';
import Register from './components/ui/AuthComponent/Register';
import ForgotPassword from './components/ui/AuthComponent/ForgotPassword';
import ResetPassword from './components/ui/AuthComponent/ResetPassword';
import AuthStep2 from './components/ui/AuthComponent/AuthStep2';
import NotFoundOverlay from './components/ui/NotFoundOverlay';
import OAuthSuccess from './pages/OAuthSuccess';
import TrialComponent from './components/ui/TrialComponent/TrialComponent';
import MainIndexTrialComponent from './components/ui/TrialComponent/MainIndexTrialComponent';
import RemiderComponent from './components/ui/TrialComponent/RemiderComponent';
import PlanTrialComponent from './components/ui/TrialComponent/PlanTrialComponent';
import PaymentComponent from './components/ui/TrialComponent/PaymentComponent';
import VerifyEmail from '@pages/Auth/VerifyEmail';
import VerifySuccess from '@pages/Auth/VerifySuccess';
import VerifyConfirmation from '@pages/Auth/VerifyConfirmation';
import LoadingIndicator from './components/LoadingIndicator';
import ProtectedRoute from './utils/ProtectedRoute';
import { getStoredToken, clearAuthData, getRedirectPathByRole, isTokenValid, getUserRole } from './utils/authUtils';
import AdminDashboard from './pages/Management/CRUD/AdminDashboard';
import SepayPaymentPage from '@components/reuseables/Management/payment/SePayPaymentPage';
import InvoicePage from '@components/reuseables/Management/payment/InvoicePage';
import OrderHistoryPage from '@components/reuseables/Management/history/OrderHistoryPage';
import AdPopupWrapper from '@components/ui/Ads/Manager/AdPopupWrapper';
import { useUser } from '@/api/UserContext';

const PublicOnlyRoute = ({ children }: { children?: React.ReactNode }) => {
    const token = getStoredToken();
    if (token && isTokenValid(token)) {
        const role = getUserRole();
        const redirectPath = getRedirectPathByRole(role || '');
        return <Navigate to={redirectPath} replace />;
    }
    return children ? <>{children}</> : <Outlet />;
};

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
                toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                navigate('/auth/login', { replace: true });
                return;
            }

            const publicPaths = new Set<string>([
                '/', '/auth', '/auth/login', '/auth/register', '/auth/forgot-password',
                '/auth/reset-password', '/auth/confirm-login', '/select-language',
            ]);

            const path = location.pathname;
            if (publicPaths.has(path) || path.startsWith('/auth/')) {
                const role = decoded.role;
                const redirectPath = getRedirectPathByRole(role);
                if (path !== redirectPath) {
                    navigate(redirectPath, { replace: true });
                }
                return;
            }

            if (decoded.role === 'ROLE_ADMIN') {
                if (
                    path.startsWith('/student') ||
                    path === '/hoc' ||
                    path === '/phat-am' ||
                    path === '/hoc-phan' ||
                    path === '/khoa-hoc' ||
                    path === '/ho-so'
                ) {
                    navigate('/admin/dashboard', { replace: true });
                }
            } else if (decoded.role === "ROLE_STUDENT" || decoded.role === "ROLE_USER") {
                if (path.startsWith("/admin")) {
                    navigate("/hoc-phan", { replace: true });
                }
            }
        } catch (e) {
            console.error('Invalid token:', e);
            clearAuthData();
            navigate('/auth/login', { replace: true });
        }
    }, [navigate, location.pathname]);

    return null;
}

function App() {
    const { loading, userProfile, error } = useUser();

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <>
            <LoadingIndicator />
            <AuthGuard />
            <Toaster position="top-right" richColors />
            <AdPopupWrapper userProfile={userProfile}>
                <Routes>
                    {/* ───── PUBLIC ONLY ───── */}
                    <Route element={<PublicOnlyRoute />}>
                        <Route path="/" element={<Hello />} />
                        <Route path="/select-language" element={<SelectCourse />} />
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

                    {/* OAuth callback */}
                    <Route path="/oauth2/success" element={<OAuthSuccess />} />

                    {/* Verify flow */}
                    <Route path="/verify-confirmation" element={<VerifyConfirmation />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/verify-success" element={<VerifySuccess />} />

                    {/* Student protected */}
                    <Route
                        path="/hoc/bai-hoc/:slug"
                        element={
                            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_USER']}>
                                <Lesson />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/hoc/bai-hoc/:slug/ket-qua"
                        element={
                            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_USER']}>
                                <QuizzResult />
                            </ProtectedRoute>
                        }
                    />

                    {/* BaseLayout routes */}
                    <Route
                        element={
                            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_USER']}>
                                <BaseLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/hoc" element={<Learn />} />
                        <Route path="/lesson/:id" element={<Lesson />} />
                        <Route path="/phat-am" element={<Pronun />} />
                        <Route path="/hoc-phan" element={<StudyPart />} />
                        <Route path="/khoa-hoc" element={<Courses />} />
                        <Route path="/ho-so" element={<Profile />} />
                    </Route>

                    {/* Student area */}
                    <Route path="/student" element={<ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_USER']} />}>
                        <Route path="dashboard" element={<div>Student Dashboard - Đang phát triển</div>} />
                    </Route>

                    {/* Admin area */}
                    <Route path="/admin" element={<ProtectedRoute allowedRoles={['ROLE_ADMIN']} />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                    </Route>

                    {/* Trial */}
                    <Route element={<TrialComponent />}>
                        <Route path="/remider" element={<RemiderComponent />} />
                        <Route path="/trial" element={<MainIndexTrialComponent />} />
                        <Route path="/plan-trial" element={<PlanTrialComponent />} />
                        <Route path="/payment" element={<PaymentComponent />} />
                        <Route path="/invoice" element={<InvoicePage />} />
                        <Route path="/order-history" element={<OrderHistoryPage />} />
                    </Route>
                    <Route path="/sepay-payment" element={<SepayPaymentPage />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundOverlay />} />
                </Routes>
            </AdPopupWrapper>
        </>
    );
}

export default App;