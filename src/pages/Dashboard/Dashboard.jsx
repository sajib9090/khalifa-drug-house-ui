import { MdOutlineEventAvailable } from "react-icons/md";
import DashboardBox from "../../components/DashboardBox/DashboardBox";
import { CgUnavailable } from "react-icons/cg";
import { MdGroups2 } from "react-icons/md";
import { GiOverdose } from "react-icons/gi";
import { BsBuildingsFill } from "react-icons/bs";
import { useGetAllMedicinesQuery } from "../../redux/features/medicineApi/medicineApi";
import { useGetAllGroupsQuery } from "../../redux/features/groupApi/groupApi";
import { useGetAllCompaniesQuery } from "../../redux/features/companyApi/companyApi";
import { useGetAllDosageFormsQuery } from "../../redux/features/dosageForm/dosageFormApi";

const Dashboard = () => {
  const { data: medicines, isLoading: medicineLoading } =
    useGetAllMedicinesQuery({
      searchValue: "",
      pageValue: "",
      limitValue: "",
      sortPrice: "",
      stockValue: "",
      company: "",
      group: "",
    });

  const outOfStockCount = medicines?.data
    ?.filter((medicine) => medicine.stock === 0)
    .reduce((acc) => acc + 1, 0);

  const { data: groups, isLoading: groupLoading } = useGetAllGroupsQuery({
    searchValue: "",
    pageValue: "",
    limitValue: "",
  });

  const { data: companies, isLoading: companyLoading } =
    useGetAllCompaniesQuery({
      searchValue: "",
      pageValue: "",
      limitValue: "",
    });

  const { data: dosageForms, isLoading: dosageLoading } =
    useGetAllDosageFormsQuery({
      searchValue: "",
      pageValue: "",
      limitValue: "",
    });
  return (
    <div className="py-6 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <DashboardBox
        borderColor={"border-sky-300"}
        backGroundColor={"bg-sky-200"}
        logo={<MdOutlineEventAvailable />}
        logoColor={"text-sky-600"}
        link={"medicine-details"}
        quantity={medicineLoading ? "Loading..." : medicines?.data_found}
        title={"Medicine Available"}
      />
      <DashboardBox
        borderColor={"border-red-300"}
        backGroundColor={"bg-red-200"}
        logo={<CgUnavailable />}
        logoColor={"text-red-600"}
        link={"medicine-details"}
        quantity={outOfStockCount}
        title={"Medicine Shortage"}
      />
      <DashboardBox
        borderColor={"border-green-300"}
        backGroundColor={"bg-green-200"}
        logo={<MdGroups2 />}
        logoColor={"text-green-600"}
        link={"groups"}
        quantity={groupLoading ? "Loading..." : groups?.data_found}
        title={"Group Available"}
      />
      <DashboardBox
        borderColor={"border-rose-600"}
        backGroundColor={"bg-rose-300"}
        logo={<GiOverdose />}
        logoColor={"text-rose-900"}
        link={"dosage-forms"}
        quantity={dosageLoading ? "Loading..." : dosageForms?.data_found}
        title={"Available Dosage forms"}
      />
      <DashboardBox
        borderColor={"border-lime-600"}
        backGroundColor={"bg-lime-300"}
        logo={<BsBuildingsFill />}
        logoColor={"text-lime-900"}
        link={"companies"}
        quantity={companyLoading ? "Loading..." : companies?.data_found}
        title={"Available Companies"}
      />
    </div>
  );
};

export default Dashboard;
