import { useParams } from "react-router-dom";
import { useGetSingleInvoiceByIdQuery } from "../../redux/features/sellApi/SellApi";

const SingleInvoice = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleInvoiceByIdQuery(
    { id },
    { skip: !id }
  );

  console.log(data);
  return (
    <div>
      <h1>single invoice</h1>
    </div>
  );
};

export default SingleInvoice;
