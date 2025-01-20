import { Link, useLocation } from "react-router-dom";
import AddButton from "../../../components/AddButton/AddButton";
import { useGetAllPurchaseInvoicesByDateQuery } from "../../../redux/features/purchase/purchaseApi";

const Query = () => {
  const location = useLocation();
  const date = location?.search?.split("=")[1];
  const { data, error, isLoading } = useGetAllPurchaseInvoicesByDateQuery({
    date: date,
    month: "",
    start_date: "",
    end_date: "",
  });
  console.log(data);
  return (
    <div className="px-4 py-6">
      <Link to={"new-purchase"}>
        <AddButton text={"New Purchase"} />
      </Link>
    </div>
  );
};

export default Query;
