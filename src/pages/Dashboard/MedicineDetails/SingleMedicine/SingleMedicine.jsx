import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleMedicineByIdQuery } from "../../../../redux/features/medicineApi/medicineApi";
import { FaBox, FaTags, FaCalendarAlt } from "react-icons/fa";
import FullPageLoader from "../../../../components/Loading/FullPageLoader";

const SingleMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetSingleMedicineByIdQuery(
    { id: id },
    { skip: !id }
  );

  if (isLoading) return <FullPageLoader />;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Error loading medicine details!
      </p>
    );

  const medicine = data?.data;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-[#009099] mb-2 text-center capitalize">
          {medicine?.medicine_name}
        </h1>
        <p className="text-gray-500 text-center mb-6 italic">
          {medicine?.medicine_title}
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaBox className="text-[#009099] mr-2" />
              <span className="font-medium">Category:</span>
            </span>
            <span className="font-semibold capitalize">{medicine?.category}</span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaTags className="text-[#009099] mr-2" />
              <span className="font-medium">Company:</span>
            </span>
            <span className="font-semibold capitalize">
              {medicine?.company}
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaTags className="text-[#009099] mr-2" />
              <span className="font-medium">Group:</span>
            </span>
            <span className="font-semibold">{medicine?.group}</span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaTags className="text-[#009099] mr-2" />
              <span className="font-medium">Dosage Form:</span>
            </span>
            <span className="font-semibold">{medicine?.dosage_form}</span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaTags className="text-[#009099] mr-2" />
              <span className="font-medium">Strength:</span>
            </span>
            <span className="font-semibold">{medicine?.strength}</span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaBox className="text-[#009099] mr-2" />
              <span className="font-medium">Stock:</span>
            </span>
            <span
              className={`font-bold ${
                medicine?.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {medicine?.stock} Units
            </span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaTags className="text-[#009099] mr-2" />
              <span className="font-medium">Purchase Price:</span>
            </span>
            <span className="font-semibold">৳{medicine?.purchase_price}</span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaTags className="text-[#009099] mr-2" />
              <span className="font-medium">Sell Price:</span>
            </span>
            <span className="font-semibold">৳{medicine?.sell_price}</span>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span className="flex items-center">
              <FaCalendarAlt className="text-[#009099] mr-2" />
              <span className="font-medium">Created At:</span>
            </span>
            <span className="font-semibold">
              {new Date(medicine?.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-[#009099] text-white rounded-lg font-medium hover:bg-opacity-65 shadow-md transition"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleMedicine;
