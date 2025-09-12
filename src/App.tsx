// App.tsx
// @ts-nocheck
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

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

// ✅ 3 trang verify (đặt theo path bạn đã dùng ở các file)
import VerifyEmail from "./pages/auth/VerifyEmail";
import VerifySuccess from "./pages/auth/VerifySuccess";
import VerifyConfirmation from "./pages/auth/VerifyConfirmation";

// 👇 Import LoadingIndicator
import LoadingIndicator from "./components/LoadingIndicator";

function App() {
    return (
        <>
            {/* LoadingIndicator luôn nằm trên toàn bộ app */}
            <LoadingIndicator />

            {/* ✅ Toaster dùng chung cho toàn app (sonner) */}
            <Toaster position="top-right" richColors />

            <Routes>
                {/* Public */}
                <Route path="/" element={<Hello />} />
                <Route path="/select-language" element={<SelectCourse />} />
                {/* OAuth callback */}
                <Route path="/oauth2/success" element={<OAuthSuccess />} />

                {/* Học bài/lesson rời */}
                <Route path="/hoc/bai-hoc/:slug" element={<Lesson />} />
                <Route path="/hoc/bai-hoc/:slug/ket-qua" element={<QuizzResult />} />

                {/* Nhóm dùng BaseLayout */}
                <Route element={<BaseLayout />}>
                    <Route path="/hoc" element={<Learn />} />
                    <Route path="/phat-am" element={<Pronun />} />
                    <Route path="/hoc-phan" element={<StudyPart />} />
                    <Route path="/khoa-hoc" element={<Courses />} />
                    <Route path="/ho-so" element={<Profile />} />
                </Route>

                {/* Nhóm Trial */}
                <Route element={<TrialComponent />}>
                    <Route path="/remider" element={<RemiderComponent />} />
                    <Route path="/trial" element={<MainIndexTrialComponent />} />
                    <Route path="/plan-trial" element={<PlanTrialComponent />} />
                    <Route path="/payment" element={<PaymentComponent />} />
                </Route>

                {/* ✅ Email verify flow (độc lập, không lồng dưới /auth) */}
                <Route path="/verify-confirmation" element={<VerifyConfirmation />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/verify-success" element={<VerifySuccess />} />

                {/* Auth */}
                <Route path="/auth" element={<Auth />}>
                    <Route index element={<Login />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                    <Route path="confirm-login" element={<AuthStep2 />} />
                    <Route path="*" element={<NotFoundOverlay />} />
                </Route>

                {/* Fallback 404 */}
                <Route path="*" element={<NotFoundOverlay />} />
            </Routes>
        </>
    );
}

export default App;
