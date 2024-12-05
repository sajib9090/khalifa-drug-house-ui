import { useState } from "react";
import AddNewCompany from "../../../components/Companies/AddNewCompany/AddNewCompany";
import {
  useGetAllCompaniesQuery,
  useRemoveCompanyMutation,
} from "../../../redux/features/companyApi/companyApi";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Modal from "../../../components/Modal/Modal";

const Companies = () => {
  const [resultPerPage, setResultPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const { data: companies, isLoading } = useGetAllCompaniesQuery({
    searchValue: searchValue,
    pageValue: page,
    limitValue: resultPerPage,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleRemove = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const [removeCompany, { isLoading: deleteLoading }] =
    useRemoveCompanyMutation();
  const handleRemoveConfirm = async () => {
    if (selectedId) {
      try {
        const res = await removeCompany(selectedId).unwrap();
        if (res?.success) {
          setIsOpen(false);
          setSelectedId(null);
          toast.success(res?.message || "Deleted successfully");
        }
      } catch (error) {
        toast.error(error?.data?.message || error?.message);
      }
    }
  };
  return (
    <div className="py-6 px-4">
      <AddNewCompany />

      <div className="pl-6 pt-2">
        <div className="flex justify-between">
          <div>
            <div className="text-[18px] font-bold capitalize">
              <Link to={"/dashboard"} className="text-gray-400">
                Dashboard {">"}{" "}
              </Link>
              <Link to={"/dashboard/companies"}>
                Companies ({companies?.data_found})
              </Link>
            </div>
            <p className="text-[14px] capitalize">list of Companies</p>
          </div>
        </div>

        <div className="search mt-4">
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setPage(1);
            }}
            className="rounded"
            type="search"
            placeholder="Search Companies..."
          />
        </div>

        <>
          <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative overflow-x-auto">
            {/* table */}
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px] sm:text-[16px]">
                  <th className="w-[10%] text-start pl-4">No.</th>
                  <th className="w-[70%] text-start">Company</th>
                  <th className="w-[20%] text-start">Action</th>
                </tr>
              </thead>
              <tbody>
                {companies?.data?.map((d, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#ebebeb] h-[40px] w-full text-[14px] sm:text-[16px]"
                  >
                    <td className="pl-4 py-2">
                      {i + 1 + (page - 1) * resultPerPage}
                    </td>
                    <td className="capitalize">{d?.company_name}</td>
                    <td>
                      <button
                        disabled={deleteLoading || isLoading}
                        onClick={() => handleRemove(d?._id)}
                        className="flex items-center text-[12px] sm:text-[14px] text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isLoading && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 sm:left-[50%]">
                <PrimaryLoading message="Please wait..." />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 mb-4">
            <div>
              <label>Result Per Page :</label>
              <select
                disabled={companies?.data_found <= 10}
                value={resultPerPage}
                onChange={(e) => {
                  setResultPerPage(e.target.value);
                  setPage(1);
                }}
                className="h-[27px] w-[80px] border border-gray-300 rounded ml-2"
              >
                {Array.from({ length: 10 }).map((a, i) => (
                  <option key={i} value={i * 10 + 10}>
                    {i * 10 + 10}
                  </option>
                ))}
              </select>
            </div>
            {/* pagination */}
            <div className="flex items-center">
              <button
                onClick={() => setPage(page - 1)}
                disabled={
                  companies?.pagination?.previousPage == null || isLoading
                }
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  companies?.pagination?.previousPage != null
                    ? "border border-gray-300 text-black"
                    : "border border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
              >
                <MdKeyboardArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center px-4">
                <p className="mr-2">Page</p>
                <select
                  value={page}
                  onChange={(e) => {
                    setPage(e.target.value);
                    setResultPerPage(resultPerPage);
                  }}
                  className="w-[40px]"
                >
                  {Array.from({
                    length: companies?.pagination?.totalPages,
                  }).map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setPage(page + 1)}
                disabled={companies?.pagination?.nextPage == null || isLoading}
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  companies?.pagination?.nextPage != null
                    ? "border border-gray-300 text-black"
                    : "border border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
              >
                <MdKeyboardArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-[200px]"}>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Are you sure?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRemoveConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              {deleteLoading ? <PrimaryLoading /> : "Yes"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Companies;
