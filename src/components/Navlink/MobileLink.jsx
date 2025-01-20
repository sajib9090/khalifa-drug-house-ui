/* eslint-disable react/prop-types */
import { GiSellCard } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
import { ImHome3 } from "react-icons/im";
import { MdOutlineInventory, MdSpaceDashboard } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { currentUser, logout } from "../../redux/features/auth/authSlice";
import { BiSolidPurchaseTag } from "react-icons/bi";

const MobileLink = ({ setIsMenuOpen }) => {
  const user = useSelector(currentUser);
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div className="w-full">
      <Link
        onClick={() => setIsMenuOpen(false)}
        to={"/"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname === "/"
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <ImHome3 />
        <p>Home</p>
      </Link>
      <Link
        onClick={() => setIsMenuOpen(false)}
        to={"/dashboard"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("dashboard")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <MdSpaceDashboard />
        <p>Dashboard</p>
      </Link>
      <Link
        onClick={() => setIsMenuOpen(false)}
        to={"/inventory"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("inventory")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <MdOutlineInventory />
        <p>Inventory</p>
      </Link>
      <Link
        onClick={() => setIsMenuOpen(false)}
        to={"/purchase"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("purchase")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <BiSolidPurchaseTag />
        <p>Purchase</p>
      </Link>
      <Link
        onClick={() => setIsMenuOpen(false)}
        to={"/sell"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("sell")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <GiSellCard />
        <p>Sell</p>
      </Link>
      <Link
        onClick={() => setIsMenuOpen(false)}
        to={"/reports"}
        className={`flex items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white ${
          location?.pathname?.includes("reports")
            ? " bg-[#009099] text-white "
            : "text-black"
        }`}
      >
        <HiDocumentReport />
        <p>Reports</p>
      </Link>
      {user && (
        <button
          onClick={() => dispatch(logout())}
          className={`flex w-full items-center justify-center px-6 space-x-2 py-3 text-lg hover:bg-[#009099] hover:text-white text-black
        `}
        >
          <TbLogout2 />
          <p>Logout</p>
        </button>
      )}
    </div>
  );
};

export default MobileLink;
