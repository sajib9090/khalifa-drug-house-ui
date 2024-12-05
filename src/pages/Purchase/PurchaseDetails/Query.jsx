import { Link, useLocation } from "react-router-dom";
import AddButton from "../../../components/AddButton/AddButton";

const Query = () => {
  const location = useLocation();
  const date = location?.search?.split("=")[1];
  console.log(date);
  return (
    <div className="px-4 py-6">
      <Link to={'new-purchase'}>
        <AddButton text={"New Purchase"} />
      </Link>
    </div>
  );
};

export default Query;
