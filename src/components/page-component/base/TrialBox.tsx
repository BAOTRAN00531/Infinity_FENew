import { NavLink } from "react-router-dom";
import Button from "../../reuseables/Button";
import {useUser} from "@/api/UserContext";

function TrialBox() {
    const { userProfile, loading } = useUser();

    // Hiển thị một trạng thái rỗng hoặc null khi đang tải dữ liệu để tránh nhấp nháy
    if (loading) {
        return null;
    }

    // Nếu người dùng đã là VIP (isVip là true), không hiển thị component này
    if (userProfile?.isVip) {
        return null;
    }

    // Nếu không phải VIP, hiển thị component như bình thường
    return (
    <div className="flex flex-col p-5 rounded-2xl border-2 border-slate-300 bg-transparent gap-5">
      <h2 className="uppercase text-slate-600 be-vietnam-pro-black">
        trải nghiệm <span className="text-premium-gradient">infinity pro</span>{" "}
        miễn phí
      </h2>
      <p className="text-[14px] text-slate-600 be-vietnam-pro-regular">
        Dùng thử{" "}
        <span className="text-premium-gradient font-semibold  ">
          Infinity Pro
        </span>{" "}
        trong vòng 14 ngày hoàn toàn miễn phí!
      </p>
      <NavLink to={"/trial"} className={"w-full"}>
        <Button className="max-w-full w-full">dùng thử ngay</Button>
      </NavLink>
    </div>
  );
}

export default TrialBox;
