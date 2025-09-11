import { Routes, Route } from "react-router-dom";
import AuthStep2 from "../components/ui/AuthComponent/AuthStep2";
import ForgotPassword from "../components/ui/AuthComponent/ForgotPassword";
import Login from "../components/ui/AuthComponent/Login";
import Register from "../components/ui/AuthComponent/Register";
import ResetPassword from "../components/ui/AuthComponent/ResetPassword";
import NotFoundOverlay from "../components/ui/NotFoundOverlay";

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/confirm-login" element={<AuthStep2 />} />

            {/* fallback */}
            <Route path="*" element={<NotFoundOverlay />} />
        </Routes>
    );
}
