import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CurrencyFormatter from "../../components/CurrencyFormatter/CurrencyFormatter";
import {
  addSellLog,
  selectedItems,
} from "../../redux/features/sellApi/SellSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllMedicinesQuery } from "../../redux/features/medicineApi/medicineApi";
import SellTable from "../../components/Sell/SellTable/SellTable";
import { toast } from "sonner";
import Sidebar from "../../components/Sell/Sidebar/Sidebar";

const Sell = () => {
  const searchInputRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState("");

  const cart = useSelector(selectedItems);

  const { data, isFetching } = useGetAllMedicinesQuery(
    {
      searchValue: "",
      pageValue: "",
      limitValue: "",
      sortPrice: "",
      stockValue: "",
      company: "",
      group: "",
      category: "",
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Memoize filteredData to prevent unnecessary re-calculations
  const filteredData = useMemo(
    () =>
      data?.data?.filter((medicine) =>
        medicine?.medicine_name
          ?.toLowerCase()
          ?.includes(searchValue.trim().toLowerCase())
      ) || [],
    [data, searchValue]
  );


  const handleKeyDown = useCallback(
    (event) => {
      if (!filteredData) return;

      const resultsLength = filteredData.length;

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
          const selected = filteredData[activeIndex];
          setSelectedItem(selected);
        }
      }
    },
    [filteredData, activeIndex, selectedItem, quantity]
  );

  const dispatch = useDispatch();
  const handleQuantityKeyPress = (event) => {
    if (event.key === "Enter" && quantity) {
      let s_quantity = parseInt(quantity);
      if (selectedItem?.stock < s_quantity) {
        const audio = new Audio("../../../public/error-10-206498.mp3");
        audio.play();
        searchInputRef.current.focus();
        toast.error("Stock is insufficient for the selected quantity!");
        setSelectedItem(null);
        setQuantity("");
        return;
      }

      setSelectedItem(null);
      setQuantity("");
      setSearchValue("");

      const modifiedItem = { ...selectedItem, s_quantity };

      dispatch(addSellLog(modifiedItem));

      searchInputRef.current.focus();
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
    <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-2">
      {/* Sidebar */}
      <Sidebar cart={cart} />

      {/* Main Content */}
      <div className="w-full min-h-[75vh] border border-gray-200 rounded mt-4 bg-slate-50 p-4 col-span-1 md:col-span-10">
        {/* Search Bar */}
        <div className="search1 mb-4">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            ref={searchInputRef}
            className="rounded border px-4 py-2 w-full md:w-1/2"
            type="search"
            placeholder="Search by Medicine Name..."
          />
        </div>

        {/* Table Section */}
        {isFetching ? (
          <p className="text-gray-500">Loading...</p>
        ) : searchValue && filteredData.length > 0 ? (
          <div className="relative">
            <div className="overflow-x-auto absolute left-0 top-0 right-0 bg-white">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Title
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Group
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Company
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      P Price
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      S Price
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      Stock
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((medicine, index) => (
                    <tr
                      key={medicine.id}
                      onClick={() => handleClick(medicine)}
                      className={` cursor-pointer text-[13px] hover:bg-gray-100 ${
                        activeIndex === index
                          ? "bg-blue-100 hover:bg-blue-100"
                          : ""
                      }`}
                    >
                      <td className="border border-gray-300 px-4 py-2">
                        {medicine?.medicine_title}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {medicine?.group}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {medicine?.company}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        <CurrencyFormatter value={medicine?.purchase_price} />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        <CurrencyFormatter value={medicine?.sell_price} />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-right">
                        {medicine?.stock}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
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
            </div>
          </div>
        ) : null}

        <SellTable cart={cart} />
      </div>
    </div>
  );
};

export default Sell;
