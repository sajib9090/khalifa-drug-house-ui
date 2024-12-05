import { useState } from "react";
import { useAddNewDosageFormMutation } from "../../redux/features/dosageForm/dosageFormApi";
import { toast } from "sonner";
import AddButton from "../AddButton/AddButton";
import Modal from "../Modal/Modal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import PrimaryLoading from "../Loading/PrimaryLoading";

const AddNewDosageForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    dosageForm: "",
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

  const [addNewDosageForm, { isLoading }] = useAddNewDosageFormMutation();

  const handleAddDosageForm = async (e) => {
    e.preventDefault();
    const data = {
      dosage_form: formData?.dosageForm,
    };
    setErrorMessage("");
    try {
      const res = await addNewDosageForm(data).unwrap();
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
          text={"Add New Dosage Form"}
          onclick={() => setIsOpen(!isOpen)}
        />
      </div>

      <Modal setIsOpen={setIsOpen} isOpen={isOpen} maxW={"max-w-md"}>
        <form onSubmit={handleAddDosageForm}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">
              Dosage Form
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded mt-1"
              type="text"
              name="dosageForm"
              value={formData.dosageForm}
              onChange={handleChange}
              placeholder="tab cap tablet capsule"
            />
          </div>
          {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
          <button
            disabled={formData?.dosageForm?.length == 0 || isLoading}
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

export default AddNewDosageForm;
