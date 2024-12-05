import { useState } from "react";
import { useGetAllCompaniesQuery } from "../../../redux/features/companyApi/companyApi";
import { useGetAllDosageFormsQuery } from "../../../redux/features/dosageForm/dosageFormApi";
import { useGetAllGroupsQuery } from "../../../redux/features/groupApi/groupApi";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading";
import AddButton from "../../AddButton/AddButton";
import Modal from "../../Modal/Modal";
import { useAddNewMedicineMutation } from "../../../redux/features/medicineApi/medicineApi";
import { toast } from "sonner";

const AddNewMedicine = () => {
  const { data: groups, isLoading: groupLoading } = useGetAllGroupsQuery({
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
  const { data: companies, isLoading: companyLoading } =
    useGetAllCompaniesQuery({
      searchValue: "",
      pageValue: "",
      limitValue: "",
    });

  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    medicine_name: "",
    group: "",
    company_name: "",
    dosage_form: "",
    strength: "",
    purchase_price: "",
    sell_price: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() === "") {
      setErrorMessage(
        `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      );
    } else {
      setErrorMessage("");
    }
  };

  const [addNewMedicine, { isLoading: addLoading }] =
    useAddNewMedicineMutation();

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const data = {
      medicine_name: formData?.medicine_name,
      group: formData?.group,
      company: formData?.company_name,
      dosage_form: formData?.dosage_form,
      strength: formData?.strength,
      purchase_price: formData?.purchase_price,
      sell_price: formData?.sell_price,
      category: formData?.category,
    };

    try {
      const res = await addNewMedicine(data).unwrap();
      if (res?.success) {
        setIsOpen(false);
        setFormData({
          medicine_name: "",
          group: "",
          company_name: "",
          dosage_form: "",
          strength: "",
          purchase_price: "",
          sell_price: "",
          category: "",
        });
        toast.success(res?.message || res?.data?.message);
      }
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };

  const isLoading =
    groupLoading || dosageLoading || companyLoading || addLoading;

  return (
    <>
      <div className="flex items-end justify-end">
        <AddButton
          text={"Add New Medicine"}
          onclick={() => setIsOpen(!isOpen)}
        />
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-md"}>
        <form onSubmit={handleAddMedicine}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="medicine_title">
              Medicine Title
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              disabled
              placeholder={
                formData?.dosage_form +
                " " +
                formData?.medicine_name +
                " " +
                formData?.strength
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="medicine_name">
              Medicine Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="medicine_name"
              value={formData.medicine_name}
              onChange={handleChange}
              placeholder="Medicine name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="group">
              Group/Generic
            </label>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="">
                {groupLoading ? "Please wait..." : "Select Group/Generic"}
              </option>
              {groups?.data?.map((group) => (
                <option key={group?._id} value={group.group_title}>
                  {group?.group_title}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="company">
              Company/Supplier
            </label>
            <select
              name="company_name"
              value={formData?.company_name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="">
                {companyLoading ? "Please wait..." : "Select a Company"}
              </option>
              {companies?.data?.map((company) => (
                <option key={company?._id} value={company?.company_name}>
                  {company?.company_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="dosage_form">
              Dosage Form
            </label>
            <select
              name="dosage_form"
              value={formData.dosage_form}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="">
                {dosageLoading ? "Please wait..." : "Select a Dosage Form"}
              </option>
              {dosageForms?.data?.map((dosageForm) => (
                <option key={dosageForm?._id} value={dosageForm?.dosage_form}>
                  {dosageForm?.dosage_form}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="strength">
              Strength/Weight
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="strength"
              value={formData.strength}
              onChange={handleChange}
              placeholder="200mg, 20mg, 50mcg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="purchase_price">
              Purchase Price
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="purchase_price"
              value={formData.purchase_price}
              onChange={handleChange}
              placeholder="Purchase Price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="sell_price">
              Sell Price
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="sell_price"
              value={formData.sell_price}
              onChange={handleChange}
              placeholder="Sell Price"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded mt-1"
            >
              <option value="">Select Category</option>
              <option value="medicine">Medicine</option>
              <option value="other">Other</option>
            </select>
          </div>

          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={
              !formData?.medicine_name ||
              !formData?.group ||
              !formData?.company_name ||
              !formData?.dosage_form ||
              !formData?.strength ||
              !formData?.purchase_price ||
              !formData?.sell_price ||
              isLoading
            }
            type="submit"
            className="w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF]"
          >
            {isLoading ? <PrimaryLoading /> : "ADD"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddNewMedicine;
