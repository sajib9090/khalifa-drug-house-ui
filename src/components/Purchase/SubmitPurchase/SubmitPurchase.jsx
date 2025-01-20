import { useState } from "react";
import Modal from "../../Modal/Modal";
import { useCreatePurchaseMutation } from "../../../redux/features/purchase/purchaseApi";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAllPurchaseItems } from "../../../redux/features/purchase/purchaseSlice";

/* eslint-disable react/prop-types */
const SubmitPurchase = ({ purchaseItems, totalDiscount, total, subtotal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createPurchase, { isLoading }] = useCreatePurchaseMutation();
  const handleConfirm = async () => {
    const data = {
      total_discount: totalDiscount,
      sub_total_bill: total,
      final_bill: subtotal,
      items: purchaseItems,
    };

    try {
      const res = await createPurchase(data).unwrap();
      if (res?.success) {
        dispatch(removeAllPurchaseItems());
        navigate(`/purchase/${res?.data}`);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error submitting purchase:", error);
    }
  };

  return (
    <>
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
          aria-label="Submit purchase"
        >
          Submit Purchase
        </button>
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} maxW={"max-w-sm"}>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Confirm Purchase</h2>
          <p>Are you sure you want to submit this purchase?</p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isLoading ? <PrimaryLoading /> : "Confirm"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SubmitPurchase;
