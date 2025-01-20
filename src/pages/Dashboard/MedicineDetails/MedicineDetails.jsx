import { useState } from "react";
import AddNewMedicine from "../../../components/MedicineDetails/AddNewMedicine/AddNewMedicine";
import { useGetAllMedicinesQuery } from "../../../redux/features/medicineApi/medicineApi";
import { Link, useNavigate } from "react-router-dom";
import PrimaryLoading from "../../../components/Loading/PrimaryLoading";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CurrencyFormatter from "../../../components/CurrencyFormatter/CurrencyFormatter";
import { CiFilter } from "react-icons/ci";
import DeleteMedicine from "../../../components/MedicineDetails/DeleteMedicine/DeleteMedicine";

const MedicineDetails = () => {
  const [resultPerPage, setResultPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [stockValue, setStockValue] = useState("");
  const [groupValue, setGroupValue] = useState("");
  const [companyValue, setCompanyValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const navigate = useNavigate();

  const { data: medicines, isLoading } = useGetAllMedicinesQuery({
    searchValue: searchValue,
    pageValue: page,
    limitValue: resultPerPage,
    sortPrice: priceValue,
    stockValue: stockValue,
    company: companyValue,
    group: groupValue,
    category: categoryValue,
  });

  const companies = Array.from(
    new Set(
      medicines?.data?.map((medicine) => medicine?.company)?.filter(Boolean)
    )
  );
  const groups = Array.from(
    new Set(
      medicines?.data?.map((medicine) => medicine?.group)?.filter(Boolean)
    )
  );
  const categories = Array.from(
    new Set(
      medicines?.data?.map((medicine) => medicine?.category)?.filter(Boolean)
    )
  );

  return (
    <div className="py-6 px-4">
      <AddNewMedicine />
      <div className="pl-6 pt-2">
        <div className="flex justify-between">
          <div>
            <div className="text-[18px] font-bold capitalize">
              <Link to={"/dashboard"} className="text-gray-400">
                Dashboard {">"}{" "}
              </Link>
              <Link to={"/dashboard/medicine-details"}>
                Medicine ({medicines?.data_found})
              </Link>
            </div>
            <p className="text-[14px] capitalize">list of Medicines</p>
          </div>
        </div>

        <div className="pt-6 pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-2">
          <div className="selectOp flex items-center ">
            <CiFilter className="h-6 w-6 mr-2" />
            <select
              value={stockValue}
              onChange={(e) => {
                setStockValue(e.target.value);
                setCompanyValue("");
                setGroupValue("");
                setPriceValue("");
                setSearchValue("");
              }}
              name=""
              className="rounded"
            >
              <option value="" selected disabled>
                Filter with Stock Left
              </option>
              <option value="high">High To Low</option>
              <option value="low">Low To High</option>
            </select>
          </div>
          <div className="selectOp flex items-center ">
            <CiFilter className="h-6 w-6 mr-2" />
            <select
              value={priceValue}
              onChange={(e) => {
                setPriceValue(e.target.value);
                setCompanyValue("");
                setGroupValue("");
                setStockValue("");
                setSearchValue("");
              }}
              name=""
              className="rounded"
            >
              <option value="" selected disabled>
                Filter with Price
              </option>
              <option value="high">High To Low</option>
              <option value="low">Low To High</option>
            </select>
          </div>
          <div className="selectOp flex items-center ">
            <CiFilter className="h-6 w-6 mr-2" />
            <select
              value={groupValue}
              onChange={(e) => {
                setGroupValue(e.target.value);
                setCompanyValue("");
                setPriceValue("");
                setStockValue("");
                setSearchValue("");
              }}
              name=""
              className="rounded"
            >
              <option value="">
                {isLoading ? "Please wait..." : "Filter with Group/Generic"}
              </option>
              {groups?.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>
          <div className="selectOp flex items-center ">
            <CiFilter className="h-6 w-6 mr-2" />
            <select
              value={companyValue}
              onChange={(e) => {
                setCompanyValue(e.target.value);
                setStockValue("");
                setPriceValue("");
                setGroupValue("");
                setSearchValue("");
              }}
              name=""
              className="rounded"
            >
              <option value="">
                {isLoading ? "Please wait..." : "Filter with Company"}
              </option>
              {companies?.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>
          <div className="selectOp flex items-center ">
            <CiFilter className="h-6 w-6 mr-2" />
            <select
              value={categoryValue}
              onChange={(e) => {
                setCategoryValue(e.target.value);
                setCompanyValue("");
                setStockValue("");
                setPriceValue("");
                setGroupValue("");
                setSearchValue("");
              }}
              name=""
              className="rounded"
            >
              <option value="">
                {isLoading ? "Please wait..." : "Filter with Category"}
              </option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {priceValue ||
        searchValue ||
        stockValue ||
        companyValue ||
        categoryValue ||
        groupValue ? (
          <div className="mt-2 flex items-center justify-end">
            <button
              onClick={() => {
                setSearchValue("");
                setPriceValue("");
                setCompanyValue("");
                setGroupValue("");
                setStockValue("");
                setCategoryValue("");
              }}
              className="flex items-center justify-center text-red-600 underline"
              title="reset filter"
            >
              <CiFilter className="h-6 w-6 mr-1" /> Reset filter
            </button>
          </div>
        ) : null}

        <div className="search mt-4">
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setPage(1);
            }}
            className="rounded"
            type="search"
            placeholder="Search Medicine..."
          />
        </div>

        <>
          <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative overflow-x-auto">
            {/* table */}
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[12px] sm:text-[14px]">
                  <th className="w-[2%] text-start pl-4">No.</th>
                  <th className="w-[25%] text-start">Title</th>
                  <th className="w-[15%] text-start">Generic</th>
                  <th className="w-[10%] text-start">Supplier</th>
                  <th className="w-[10%] text-start">Purchase Price</th>
                  <th className="w-[10%] text-start">Sell Price</th>
                  <th className="w-[5%] text-start">Stock</th>
                  <th className="w-[5%] text-start">Action</th>
                </tr>
              </thead>
              <tbody>
                {medicines?.data?.map((d, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#ebebeb] min-h-[40px] w-full sm:text-[16px] hover:underline cursor-pointer"
                  >
                    <td className="pl-4 py-2 text-[12px]">
                      {i + 1 + (page - 1) * resultPerPage}
                    </td>
                    <td
                      onClick={() => navigate(d?._id)}
                      className="capitalize text-[12px]"
                      title={d?.medicine_title}
                    >
                      {d?.medicine_title?.length > 40
                        ? d?.medicine_title.slice(0, 40) + "..."
                        : d?.medicine_title}
                    </td>
                    <td className="capitalize text-[12px]">
                      {d?.group?.length > 20
                        ? d?.group.slice(0, 20) + "..."
                        : d?.group}
                    </td>
                    <td className="capitalize text-[12px]">
                      {" "}
                      {d?.company?.length > 15
                        ? d?.company.slice(0, 15) + "..."
                        : d?.company}
                    </td>
                    <td className="capitalize text-[12px] text-red-600">
                      <CurrencyFormatter value={d?.purchase_price} />
                    </td>
                    <td className="capitalize text-[12px]">
                      <CurrencyFormatter value={d?.sell_price} />
                    </td>
                    <td className="capitalize text-[12px]">{d?.stock}</td>
                    <td>
                      <DeleteMedicine id={d?._id} isLoading={isLoading} />
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
                value={resultPerPage}
                disabled={medicines?.data_found <= 10}
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
                  medicines?.pagination?.previousPage == null || isLoading
                }
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  medicines?.pagination?.previousPage != null
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
                    length: medicines?.pagination?.totalPages,
                  }).map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setPage(page + 1)}
                disabled={medicines?.pagination?.nextPage == null || isLoading}
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  medicines?.pagination?.nextPage != null
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
      <div className="flex flex-col items-end justify-center py-2">
        <div className="bg-gray-100 p-3 rounded-md shadow w-full max-w-xs sm:max-w-sm">
          <h1 className="text-lg font-medium text-center text-gray-700 mb-3">
            Stock Value Summary
          </h1>
          <div className="flex justify-between items-center py-1 border-b border-gray-200">
            <p className="text-sm text-gray-600">Total Purchase Value:</p>
            <CurrencyFormatter value={medicines?.total_purchase_value} />
          </div>
          <div className="flex justify-between items-center py-1">
            <p className="text-sm text-gray-600">Total Sell Value:</p>
            <CurrencyFormatter value={medicines?.total_sales_value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
