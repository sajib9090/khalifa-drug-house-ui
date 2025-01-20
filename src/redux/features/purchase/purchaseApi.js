import { baseApi } from "../api/baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (data) => ({
        url: "/purchase-invoices/invoice-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Purchase-Invoice", "Medicine"],
    }),
    getSingleInvoiceById: builder.query({
      query: ({ id }) => ({
        url: `/purchase-invoices/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["Purchase-Invoice"],
    }),
    getAllPurchaseInvoicesByDate: builder.query({
      query: ({ date, month, startDate, endDate }) => {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (month) params.append("month", month);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        const url = `/purchase-invoices${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Purchase-Invoice"],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useGetSingleInvoiceByIdQuery,
  useGetAllPurchaseInvoicesByDateQuery,
} = purchaseApi;
