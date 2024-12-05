/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { removeSingleItem } from "../../../redux/features/sellApi/SellSlice";
import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "sonner";

const SellTable = ({ cart }) => {
  const dispatch = useDispatch();



  const handleRemove = (id) => {
    dispatch(removeSingleItem({ id: id }));
    toast.success("Item removed successfully");
  };

  return (
    <>
      {cart?.length > 0 && (
        <div className="sell-table-container">
          <h1 className="text-xl font-bold mb-4">Sell Table</h1>
          <div className="overflow-auto h-[50vh]">
            {" "}
            {/* Scrollable container */}
            <table className="min-w-full border-collapse border border-gray-300 bg-rose-50">
              <thead>
                <tr className="bg-gray-100 text-[13px]">
                  <th className="border border-gray-200 px-4 py-2 text-center">
                    #
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Title
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    P Price
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    S Price
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    Qty
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-right">
                    Total
                  </th>
                  <th className="border border-gray-200 px-2 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {cart?.length > 0 ? (
                  cart?.map((item, i) => (
                    <tr key={item?._id} className="hover:bg-blue-50 text-sm">
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {i + 1}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        {item?.medicine_title}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-right text-red-200">
                        <CurrencyFormatter value={item?.purchase_price} />
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-right text-green-700">
                        <CurrencyFormatter value={item?.sell_price} />
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-right">
                        {item?.s_quantity}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-right">
                        <CurrencyFormatter
                          value={item?.sell_price * item?.s_quantity}
                        />
                      </td>
                      <td className="border border-gray-200 px-1">
                        <RiDeleteBin6Fill
                          onClick={() => handleRemove(item?._id)}
                          className="text-xl text-red-600 mx-auto cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default SellTable;
