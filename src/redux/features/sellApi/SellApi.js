import { baseApi } from "../api/baseApi";

const sellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSell: builder.mutation({
      query: (data) => ({
        url: "/sold-invoices/invoice-create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Sold-Invoice", "Medicine"],
    }),
    getSingleInvoiceById: builder.query({
      query: ({ id }) => ({
        url: `/sold-invoices/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["Sold-Invoice"],
    }),
    getAllSoldInvoicesByDate: builder.query({
      query: ({ date, month, startDate, endDate }) => {
        const params = new URLSearchParams();
        if (date) params.append("date", date);
        if (month) params.append("month", month);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        const url = `/sold-invoices${
          params.toString() ? `?${params.toString()}` : ""
        }`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Sold-Invoice"],
    }),
  }),
});

export const {
  useCreateSellMutation,
  useGetSingleInvoiceByIdQuery,
  useGetAllSoldInvoicesByDateQuery,
} = sellApi;
