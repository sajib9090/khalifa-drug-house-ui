import { useDispatch, useSelector } from "react-redux";
import {
  removeSingleItem,
  selectedItems,
} from "../../../redux/features/purchase/purchaseSlice";
import { useState } from "react";
import CurrencyFormatter from "../../CurrencyFormatter/CurrencyFormatter";
import Modal from "../../Modal/Modal";
import { toast } from "sonner";

const PurchaseTable = () => {
  const items = useSelector(selectedItems);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // State for discount and subtotal calculations
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Calculate total price
  const total = items.reduce(
    (sum, item) => sum + item?.purchase_price * item?.p_quantity,
    0
  );

  // Calculate discount amount based on percentage
  const calculatedDiscountAmount = (total * discountPercent) / 100;

  // Total discount amount (percentage-based + fixed discount)
  const totalDiscount = calculatedDiscountAmount + discountAmount;

  // Subtotal after applying discount
  const subtotal = total - totalDiscount;

  // Validation: Prevent negative discount percentage
  const handleDiscountPercentChange = (e) => {
    const value = Number(e.target.value);
    setDiscountPercent(value >= 0 ? value : 0);
  };

  // Validation: Prevent negative discount amount
  const handleDiscountAmountChange = (e) => {
    const value = Number(e.target.value);
    setDiscountAmount(value >= 0 ? value : 0);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsOpen(true);
  };

  const dispatch = useDispatch();
  const handleRemoveConfirm = () => {
    if (selectedId) {
      dispatch(removeSingleItem({ id: selectedId }));
      setIsOpen(false);
      toast.success("Item removed successfully");
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Purchase Items</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">No</th>
                <th className="px-4 py-2 border text-start">Title</th>
                <th className="px-4 py-2 border text-start">Company</th>
                <th className="px-4 py-2 border text-end">Quantity(pc)</th>
                <th className="px-4 py-2 border text-end">Stock(pc)</th>
                <th className="px-4 py-2 border text-end">P Price</th>
                <th className="px-4 py-2 border text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={item?._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border text-start">
                      {item?.medicine_title?.length > 100
                        ? item?.medicine_title?.slice(0, 100) + "..."
                        : item?.medicine_title}
                    </td>
                    <td className="px-4 py-2 border text-start">
                      {item?.company?.length > 10
                        ? item?.company?.slice(0, 10) + "..."
                        : item?.company}
                    </td>
                    <td className="px-4 py-2 border text-end">
                      {item?.p_quantity}
                    </td>
                    <td className="px-4 py-2 border text-end text-green-600">
                      {item?.stock}
                    </td>
                    <td className="px-4 py-2 border text-end">
                      <CurrencyFormatter value={item?.purchase_price} />
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-2 border text-center text-gray-500"
                  >
                    No items selected
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Overview Section */}
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Total:</span>
            <span>
              <CurrencyFormatter value={total} />
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium" htmlFor="discountPercent">
              Discount (%):
            </label>
            <input
              id="discountPercent"
              type="number"
              value={discountPercent}
              onChange={handleDiscountPercentChange}
              className="border border-gray-300 p-1 rounded w-20 text-end"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-medium" htmlFor="discountAmount">
              Discount (Amount):
            </label>
            <input
              id="discountAmount"
              type="number"
              value={discountAmount}
              onChange={handleDiscountAmountChange}
              className="border border-gray-300 p-1 rounded w-20 text-end"
            />
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Total Discount:</span>
            <span>
              <CurrencyFormatter value={totalDiscount} />
            </span>
          </div>
          <div className="flex justify-between items-center font-bold">
            <span>Subtotal:</span>
            <span>
              <CurrencyFormatter value={subtotal} />
            </span>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-[200px]"}>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Are you sure?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleRemoveConfirm}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Yes
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
    </>
  );
};

export default PurchaseTable;
