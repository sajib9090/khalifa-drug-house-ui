import { FaSellsy } from "react-icons/fa6";
import DashboardBox from "../../components/DashboardBox/DashboardBox";

const Reports = () => {
  const date = new Date();
  const formattedDate = date.toISOString().split("T")[0];
  return (
    <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardBox
        borderColor={"border-sky-300"}
        backGroundColor={"bg-sky-200"}
        logo={<FaSellsy />}
        logoColor={"text-sky-600"}
        link={`/reports/query?date=${formattedDate}`}
        quantity={formattedDate}
        title={"Today's Sales"}
      />
    </div>
  );
};

export default Reports;
