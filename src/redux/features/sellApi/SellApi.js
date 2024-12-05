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
  }),
});

export const { useCreateSellMutation, useGetSingleInvoiceByIdQuery } = sellApi;
