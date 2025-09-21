// @ts-nocheck
import { CheckIcon, CircleDashedIcon, LoaderIcon } from "lucide-react";
import NextLessonBox from "../../components/page-component/base/NextLessonBox";
import TrialBox from "../../components/page-component/base/TrialBox";
import Button from "../../components/reuseables/Button";
import { cn } from "../../lib/utils";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";
import { fetchModules, fetchCoursesByLanguage } from "../../api/Management/module.service";
import { Module } from "../../api/types";

// Mảng màu sắc để sử dụng cho các module
const moduleColors = [
  "bg-red-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
  "bg-orange-400",
];

// Ánh xạ trạng thái từ database sang UI
const mapStatusToUI = (status) => {
  if (status === "active") return "done";
  if (status === "in_progress") return "in-progress";
  return "not-started";
};

function StudyPart() {
  const { currentLanguage, loading } = useLanguage();
  const [modules, setModules] = useState<Module[]>([]);
  const [loadingModules, setLoadingModules] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModules = async () => {
      if (!currentLanguage) {
        console.log("Không có currentLanguage, không thể tải module");
        return;
      }
      
      console.log("Đang tải module cho language ID:", currentLanguage.id);
      
      try {
        setLoadingModules(true);
        setError(null);
        
        // Lấy modules trực tiếp từ course_id = 2 (English for Beginners)
        const courseId = 2; // Cố định course_id = 2
        console.log("Đang tải modules cho course_id:", courseId);
        
        const allModules = await fetchModules(courseId);
        
        console.log("Dữ liệu module từ API:", allModules);
        
        if (!allModules || allModules.length === 0) {
          console.log("Không có dữ liệu module từ API");
          setModules([]);
          return;
        }
        
        // Sắp xếp modules theo order
        const sortedModules = allModules.sort((a, b) => a.order - b.order);
        
        // Xác định trạng thái cho từng module dựa trên thứ tự và trạng thái từ database
        const formattedModules = sortedModules.map((module, index) => {
          // Tìm vị trí của module active cuối cùng trước module hiện tại
          const activeModules = sortedModules.filter((m, i) => i < index && m.status === "active");
          const lastCompletedIndex = activeModules.length > 0 
            ? sortedModules.indexOf(activeModules[activeModules.length - 1]) 
            : -1;
          
          let status;
          if (module.status === "active") {
            // Nếu module đã hoàn thành (active), hiển thị dấu tick
            status = "done";
          } else if (index === 0 || (lastCompletedIndex !== -1 && index === lastCompletedIndex + 1)) {
            // Module đầu tiên hoặc module ngay sau module đã hoàn thành cuối cùng sẽ ở trạng thái "đang làm"
            status = "in-progress";
          } else {
            // Các module còn lại sẽ ở trạng thái "chưa bắt đầu"
            status = "not-started";
          }
          
          return {
            id: module.id,
            title: module.name || "Module không có tên",
            styles: moduleColors[index % moduleColors.length],
            status: status,
            description: module.description || "",
          };
        });
        
        console.log("Modules đã được format:", formattedModules);
        setModules(formattedModules);
      } catch (err) {
        console.error("Lỗi khi tải module:", err);
        setError("Không thể tải danh sách module");
      } finally {
        setLoadingModules(false);
      }
    };

    loadModules();
  }, [currentLanguage]);

  // Thêm console.log để debug
  console.log("Current language:", currentLanguage);
  console.log("Modules state:", modules);
  
  return (
    <div className="flex gap-8">
      <div className="grow">
        {loadingModules ? (
          <div className="flex justify-center items-center h-40">
            <LoaderIcon size={48} className="animate-spin text-accent" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            {error}
          </div>
        ) : modules.length === 0 ? (
          // Hiển thị thông báo khi không có module nào
          <div className="text-center text-blue-500 p-4">
            Không có module nào được tìm thấy cho ngôn ngữ này.
          </div>
        ) : (
          <div className="max-w-sm mx-auto flex flex-col gap-5">
            {modules.map((module, index) => (
              <NavLink
                key={module.id || index}
                to={`/hoc?moduleId=${module.id}`}
                className={cn([
                  "flex items-center justify-between rounded-2xl p-3 gap-8",
                  module.styles,
                  module.status === "not-started" && "opacity-50",
                ])}
              >
                <h2 className="be-vietnam-pro-black text-base leading-6 uppercase text-white">
                  {/* Tự động đánh số thứ tự phần dựa trên index */}
                  {`PHẦN ${index + 1}: ${module.title.toUpperCase()}`}
                </h2>
                <div className="flex-center p-2.5 rounded-2xl bg-white/10">
                  {module.status === "done" && (
                    <CheckIcon size={36} strokeWidth={4} className="text-white" />
                  )}
                  {module.status === "in-progress" && (
                    <LoaderIcon
                      size={36}
                      strokeWidth={4}
                      className="text-white"
                    />
                  )}
                  {module.status === "not-started" && (
                    <CircleDashedIcon
                      size={36}
                      strokeWidth={4}
                      className="text-white"
                    />
                  )}
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
      <aside className="max-w-[360px] h-full flex flex-col gap-8">
        <div
          role="course"
          className="bg-accent flex items-start justify-between gap-4 rounded-2xl p-3"
        >
          <h2 className="be-vietnam-pro-black text-white text-base leading-5 max-w-[200px]">
            KHÓA HỌC: ENGLISH FOR BEGINNERS
          </h2>
          <Button type="muted" className="p-2.5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.6665 22.75V5.25C4.6665 4.47645 4.97379 3.73459 5.52078 3.18761C6.06776 2.64062 6.80962 2.33333 7.58317 2.33333H22.1665C22.4759 2.33333 22.7727 2.45625 22.9915 2.67504C23.2103 2.89384 23.3332 3.19058 23.3332 3.5V24.5C23.3332 24.8094 23.2103 25.1062 22.9915 25.325C22.7727 25.5438 22.4759 25.6667 22.1665 25.6667H7.58317C6.80962 25.6667 6.06776 25.3594 5.52078 24.8124C4.97379 24.2654 4.6665 23.5235 4.6665 22.75ZM4.6665 22.75C4.6665 21.9765 4.97379 21.2346 5.52078 20.6876C6.06776 20.1406 6.80962 19.8333 7.58317 19.8333H23.3332M10.4998 11.0833L12.8332 13.4167L17.4998 8.75"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#475569"
              />
            </svg>
          </Button>
        </div>
        {/* Next lesson box */}
        <NextLessonBox />
        <TrialBox />
      </aside>
    </div>
  );
}

export default StudyPart;
