// @ts-nocheck
import React, { useState, useEffect } from "react";
import Button from "../../reuseables/Button";
import "./Trial.scss";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Dữ liệu gói cước với đầy đủ thông tin
const pricingPlans = [
  {
    id: "plan_3m",
    duration: 3,
    title: "Gói 3 tháng",
    price: 150000,
    originalPrice: 200000,
    discount: "25%",
    features: [
      "Truy cập toàn bộ tài liệu cơ bản",
      "Hỗ trợ qua email",
      "5 bài kiểm tra/tháng"
    ],
    popular: false
  },
  {
    id: "plan_6m",
    duration: 6,
    title: "Gói 6 tháng",
    price: 270000,
    originalPrice: 360000,
    discount: "25%",
    features: [
      "Tất cả tính năng gói 3 tháng",
      "Hỗ trợ 24/7",
      "Bài kiểm tra không giới hạn",
      "Tài liệu nâng cao"
    ],
    popular: true
  },
  {
    id: "plan_12m",
    duration: 12,
    title: "Gói 12 tháng",
    price: 480000,
    originalPrice: 720000,
    discount: "33%",
    features: [
      "Tất cả tính năng gói 6 tháng",
      "Tư vấn học tập 1:1",
      "Truy cập sớm tính năng mới",
      "Certificate xác nhận hoàn thành"
    ],
    popular: false
  },
];

const PlanTrialComponent = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(pricingPlans[2]);
  const [isLoading, setIsLoading] = useState(false);

  // Khôi phục lựa chọn từ localStorage nếu có
  useEffect(() => {
    const savedPlan = localStorage.getItem('selectedPlan');
    if (savedPlan) {
      try {
        const parsedPlan = JSON.parse(savedPlan);
        const foundPlan = pricingPlans.find(plan => plan.id === parsedPlan.id);
        if (foundPlan) setSelectedPlan(foundPlan);
      } catch (error) {
        console.error("Error parsing saved plan:", error);
      }
    }
  }, []);

  // Lưu lựa chọn vào localStorage
  useEffect(() => {
    if (selectedPlan) {
      localStorage.setItem('selectedPlan', JSON.stringify(selectedPlan));
    }
  }, [selectedPlan]);

  // LOGIC ĐÃ ĐƯỢC CẬP NHẬT: Tự động chuyển trang sau khi click
  const handleSelectPlan = (plan) => {
    console.log("Đã chọn gói:", plan.title, plan);
    setSelectedPlan(plan);
    toast.info(`Đã chọn ${plan.title} - Tiết kiệm ${plan.discount}`);

    // TỰ ĐỘNG CHUYỂN HƯỚNG SANG TRANG THANH TOÁN
    navigate(`/payment?duration=${plan.duration}&price=${plan.price}&planId=${plan.id}`);
  };

  // Tính toán giá tiết kiệm được
  const calculateSavings = (plan) => {
    return plan.originalPrice - plan.price;
  };

  return (
      <div className="w-full h-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-20 py-8">
        {/* Phần mô tả bên trái */}
        <div className="flex flex-col gap-8 flex-1 max-w-lg">
          <h1 className="uppercase font-black text-3xl md:text-4xl text-slate-800 leading-tight">
            Chọn gói đăng ký để nâng cấp trải nghiệm học tập của bạn
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            Nâng cấp lên{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-bold">
            Infinity Pro
          </span>{" "}
            để mở khóa toàn bộ kho tài liệu, bài học và tính năng nâng cao giúp bạn học tập hiệu quả hơn.
          </p>

          {/* Hiển thị gói đã chọn */}
          {selectedPlan && (
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-2">Gói đã chọn:</h3>
                <p className="text-blue-600">{selectedPlan.title} - {selectedPlan.price.toLocaleString("vi-VN")} VNĐ</p>
                <p className="text-sm text-green-600 mt-1">
                  Tiết kiệm {calculateSavings(selectedPlan).toLocaleString("vi-VN")} VNĐ ({selectedPlan.discount})
                </p>
              </div>
          )}
        </div>

        {/* Phần lựa chọn gói bên phải */}
        <div className="flex-1 w-full max-w-md">
          <div className="trial_table w-full mx-auto flex flex-col gap-6 items-center">
            {pricingPlans.map((plan) => (
                <button
                    key={plan.id}
                    className={`relative w-full flex flex-col items-start rounded-2xl p-6 border-2 transition-all text-left bg-white hover:shadow-md ${
                        selectedPlan.id === plan.id
                            ? "border-blue-500 shadow-lg scale-105"
                            : "border-gray-200"
                    } ${plan.popular ? "ring-2 ring-yellow-400 ring-opacity-50" : ""}`}
                    onClick={() => handleSelectPlan(plan)}
                >
                  {/* Badge phổ biến */}
                  {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                        PHỔ BIẾN NHẤT
                      </div>
                  )}

                  {/* Badge tiết kiệm */}
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    TIẾT KIỆM {plan.discount}
                  </div>

                  <div className="font-bold text-slate-800 flex w-full items-center justify-between mb-4">
                    <span className="text-xl">{plan.title}</span>
                    <span className="text-2xl text-blue-600">
                  {plan.price.toLocaleString("vi-VN")} VNĐ
                </span>
                  </div>

                  {/* Giá gốc */}
                  <div className="text-sm text-gray-500 line-through mb-2">
                    {plan.originalPrice.toLocaleString("vi-VN")} VNĐ
                  </div>

                  {/* Tính năng */}
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                    ))}
                  </ul>
                </button>
            ))}
          </div>
        </div>
      </div>
  );
};

export default PlanTrialComponent;
