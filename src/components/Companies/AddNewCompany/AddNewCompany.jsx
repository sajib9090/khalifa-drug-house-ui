import { useState } from "react";
import { useAddNewCompanyMutation } from "../../../redux/features/companyApi/companyApi";
import { toast } from "sonner";
import AddButton from "../../AddButton/AddButton";
import Modal from "../../Modal/Modal";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../../Loading/PrimaryLoading";

const AddNewCompany = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    company_name: "",
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

  const [addNewCompany, { isLoading }] = useAddNewCompanyMutation();

  const handleAddGroup = async (e) => {
    e.preventDefault();
    const data = {
      company_name: formData?.company_name,
    };
    setErrorMessage("");
    try {
      const res = await addNewCompany(data).unwrap();
      toast.success(res?.message || res?.data?.message);
      setIsOpen(false);
      setFormData({ dosageForm: "" });
    } catch (error) {
      setErrorMessage(error?.data?.message || error?.message);
    }
  };
  return (
    <>
      <div className="flex items-end justify-end">
        <AddButton
          text={"Add New Company"}
          onclick={() => setIsOpen(!isOpen)}
        />
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-md"}>
        <form onSubmit={handleAddGroup}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Company Name
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="square pharmaceuticals"
            />
          </div>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={formData?.company_name?.length == 0 || isLoading}
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

export default AddNewCompany;
