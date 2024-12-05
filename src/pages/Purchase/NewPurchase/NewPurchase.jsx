import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGetAllMedicinesQuery } from "../../../redux/features/medicineApi/medicineApi";
import CurrencyFormatter from "../../../components/CurrencyFormatter/CurrencyFormatter";
import { useDispatch } from "react-redux";
import { addPurchaseLog } from "../../../redux/features/purchase/purchaseSlice";
import PurchaseTable from "../../../components/Purchase/PurchaseTable/PurchaseTable";

const NewPurchase = () => {
  const searchInputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");

  const { data: medicines, isLoading } = useGetAllMedicinesQuery(
    {
      searchValue: searchValue,
      pageValue: "",
      limitValue: "",
      sortPrice: "",
      stockValue: "",
      company: "",
      group: "",
      category: "",
    },
    { skip: !searchValue }
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (!medicines?.data) return;

      const resultsLength = medicines?.data?.length;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % resultsLength);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + resultsLength) % resultsLength);
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (selectedItem && quantity) {
          console.log("Selected Item:", selectedItem, "Quantity:", quantity);
          setSelectedItem(null);
          setQuantity("");
        } else if (activeIndex >= 0) {
          const selected = medicines.data[activeIndex];
          setSelectedItem(selected);
        }
      }
    },
    [medicines, activeIndex, selectedItem, quantity]
  );

  const dispatch = useDispatch();

  const handleQuantityKeyPress = (event) => {
    if (event.key === "Enter" && quantity) {
      setSelectedItem(null);
      setQuantity("");
      setSearchValue("");

      let p_quantity = parseInt(quantity);

      const modifiedItem = { ...selectedItem, p_quantity };

      dispatch(addPurchaseLog(modifiedItem));

      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  const handleClick = (item) => {
    setSelectedItem(item);
    setQuantity("");
  };

  useEffect(() => {
    const inputElement = searchInputRef.current;

    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [handleKeyDown]);

  return (
    <div className="px-4 py-6">
      <div className="text-[18px] font-bold capitalize">
        <Link to={"/purchase"} className="text-gray-400">
          Purchase {">"}{" "}
        </Link>
        <Link to={"/purchase/purchase-details/new-purchase"}>New Purchase</Link>
      </div>

      <div className="w-full min-h-[70vh] border border-gray-200 rounded mt-4 bg-slate-50 p-2">
        <div className="search1 mt-4">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={searchInputRef}
            className="rounded"
            type="search"
            placeholder="Search Anything..."
          />
        </div>

        {!isLoading && medicines?.data && searchValue && (
          <div className="mt-4 bg-white border border-gray-300 rounded p-2 shadow-lg overflow-x-auto">
            {medicines?.data?.length > 0 ? (
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border text-start">
                      Medicine Title
                    </th>
                    <th className="px-4 py-2 border text-end">Stock</th>
                    <th className="px-4 py-2 border text-end">Purchase P</th>
                    <th className="px-4 py-2 border text-end">Sell P</th>
                    <th className="px-4 py-2 border text-start">Company</th>
                    <th className="px-4 py-2 border text-start">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines?.data?.map((medicine, index) => (
                    <tr
                      key={medicine?._id}
                      onClick={() => handleClick(medicine)}
                      className={`hover:bg-gray-50 cursor-pointer ${
                        activeIndex === index
                          ? "bg-blue-100 hover:bg-blue-100"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-2 border">
                        {medicine?.medicine_title}
                      </td>
                      <td className="px-4 py-2 border text-end">
                        {medicine?.stock}
                      </td>
                      <td className="px-4 py-2 border text-end">
                        <CurrencyFormatter value={medicine?.purchase_price} />
                      </td>
                      <td className="px-4 py-2 border text-end">
                        <CurrencyFormatter value={medicine?.sell_price} />
                      </td>
                      <td className="px-4 py-2 border text-start">
                        {medicine?.company?.length > 10
                          ? medicine?.company?.slice(0, 10) + "..."
                          : medicine?.company}
                      </td>
                      <td className="px-4 py-2 border text-start">
                        {selectedItem?._id === medicine?._id ? (
                          <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            onKeyPress={handleQuantityKeyPress}
                            className="border border-gray-300 rounded w-16"
                            placeholder="Enter quantity"
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={() => handleClick(medicine)}
                            className="text-blue-500 hover:underline w-16"
                          >
                            Select
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No results found</p>
            )}
          </div>
        )}
        <PurchaseTable />
      </div>
    </div>
  );
};

export default NewPurchase;
