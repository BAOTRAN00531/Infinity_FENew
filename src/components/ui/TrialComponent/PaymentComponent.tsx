// src/components/ui/PaymentComponent/PaymentComponent.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Button from "../../reuseables/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

// IMPORT API FUNCTIONS VÀ TYPES MỚI
import { createVipOrder } from "@/api/orderApi";
import { CreateVipOrderRequest } from "@/api/order";

import momoIcon from "@/components/payment/icons/momo-logo.png";
import sepayIcon from "@/components/payment/icons/sepay.png";
import visaIcon from "@/components/payment/icons/visa.png";
import cashIcon from "@/components/payment/icons/cod.png";

const formSchema = z.object({
  cardNumber: z.string().min(1, "Số thẻ không được để trống"),
  expiryDate: z.coerce.date(),
  cvv: z.string().min(1, "Mã bảo mật không được để trống"),
  country: z.string().default("Việt Nam"),
});

const PaymentComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CASH");
  const [submitting, setSubmitting] = useState(false);
  const [planInfo, setPlanInfo] = useState<{
    duration: number;
    price: number;
    planData: any;
  } | null>(null);

  useEffect(() => {
    const duration = searchParams.get("duration");
    const price = searchParams.get("price");
    const planId = searchParams.get("planId");

    console.log("Tham số URL:", { duration, price, planId });

    if (!duration || !price) {
      toast.error("Không tìm thấy thông tin gói cước. Vui lòng chọn lại!");
      navigate("/plan-trial");
      return;
    }

    const pricingPlans = [
      {
        id: "plan_3m", duration: 3, title: "Gói 3 tháng", price: 150000, originalPrice: 200000, discount: "25%", popular: false,
        features: ["Truy cập toàn bộ tài liệu cơ bản", "Hỗ trợ qua email", "5 bài kiểm tra/tháng"]
      },
      {
        id: "plan_6m", duration: 6, title: "Gói 6 tháng", price: 270000, originalPrice: 360000, discount: "25%", popular: true,
        features: ["Tất cả tính năng gói 3 tháng", "Hỗ trợ 24/7", "Bài kiểm tra không giới hạn", "Tài liệu nâng cao"]
      },
      {
        id: "plan_12m", duration: 12, title: "Gói 12 tháng", price: 480000, originalPrice: 720000, discount: "33%", popular: false,
        features: ["Tất cả tính năng gói 6 tháng", "Tư vấn học tập 1:1", "Truy cập sớm tính năng mới", "Certificate xác nhận hoàn thành"]
      },
    ];

    let planData = null;
    if (planId) {
      planData = pricingPlans.find(plan => plan.id === planId);
    }

    if (!planData) {
      planData = pricingPlans.find(plan => plan.duration === parseInt(duration));
    }

    setPlanInfo({
      duration: parseInt(duration),
      price: parseInt(price),
      planData: planData
    });
  }, [searchParams, navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expiryDate: new Date(),
      cardNumber: "",
      cvv: "",
    },
  });

  const handleCreateVipOrder = async () => {
    console.log("------------------------------------------");
    console.log("BƯỚC 1: Bắt đầu xử lý đơn hàng...");
    console.log("Phương thức thanh toán được chọn:", selectedPaymentMethod);

    if (!planInfo) {
      toast.error("Không tìm thấy thông tin gói cước");
      console.error("LỖI ĐẦU VÀO: planInfo rỗng.");
      return;
    }

    // ✅ TẠM THỜI: Lấy userId từ đâu đó trong ứng dụng của bạn
    // Ví dụ: từ context, Redux, hoặc local storage
    const userId = 123; // Thay thế bằng logic thực tế của bạn
    if (!userId) {
      toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      setSubmitting(true);
      console.log(`BƯỚC 2: Gọi hàm createVipOrder với phương thức: ${selectedPaymentMethod}`);

      // ✅ SỬA ĐỂ KHỚP VỚI BACKEND
      const orderData: CreateVipOrderRequest = {
        userId: userId,
        paymentMethod: selectedPaymentMethod,
        durationInMonths: planInfo.duration,
      };

      const res = await createVipOrder(orderData);

      console.log("BƯỚC 3: Tạo đơn hàng thành công. Phản hồi:", res);
      const orderCode = res.orderCode;
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

      console.log("BƯỚC 4: Kiểm tra phương thức để chuyển hướng...");
      switch (selectedPaymentMethod) {
        case "MOMO":
          console.log("Chuyển hướng đến MOMO.");
          window.location.href = `${backendUrl}/api/momo/pay?orderCode=${orderCode}`;
          break;
        case "SEPAY":
          console.log("Chuyển hướng đến SEPAY.");
          navigate(`/sepay-payment?orderCode=${orderCode}`);
          break;
        case "CASH":
          console.log("Thanh toán tiền mặt, chuyển đến trang xác nhận.");
          navigate(`/invoice?orderId=${orderCode}&result=pending&paymentMethod=cash`);
          break;
        default:
          console.log("Phương thức không xác định, chuyển hướng đến Invoice.");
          navigate(`/invoice?orderId=${orderCode}&result=success`);
          break;
      }
    } catch (err: any) {
      console.error("LỖI KHI TẠO ĐƠN HÀNG:", err);
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.response?.data || "Lỗi từ server.";
        toast.error(`Lỗi: ${errorMessage}`);
        console.error("Chi tiết lỗi Axios:", err.response);
      } else {
        toast.error("Không thể tạo đơn hàng. Vui lòng thử lại!");
      }
    } finally {
      setSubmitting(false);
      console.log("BƯỚC 5: Kết thúc xử lý.");
      console.log("------------------------------------------");
    }
  };

  const handleCardPayment = async (values: z.infer<typeof formSchema>) => {
    console.log("------------------------------------------");
    console.log("BƯỚC 1: Bắt đầu thanh toán thẻ.");
    console.log("Dữ liệu form thẻ:", values);

    if (!planInfo) {
      toast.error("Không tìm thấy thông tin gói cước");
      console.error("LỖI ĐẦU VÀO: planInfo rỗng.");
      return;
    }

    // ✅ TẠM THỜI: Lấy userId từ đâu đó trong ứng dụng của bạn
    const userId = 123; // Thay thế bằng logic thực tế của bạn
    if (!userId) {
      toast.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      setSubmitting(true);
      console.log("BƯỚC 2: Gọi hàm createVipOrder với phương thức CARD");

      // ✅ SỬA ĐỂ KHỚP VỚI BACKEND
      const orderData: CreateVipOrderRequest = {
        userId: userId,
        paymentMethod: "VISA_MASTER", // Hoặc "CARD"
        durationInMonths: planInfo.duration,
      };

      // ✅ LƯU Ý: Backend của bạn không nhận `cardDetails` trong DTO này.
      // Nếu bạn muốn gửi thông tin thẻ, bạn cần sửa DTO backend.
      // Để code hoạt động, tôi đã bỏ trường cardDetails khỏi payload.

      const res = await createVipOrder(orderData);

      console.log("BƯỚC 3: Đơn hàng thẻ thành công. Phản hồi:", res);
      const orderCode = res.orderCode;
      toast.success("Đã tạo đơn hàng thành công!");

      navigate(`/invoice?orderId=${orderCode}&result=success&paymentMethod=card`);
    } catch (err: any) {
      console.error("LỖI KHI TẠO ĐƠN HÀNG THẺ:", err);
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.response?.data || "Lỗi từ server.";
        toast.error(`Lỗi: ${errorMessage}`);
        console.error("Chi tiết lỗi Axios:", err.response);
      } else {
        toast.error("Không thể tạo đơn hàng. Vui lòng thử lại!");
      }
    } finally {
      setSubmitting(false);
      console.log("------------------------------------------");
    }
  };

  if (!planInfo) {
    return <div className="p-4 text-center text-slate-600">Đang tải thông tin gói cước...</div>;
  }


  return (
      <div className="w-full h-full flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-20 py-8">
        <div className="flex flex-col gap-8 flex-1 max-w-lg">
          <h1 className="uppercase font-black text-3xl md:text-4xl text-slate-800 leading-tight">
            Xác nhận thanh toán cho gói{" "}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                        {planInfo.duration} tháng
                    </span>
          </h1>
          <p className="text-lg text-slate-600">
            Tổng tiền: <strong>{planInfo.price.toLocaleString("vi-VN")} VNĐ</strong>
          </p>
          {planInfo.planData && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800">Thông tin gói:</h3>
                <p className="text-blue-600">{planInfo.planData.title}</p>
                <p className="text-sm text-green-600">
                  Tiết kiệm: {((planInfo.planData.originalPrice - planInfo.planData.price).toLocaleString("vi-VN"))} VNĐ ({planInfo.planData.discount})
                </p>
              </div>
          )}
        </div>

        <div className="flex-1 w-full max-w-md">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Chọn phương thức thanh toán</h2>

            <div className="space-y-3 mb-6">
              <label className="block text-sm font-medium text-gray-600">
                Bạn muốn thanh toán bằng:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                    onClick={() => setSelectedPaymentMethod("CASH")}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition ${
                        selectedPaymentMethod === "CASH"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 bg-white"
                    }`}
                >
                  <img src={cashIcon} alt="Tiền mặt" className="h-6 mb-1" />
                  <span className="text-xs font-medium text-gray-700">Tiền mặt</span>
                </button>
                <button
                    onClick={() => setSelectedPaymentMethod("VISA_MASTER")}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition ${
                        selectedPaymentMethod === "VISA_MASTER"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 bg-white"
                    }`}
                >
                  <img src={visaIcon} alt="Visa" className="h-6 mb-1" />
                  <span className="text-xs font-medium text-gray-700">Thẻ</span>
                </button>
                <button
                    onClick={() => setSelectedPaymentMethod("MOMO")}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition ${
                        selectedPaymentMethod === "MOMO"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 bg-white"
                    }`}
                >
                  <img src={momoIcon} alt="MoMo" className="h-6 mb-1" />
                  <span className="text-xs font-medium text-gray-700">MoMo</span>
                </button>
                <button
                    onClick={() => setSelectedPaymentMethod("SEPAY")}
                    className={`flex flex-col items-center justify-center p-3 border rounded-lg transition ${
                        selectedPaymentMethod === "SEPAY"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-300 bg-white"
                    }`}
                >
                  <img src={sepayIcon} alt="Sepay" className="h-6 mb-1" />
                  <span className="text-xs font-medium text-gray-700">SePay</span>
                </button>
              </div>
            </div>

            {selectedPaymentMethod === "VISA_MASTER" ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCardPayment)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>SỐ THẺ</FormLabel>
                              <FormControl>
                                <Input placeholder="1234 5678 9012 3456" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>NGÀY HẾT HẠN</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                      type="button"
                                      className={`w-full text-left p-2 border rounded ${
                                          !field.value && "text-muted-foreground"
                                      }`}
                                  >
                                    {field.value
                                        ? format(field.value, "MM/yyyy")
                                        : "MM/YY"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 inline-block" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={(date) => {
                                        console.log("Ngày được chọn:", date);
                                        field.onChange(date);
                                      }}
                                      initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>MÃ BẢO MẬT</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="min-w-full mt-6"
                        disabled={submitting}
                    >
                      {submitting ? "Đang xử lý..." : "XÁC NHẬN VÀ THANH TOÁN"}
                    </Button>
                  </form>
                </Form>
            ) : (
                <Button
                    type="button"
                    className="min-w-full mt-6"
                    onClick={handleCreateVipOrder}
                    disabled={submitting}
                >
                  {submitting ? "Đang xử lý..." : "XÁC NHẬN VÀ THANH TOÁN"}
                </Button>
            )}

            {selectedPaymentMethod === "CASH" && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý khi thanh toán tiền mặt:</strong> Bạn sẽ cần đến văn phòng của chúng tôi để hoàn tất thanh toán và kích hoạt gói dịch vụ.
                  </p>
                </div>
            )}

            <p className="text-sm text-gray-500 mt-4">
              Khi bạn nhấn Xác nhận, một đơn hàng sẽ được tạo và bạn sẽ được chuyển đến trang thanh toán của đối tác.
            </p>
          </div>
        </div>
      </div>
  );
};

export default PaymentComponent;