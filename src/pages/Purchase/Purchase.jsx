import DashboardBox from "../../components/DashboardBox/DashboardBox";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaKitMedical } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";

const Purchase = () => {
  const today = new Date().toLocaleDateString("en-CA");
  return (
    <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardBox
        borderColor={"border-green-300"}
        backGroundColor={"bg-green-200"}
        logo={<BiSolidPurchaseTag />}
        logoColor={"text-green-600"}
        link={`purchase-details?query=${today  }`}
        quantity={300}
        title={"Purchases for Today"}
      />
      <DashboardBox
        borderColor={"border-orange-300"}
        backGroundColor={"bg-orange-200"}
        logo={<BiSolidPurchaseTag />}
        logoColor={"text-orange-600"}
        link={"purchase-details"}
        quantity={300}
        title={"Total Purchases for This Month"}
      />
      <DashboardBox
        borderColor={"border-sky-300"}
        backGroundColor={"bg-sky-200"}
        logo={<GiMedicines />}
        logoColor={"text-sky-600"}
        link={"#"}
        quantity={300}
        title={"Medicine Purchases for This Month"}
      />
      <DashboardBox
        borderColor={"border-pink-300"}
        backGroundColor={"bg-pink-200"}
        logo={<FaKitMedical />}
        logoColor={"text-pink-600"}
        link={"#"}
        quantity={300}
        title={"Other Purchases for This Month"}
      />
    </div>
  );
};

export default Purchase;
