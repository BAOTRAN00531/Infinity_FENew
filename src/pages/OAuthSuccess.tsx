// @ts-nocheck
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const OAuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("access_token", token);
        toast.success("Đăng nhập thành công!");
        navigate("/", { replace: true });
      } else {
        toast.error("Không tìm thấy token xác thực.");
        navigate("/auth/login", { replace: true });
      }
    } catch (e) {
      console.error("OAuth callback error", e);
      toast.error("Có lỗi khi xử lý đăng nhập.");
      navigate("/auth/login", { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <div className="w-full h-[60vh] flex items-center justify-center text-slate-500">
      Đang xử lý đăng nhập...
    </div>
  );
};

export default OAuthSuccess;
