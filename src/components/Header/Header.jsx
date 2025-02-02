import { useSelector } from "react-redux";
import defaultLogo from "../../assets/logo/png-transparent-blue-capsule-com-removebg-preview.png";
import { currentUser } from "../../redux/features/auth/authSlice";
const Header = () => {
  const user = useSelector(currentUser);

  return (
    <div className="h-[80px] hidden sm:hidden md:hidden lg:flex">
      <div className="bg-slate-200 w-[256px] flex items-center justify-between px-6 shadow">
        <div>
          <img
            className="h-[50px]"
            src={user?.pharmacyInfo?.brand_logo?.url || defaultLogo}
            alt=""
          />
        </div>
        <div>
          <p className="capitalize font-semibold">
            {user?.pharmacyInfo?.pharmacy_name || "pharmacy_name"}
          </p>
          <p className="capitalize text-[10px] text-gray-500">
            {user?.pharmacyInfo?.address?.sub_district || "sub-district"},{" "}
            {user?.pharmacyInfo?.address?.district || "district"}
          </p>
        </div>
      </div>
      <div className="bg-[#F7FAFD] flex-grow shadow border-b border-[#d6d5d5]">
        <h1>up bar</h1>
      </div>
    </div>
  );
};

export default Header;
